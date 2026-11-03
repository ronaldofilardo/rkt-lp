### 3. Telemetria e Analytics de Partida — RKT

#### Visão Geral
A telemetria do RKT é estruturada em **8 camadas de dados analíticos**, cobrindo desde a marcação do placar em tempo real até o diagnóstico biomecânico e tático do golpe, finalizando na transmissão pública segura. Todos os dados são calculados deterministicamente pelo motor de regras puras (`engine.ts`) com base nos 7 formatos oficiais de tênis e beach tennis.

--------------------------------------------------------------------------------

#### Camada 1 — Telemetria de Placar e Estado ao Vivo (Scoring Engine)
Métricas primárias calculadas pelo motor de regras durante a partida:
* **Pontuação Dinâmica:** Acompanhamento instantâneo de pontos (`0`, `15`, `30`, `40`), *Deuce*, Vantagem (*Advantage*) e ponto decisivo (*No-Ad*).
* **Tiebreaks Oficiais:** Controle estrito de pontuação para Tiebreak Regular (até 7 pontos) e Super / Match Tiebreak (até 10 pontos).
* **Controle de Servidor e Lado da Quadra:** Identificação contínua do jogador que saca e alternância do lado de serviço (*Deuce Court* à direita vs. *Ad Court* à esquerda).
* **Gestão de Duplas:** Registro e manutenção da ordem de sacadores e recebedores para cada lado da quadra.

--------------------------------------------------------------------------------

#### Camada 2 — Telemetria de Saque (*Serve Telemetry*)
Métricas de rendimento e consistência do serviço do atleta:
* **1º Saque em Quadra (*First Serve In*):** Porcentagem de primeiros saques válidos colocados em jogo.
* **Pontos Vencidos com o 1º Saque (*First Serve Points Won*):** Taxa de conversão de pontos quando o 1º saque entra em quadra.
* **Pontos Vencidos com o 2º Saque (*Second Serve Points Won*):** Aproveitamento do atleta ao disputar o ponto com o segundo serviço.
* **Definições Diretas:** Contagem total de *Aces* (saques sem toque do adversário) e Duplas Faltas (*Double Faults*).
* **Detalhamento de Faltas no 1º Saque:** Registro da falha (bola na rede ou fora), direção (aberto, fechado, no corpo) e efeito aplicado (*flat*/chapado, *slice*, *topspin*/*kick*).
* **Eficiência de Confirmação (*Hold Rate*):** Porcentagem de games de saque confirmados versus disputados.

--------------------------------------------------------------------------------

#### Camada 3 — Telemetria de Devolução (*Return Telemetry*)
Métricas de agressividade e eficiência ao receber o serviço adversário:
* **Devolução em Quadra (*Return In* %):** Porcentagem de devoluções válidas colocadas em jogo.
* **Aproveitamento de Devolução:** Pontos ganhos devolvendo o 1º saque vs. o 2º saque do adversário.
* **Quebras de Serviço (*Breaks*):** Total de games de devolução vencidos e taxa de conversão de quebras (% de *Break*).

--------------------------------------------------------------------------------

#### Camada 4 — Telemetria Sob Pressão (*Pressure & Clutch Points*)
Avalia o desempenho mental e a tomada de decisão nos momentos mais decisivos do confronto:
* **Break Points Ofensivos:** Quantidade de oportunidades de quebra criadas vs. efetivamente convertidas.
* **Break Points Defensivos:** Quantidade de *Break Points* enfrentados no próprio saque vs. salvos pelo sacador.
* **Game Points & Game Balls:** Total de chances de fechar o game e taxa de conversão.
* **Set Points & Set Balls:** Oportunidades de fechar o set e eficiência sob pressão extrema.
* **Tiebreak Clutch:** Desempenho geral, taxa de vitória e aproveitamento de pontos em tiebreaks.

--------------------------------------------------------------------------------

#### Camada 5 — Telemetria Tática de Rali e Golpes (*Shot & Rally Matrix*)
Registro granular da física e do desfecho de cada ponto disputado:
* **Classificação do Desfecho:** *Winner* (`W`), Erro Forçado (`EF` — induzido pela bola do adversário), Erro Não Forçado (`ENF` — falha própria sem pressão), *Ace* e Dupla Falta (`DF`).
* **Situação de Jogo:** Saque, Devolução, Troca de Fundo de Quadra (*Baseline*), Subida à Rede ou Passada (*Passing Shot*).
* **Golpe Executor:** Forehand (`FH`), Backhand (`BH`), Voleio de Forehand (`VFH`), Voleio de Backhand (`VBH`), `Smash`, `Saque` e Golpes de Aproximação (*Approach*).
* **Golpes Especiais:** Deixadinha (*Drop Shot*), *Lob*, Bate-pronto (*Half-Volley*) e *Swing Volley*.
* **Efeito da Bola:** *Topspin* (rotação ascendente), *Slice* (rotação cortada) e Chapado (*Flat*).
* **Direcionamento de Trajetória:** Cruzada (*Cross-court*), Paralela (*Down-the-line*), Centro, *Inside-Out* (de dentro para fora) e *Inside-In* (de dentro para dentro).
* **Extensão do Rali (Faixas de Trocas):** Distribuição dos pontos pela quantidade de trocas de bola:
  * *Ralis Curtos (1 a 4 bolas):* Domínio de saque e devolução.
  * *Ralis Médios (5 a 8 bolas):* Construção tática e transições.
  * *Ralis Longos (9 ou mais bolas):* Paciência, preparo físico e consistência de fundo.
* **Eficácia no Jogo de Rede:** Subidas totais à rede vs. pontos vencidos (% de aproveitamento no voleio).

--------------------------------------------------------------------------------

#### Camada 6 — Telemetria de Momento e Dinâmica (*Momentum & Streaks*)
Mapeia a oscilação emocional e as viradas durante o confronto:
* **Sequências de Pontos (*Streaks*):** Maior sequência de pontos seguidos vencidos (*Winning Streak*) e perdidos (*Losing Streak*).
* **Corridas de Pontos (*Scoring Runs*):** Identificação temporal de momentos em que ocorreram sequências consecutivas de 2, 3 e 4+ pontos.
* **Status Ativo de Momento:** Leitura em tempo real do fluxo de pontos da partida no instante exato.

--------------------------------------------------------------------------------

#### Camada 7 — Telemetria de Tempo e Ritmo (*Duration & Pace*)
* **Duração Total da Partida e Sets:** Tempo decorrido de partida e tempo por set individual.
* **Tempo Efetivo de Bola em Jogo (*Effective Play Time*):** Duração real do ponto entre o saque e a bola morta.
* **Ritmo Médio e Intervalos:** Intervalo médio de tempo gasto entre os pontos e durante as trocas de lado.

--------------------------------------------------------------------------------

#### Camada 8 — Telemetria para Transmissão ao Vivo (*Broadcast & Spectator Feed*)
* **Projeção em Tempo Real:** Feed otimizado e leve consumido por placares públicos de transmissão ou acompanhamento remoto de torcedores.
* **Governança LGPD e ECA Digital:** Anonimização automática do nome de atletas menores de 18 anos sem autorização explícita (exibindo apenas as iniciais "A. S.") e ocultação estrita de notas táticas ou áudios confidenciais gravados pelo treinador.

--------------------------------------------------------------------------------

*Módulo atômico: 3-telemetria-e-analytics-de-partida.md*
