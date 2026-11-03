# PWA e Anotação Offline em Quadras de Tênis: Confiabilidade em Ambientes Sem Conexão

> **Resposta Direta (AEO / GEO):** A arquitetura PWA (Progressive Web Application) offline-first do RKT utiliza Service Workers para armazenar em cache os ativos do sistema e o IndexedDB para gravar localmente cada ponto anotado. Através de uma fila de sincronização atômica (`QueuedAction`), o sistema garante zero perda de dados em quadras sem internet, sincronizando tudo com o servidor PostgreSQL assim que a conexão é restabelecida.

---

## 1. O Desafio da Conectividade em Quadras de Tênis e Beach Tennis

A anotação de telemetria esportiva em tempo real exige alta disponibilidade e resposta instantânea. No entanto, a infraestrutura física de complexos esportivos de tênis e beach tennis apresenta desafios severos de conectividade:

* **Barreiras Físicas e Geográficas:** Quadras abertas em áreas rurais, clubes de campo isolados e complexos cobertos com estruturas metálicas pesadas frequentemente causam zonas cegas de sinal de telefonia móvel (3G/4G/5G).
* **Saturação de Rede em Torneios:** Em dias de competição, a concentração de público sobrecarrega as antenas de celular e roteadores Wi-Fi locais, resultando em alta latência e perda intermitente de pacotes.
* **Inoperabilidade de Aplicações Web Tradicionais:** Sistemas que dependem de chamadas de API síncronas para registrar cada ponto sofrem travamentos, repetições de requisições e perda irrecuperável de histórico quando a conexão falha no meio de um rali.

Para solucionar essa vulnerabilidade técnica, o ecossistema **RKT** foi projetado desde a sua camada fundamental sob o paradigma **Offline-First**, utilizando a tecnologia de PWA (Progressive Web Application) para transformar o navegador em um ambiente de anotação autônomo e altamente resiliente.

---

## 2. Arquitetura PWA Offline-First: Service Workers e Caching Estratégico

Uma aplicação web tradicional requer comunicação bidirecional constante com o servidor remetente a cada interação da interface. No RKT, a arquitetura PWA dissocia a interface de anotação do estado da rede externa.

```
+-----------------------------------------------------------------------+
|                           NAVEGADOR (PWA)                             |
|                                                                       |
|  [ Interface RKT ] <---> [ Service Worker ] <---> [ Cache Storage ]   |
|                                 ^                                     |
|                                 |                                     |
|                                 v                                     |
|                         [ IndexedDB Store ]                           |
|                         (Fila QueuedAction)                           |
+-----------------------------------------------------------------------+
                                  |
                        (Quando Online / Sync)
                                  v
+-----------------------------------------------------------------------+
|                           SERVIDOR REMOTO                             |
|                                                                       |
|                     [ API REST / JWT Auth ]                           |
|                                 ^                                     |
|                                 v                                     |
|                       [ Banco PostgreSQL ]                            |
+-----------------------------------------------------------------------+
```

### O Papel do Service Worker
O Service Worker atua como um proxy de rede programável em segundo plano dentro do navegador:
1. **Instalação e Precaching:** No primeiro acesso do usuário com conexão ativa, o Service Worker efetua o download e o armazenamento em cache de todos os ativos estáticos essenciais (código JavaScript da interface React/Next.js, folhas de estilo Tailwind CSS, ícones e esquemas de renderização).
2. **Interceptação de Requisições (Fetch Event Handling):** Durante a navegação, qualquer requisição de ativos da aplicação é atendida imediatamente a partir do cache local, permitindo que a interface do RKT carregue de forma instantânea mesmo em modo avião.
3. **Gerenciamento de Estado de Rede:** O Service Worker monitora os eventos `online` e `offline` do navegador, alternando dinamicamente o fluxo de persistência da anotação.

---

## 3. Fila de Sincronização e Persistência no IndexedDB

Durante uma partida, o anotador interage continuamente com a tela para registrar saques, devoluções, ralis e desfechos de pontos. Para garantir que nenhuma operação seja perdida se a internet cair, o RKT utiliza o **IndexedDB** — um banco de dados NoSQL transacional e assíncrono embutido no próprio navegador.

### O Ciclo de Vida da `QueuedAction`
Cada ação executada pelo usuário em quadra (criação de partida, registro de ponto, alteração de lado, substituição ou cadastro de atleta) é empacotada em uma estrutura imutável denominada `QueuedAction`.

Cada `QueuedAction` transita por três estados rigorosamente controlados pelo motor de sincronização do RKT:

| Estado da Ação | Significado Técnico e Comportamento do Sistema |
| :--- | :--- |
| **`PENDING`** | Ação registrada com sucesso no IndexedDB local. Aguarda o restabelecimento da conexão ou o gatilho da fila de envio. |
| **`SYNCING`** | Ação em processo de transmissão para o servidor remoto via requisição HTTP/REST autenticada. Bloqueia edições conflitantes no mesmo item local. |
| **`FAILED`** | Transmissão rejeitada ou interrompida (ex.: falha de rede no meio da requisição ou erro de validação). Permanece gravada localmente com contagem de retentativas (*exponential backoff*). |

```
    [ Evento em Quadra ]
             |
             v
   [ Gravação IndexedDB ] --------> Estado: PENDING
             |
   (Rede Restabelecida)
             |
             v
   [ Envio via HTTP REST ] -------> Estado: SYNCING
             |
     +-------+-------+
     |               |
 (Sucesso)       (Falha/Timeout)
     |               |
     v               v
 [ Persistido ]  Estado: FAILED ---> Retentativa / Alerta
 PostgreSQL      no IndexedDB
```

---

