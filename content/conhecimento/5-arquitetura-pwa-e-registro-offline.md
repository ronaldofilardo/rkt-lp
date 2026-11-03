### 5. Arquitetura PWA e Registro Offline — RKT

#### Visão Geral
O RKT é projetado como uma **Progressive Web Application (PWA)** offline-first. Como a anotação de partidas de tênis e beach tennis ocorre em quadras onde a conectividade móvel ou Wi-Fi costuma ser instável ou inexistente, a aplicação garante que 100% da operação de pontuação e cadastro local ocorra sem dependência de rede.

#### Arquitetura de Sincronização e Fila do IndexedDB (`QueuedAction`)

##### 1. Estrutura do IndexedDB
Toda ação executada pelo usuário em estado desconectado (criação de partida, registro de ponto, alteração de placar, cadastro de atleta) é gravada de imediato no armazenamento local do navegador via **IndexedDB**. 

Cada operação é empacotada em um objeto denominado `QueuedAction`, contendo o payload e a assinatura temporal da ação.

##### 2. Ciclo de Vida da Ação na Fila (`QueuedActionState`)
O processamento da fila local obedece a uma máquina de estados atômica:

```
[ PENDING ] ───(Reconexão / Flush)───> [ SYNCING ] ───(Sucesso API)───> [ REMOVED ]
                                             │
                                     (Falha de Rede/Servidor)
                                             │
                                             ▼
                                        [ FAILED ] ───(Retry Exponential)───> [ SYNCING ]
```

| Estado | Significado Técnico |
| :--- | :--- |
| `PENDING` | Ação registrada localmente e armazenada na fila do IndexedDB, aguardando conexão. |
| `SYNCING` | Ação em processo de envio atômico ao backend via requisição HTTP/REST. |
| `FAILED` | Falha no envio (timeout, erro 5xx ou rejeição de payload). A ação permanece salva para reformatamento ou nova tentativa. |

##### 3. Resolução Atômica de Integridade e Conflitos
Ao restabelecer a conexão com a internet, o Service Worker ativa o flushing da fila de sincronização seguindo protocolos estritos:
* **Ordenação Cronométrica Rigorosa:** As ações são enviadas na sequência exata de timestamps de execução original na quadra.
* **Resolução Determinística de Conflitos:** Caso ocorra edição simultânea (ex: dois anotadores alterando a mesma partida), o sistema adota a estratégia de *Last-Write-Wins* validada pela cronologia do anotador e sinaliza alertas no painel do gestor caso haja divergência estrutural.
* **Transações Atômicas de API:** A API backend processa os payloads em lote com garantia de rollback em caso de falha de integridade referencial.

#### Arquitetura Técnica do PWA
* **Frontend:** Aplicação em Next.js / React e Tailwind CSS (Telemetry Design System), renderizada e executada no cliente.
* **Service Worker:** Intercepta todas as requisições de rede, gerencia o cache das rotas (*App Shell*) e controla a sincronização em segundo plano (*Background Sync*).
* **Backend:** APIs REST autenticadas via JWT (JSON Web Tokens) e sessões seguras.
* **Banco de Dados Relacional:** PostgreSQL como banco de dados principal de produção.
* **Armazenamento Local:** IndexedDB para armazenamento da fila de ações (`QueuedAction`) e cache de atletas/clubes.

#### Trilha de Auditoria e Rastreabilidade
Cada ação registrada no IndexedDB e sincronizada no servidor armazena uma trilha de auditoria contendo:
1. `userId`: Identificador do usuário responsável pela ação.
2. `timestamp`: Data e hora exata da ocorrência (precisão em milissegundos).
3. `actionType`: Tipo de evento (`CREATE_MATCH`, `SCORE_POINT`, `SUSPEND_MATCH`, `CREATE_ATHLETE`).
4. `entityId`: Identificador único da entidade afetada (ID da partida, do atleta ou do clube).

#### Requisitos de Conexão e Operação
| Operação do Sistema | Funciona Offline? | Detalhes e Comportamento |
| :--- | :--- | :--- |
| Carregamento inicial da aplicação | **Sim** | Exige 1º acesso online para cache do Service Worker. |
| Criar partida e escalar atletas em cache | **Sim** | Registrado localmente e enviado ao reconectar. |
| Anotar placar ponto a ponto | **Sim** | Funcionamento 100% offline via IndexedDB. |
| Visualizar histórico de partidas em cache | **Sim** | Partidas carregadas anteriormente ficam acessíveis. |
| Sincronizar dados pendentes | **Não** | Requer reconexão de rede ativa. |
| Buscar atletas/clubes fora do cache local | **Não** | Requer consulta ao servidor online. |
| Criar novos usuários / aprovar CTs | **Não** | Exige validação direta das regras do backend online. |

--------------------------------------------------------------------------------

*Módulo atômico: 5-arquitetura-pwa-e-registro-offline.md*
