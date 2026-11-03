### 1. Visão Geral e Proposta de Valor — RKT

#### O que é o RKT
O **RKT** é uma plataforma digital PWA (Progressive Web Application) desenvolvida para anotação, gestão e análise tática de partidas de tênis e beach tennis. A aplicação atende clubes, centros de treinamento (CTs), treinadores, gestores esportivos, anotadores e atletas, fornecendo uma infraestrutura completa para registrar e transformar dados de quadra em inteligência analítica acionável.

#### Problema que Resolve
Historicamente, o acompanhamento esportivo em quadra depende de anotações manuais em papel, planilhas soltas ou trocas de mensagens informais. Esse modelo gera:
* **Perda de Histórico de Resultados:** Dificuldade para acompanhar a evolução técnica e física de longo prazo do atleta.
* **Ausência de Indicadores Táticos:** Incapacidade de comparar o rendimento em saques, devoluções, pontos sob pressão e ralis entre diferentes atletas e confrontos.
* **Vínculos Indevidos em Cadastros:** Ruído de governança ao cadastrar adversários de outros clubes/CTs sem controle centralizado de acesso.
* **Inoperabilidade em Quadras sem Conexão:** Falha de ferramentas tradicionais que exigem conexão contínua de internet em locais com sinal instável.

O RKT resolve esses problemas centralizando todos os registros em um ambiente digital acessível via navegador, otimizado para operação offline e sincronização automática.

#### Conexão Arquitetural e Ligações Cruzadas
A proposta de valor do RKT é sustentada por dois pilares fundamentais descritos na documentação técnica do sistema:
1. **Motor de Regras Oficial (ITF/CBT):** Validação estrita em tempo real de placares e suporte aos 7 formatos oficiais de partida (`BEST_OF_3`, `BEST_OF_5`, `BEST_OF_3_MATCH_TB`, `BEST_OF_3_NO_AD`, `SHORT_SET_2V2_NO_AD`, `MATCH_TB_10` e `PRO_SET_8`). Para detalhes completos sobre as regras de contagem, consulte o [Módulo 2: Motor de Regras e Formatos ITF](2-motor-de-regras-e-formatos-itf.md).
2. **Arquitetura Offline-First:** Coleta contínua de telemetria mesmo sem internet via IndexedDB e Service Worker com gerenciamento atômico da fila de sincronização (`QueuedAction` em estados `PENDING`, `SYNCING`, `FAILED`). Para entender a infraestrutura offline e resiliência de dados, consulte o [Módulo 5: Arquitetura PWA e Registro Offline](5-arquitetura-pwa-e-registro-offline.md).

#### Público-Alvo e Governança por Papéis (RBAC)
O controle de acesso no RKT é estruturado no modelo RBAC (Role-Based Access Control), garantindo a devida separação de responsabilidades:

| Perfil | Sigla | Uso Principal no RKT |
| :--- | :--- | :--- |
| **Administrador** | `ADMIN` | Gestão global da plataforma, auditoria, validação de clubes e parâmetros do sistema. |
| **Gestor de Clube** | `GESTOR` | Administração do clube/CT, aprovação de treinadores, atletas e relatórios gerenciais. |
| **Treinador** | `TREINADOR` | Anotação tática dos atletas vinculados ao seu CT, acompanhamento de evolução e diagnósticos. |
| **Anotador** | `ANNOTATOR` | Registro de placar ao vivo em tempo real na quadra e gestão de partidas suspensas. |
| **Atleta** | `ATLETA` | Consulta do histórico pessoal de partidas, estatísticas táticas e evolução técnica. |
| **Acompanhante / Espectador** | `VIEWER` | Visualização pública ou restrita via token/hash SHA-256 com proteção LGPD para menores. |
| **Suporte** | `SUPPORT` | Operação institucional, gestão de contas avulsas e controle de cadastros externos. |

#### Principais Benefícios Estratégicos
1. **Rastreabilidade Completa:** Cada partida fica registrada com data, horário, confronto, formato, placar set a set, lista de anotadores e histórico de audit.
2. **Distinção "Meu Clube" vs. "Outro Clube":** Ao preencher os slots de jogadores (P1, P2 ou parceiros de duplas), o anotador especifica o vínculo do atleta, evitando associações automáticas incorretas ao CT logado.
3. **Cadastro Seguro de Atletas Externos:** O cadastro de adversários de "Outro clube" não gera vínculo indevido com o centro de treinamento do treinador. Atletas do próprio clube herdam automaticamente estado, cidade e clube.
4. **Placar ao Vivo em Simples e Duplas:** Suporte pleno a alternância de saques, controle de lados da quadra, vantagem, tiebreaks e suspensão/retomada de partidas.
5. **Telemetria Esportiva de 8 Camadas:** Da pontuação básica à biomecânica do golpe, efeito (*topspin*, *slice*, *flat*), direcionamento e extensão de ralis.
6. **Proteção LGPD e ECA Digital:** Anonimização automática de nomes de atletas menores de 18 anos em transmissões/feeds públicos ("A. S.") e ocultação de notas táticas confidenciais do treinador.

#### Principais Funcionalidades do Ecossistema
* **Nova Partida:** Configuração de modalidade (simples/duplas), seleção de formato oficial, atribuição de jogadores por slot e criação instantânea de atletas.
* **Módulo de Placar (Live Scoring):** Contagem dinâmica de pontos, games, sets, tiebreak tradicional, Match Tiebreak e controle de paralisação.
* **Painel do Gestor:** Gestão unificada de Clubes/CTs, treinadores, atletas do clube, histórico de partidas e dados institucionais.
* **Painel do Suporte:** Controle de homologação de CTs, gestão de gestores, monitoramento de contas avulsas e listagem de cadastros externos.
* **Histórico & Analytics:** Filtros por atleta, clube, modalidade ou período com relatórios detalhados.

#### Escopo do MVP e Funcionalidades Futuras
* **Não faz parte do MVP:** Transmissão de vídeo ao vivo (streaming de vídeo) e sistema de pagamentos ou e-commerce interno.
* **Em desenvolvimento (em breve):** Feed público de acompanhamento remoto para pais e torcedores com chave de acesso restrita.

--------------------------------------------------------------------------------

*Módulo atômico: 1-visao-geral-e-proposta-de-valor.md*