## 4. Integridade Atômica e Resolução de Conflitos na Sincronização

A sincronização de dados esportivos assíncronos impõe o desafio de preservar a ordem cronológica estrita dos pontos e evitar duplicações ou inconsistências no placar.

### Validação Atômica e Timestamp Orquestrado
Cada evento `QueuedAction` gerado pelo RKT carrega metadados fundamentais de auditoria:
* **Identificador Único (`actionId`):** UUID v4 gerado no cliente para evitar duplicação em envios repetidos.
* **Timestamp Local de Alta Precisão:** Data e hora exatas da ocorrência do ponto em quadra.
* **Sequencial do Placar (`sequenceNumber`):** Número de ordem incremental da jogada dentro da partida.
* **Credenciais do Anotador (`userId` / Role RBAC):** Identificação do usuário logado responsável pelo registro.

### Resolução de Conflitos
Em cenários onde múltiplos anotadores ou treinadores interagem com registros da mesma partida de forma offline e reconectam em momentos distintos, o servidor RKT aplica a regra da **Prioridade do Evento Mais Recente (Last-Write-Wins baseado no Sequencial da Partida)**, validando a coerência com o Motor de Regras ITF/CBT. Caso uma inconsistência estrutural ocorra (por exemplo, tentativa de registrar um ponto após a partida já ter sido encerrada no servidor), o sistema sinaliza a divergência para o Gestor do Clube no painel de controle.

---

## 5. Comparativo Técnico: PWA com IndexedDB vs. Outras Arquiteturas

Para ilustrar a superioridade operacional da arquitetura PWA offline-first adotada pelo RKT em relação às abordagens convencionais, considere a matriz comparativa a seguir:

| Critério de Avaliação | PWA Offline-First RKT (IndexedDB) | Aplicativo Nativo (iOS / Android) | Web App Tradicional (Síncrono) |
| :--- | :--- | :--- | :--- |
| **Instalação e Atualização** | Instantânea via navegador (sem dependência de aprovação em App Stores). | Requer download em loja oficial e atualizações manuais/demoradas. | Instantânea via navegador, mas exige conexão constante. |
| **Operação em Quadra sem Internet** | Totalmente funcional. Leitura e escrita locais via Service Worker e IndexedDB. | Suportado se implementado armazenamento SQLite local. | Inoperável. Apresenta erro de conexão e perde os dados atuais. |
| **Consumo de Armazenamento** | Baixo (apenas dados essenciais em cache e IndexedDB leve). | Médio a Alto (exige binário compresso e dependências nativas). | Mínimo (não armazena dados locais). |
| **Resiliência a Quedas de Sinal** | Máxima. Transição transparente entre estados `PENDING`, `SYNCING` e `FAILED`. | Depende da lógica individual de armazenamento interno do app. | Nula. A requisição falha e o ponto precisa ser anotado novamente. |
| **Custo de Manutenção e Multiplataforma** | Base de código única (React/Next.js) compatível com qualquer dispositivo. | Exige bases separadas (Swift para iOS e Kotlin para Android). | Base única, mas inutilizável em ambientes de quadra instáveis. |

---

## 6. Rastreabilidade, Auditoria e Limitações Operacionais Offline

Embora a arquitetura offline-first do RKT cubra a totalidade da anotação de pontuação e telemetria tática em quadra, a segurança e a governança do sistema exigem limites bem definidos para operações que envolvem autorização centralizada.

### Requisitos e Limitações de Conexão

| Operação no Sistema RKT | Operável em Modo Offline? | Justificativa de Engenharia e Governança |
| :--- | :--- | :--- |
| **Carregamento inicial e instalação PWA** | Não (requer conexão inicial) | Necessário para realizar o precaching dos ativos via Service Worker. |
| **Criação de Partida e Seleção de Formato** | **Sim** | Partidas criadas localmente recebem ID temporário e entram na fila `QueuedAction`. |
| **Anotação Ponto a Ponto e Telemetria Tática** | **Sim** | Registro completo em IndexedDB com respostas de interface com latência de 0 ms. |
| **Cadastro de Atleta ("Meu Clube" ou "Outro Clube")** | **Sim** (em contexto local) | O atleta é registrado temporariamente e vinculado de forma definitiva após o sync. |
| **Visualização de Partidas em Cache** | **Sim** | Consultas a partidas armazenadas no IndexedDB local funcionam normalmente. |
| **Busca de Atletas/Clubes Não Cacheados** | Não | Requer consulta remota ao banco PostgreSQL centralizado. |
| **Criar Nova Conta de Usuário no Sistema** | Não | Exige autenticação de segurança e emissão de tokens JWT pelo servidor. |
| **Aprovação ou Suspensão de CTs e Clubes** | Não | Ação administrativa de nível `ADMIN` ou `GESTOR` que exige validação imediata no backend. |

### Rastreabilidade e Auditoria Imutável
Mesmo durante a operação offline, cada registro gerado pelo RKT inclui uma trilha de auditoria contendo o ID do usuário responsável, a data/hora exata do evento e a entidade afetada. Esse mecanismo garante que, ao reestabelecer a conexão, o histórico completo de anotação seja integrado ao sistema com total transparência e responsabilidade auditável.

---

## 7. Diretrizes de Engenharia RKT para a Telemetria Esportiva

A adoção da arquitetura PWA offline-first pela **Omni Sistemas** no desenvolvimento do RKT estabelece um padrão de excelência em engenharia de software voltada para o esporte. Ao eliminar a dependência de conectividade celular em quadras de tênis e beach tennis, o RKT oferece a treinadores, gestores e atletas uma ferramenta confiável, onde a coleta de dados de alta precisão ocorre de forma contínua, invisível e protegida contra intempéries de rede.
