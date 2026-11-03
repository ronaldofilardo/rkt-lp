### 2. Motor de Regras e Formatos ITF — RKT

#### Visão Geral
O motor de regras puros do RKT (`engine.ts`) padroniza a anotação e validação de partidas com base nas normas regulamentares da **ITF (International Tennis Federation)** e da **CBT (Confederação Brasileira de Tênis)**, com adaptações para **beach tennis**. O motor atua como uma máquina de estados determinística, garantindo que todo placar seja matematicamente válido, auditável e comparável.

#### Os 7 Formatos Oficiais de Partida (`MatchFormat`)
O sistema suporta estritamente **7 formatos oficiais de partida**, selecionáveis no momento da criação do confronto:

| Formato (`MatchFormat`) | Denominação | Estrutura de Sets e Desempates | Uso Típico e Aplicação |
| :--- | :--- | :--- | :--- |
| `BEST_OF_3` | Melhor de 3 Sets | Vence quem vencer 2 sets tradicionais (6 games com vantagem de 2). Tiebreak padrão de 7 pontos em 6-6. | Torneios oficiais, partidas da ATP/WTA e circuitos CBT. |
| `BEST_OF_5` | Melhor de 5 Sets | Vence quem vencer 3 sets tradicionais. Tiebreak padrão em 6-6. | Partidas de Grand Slam, Copa Davis e torneios de longa duração. |
| `BEST_OF_3_MATCH_TB` | Melhor de 3 com Match Tiebreak | 2 sets tradicionais; em caso de empate em 1-1 nos sets, o 3º set é substituído por um **Match Tiebreak de 10 pontos**. | Torneios juvenis, seniores, duplas ATP e torneios de clube. |
| `BEST_OF_3_NO_AD` | Melhor de 3 sem Vantagem | Sets de 6 games sem vantagem no 40-40 (ponto decisivo / *No-Ad*). | Partidas rápidas e formatos universitários/juvenis. |
| `SHORT_SET_2V2_NO_AD` | Sets Curtos em Duplas No-Ad | Sets curtos (vence quem atingir 4 games com 2 de vantagem; tiebreak em 3-3 ou 4-4) em duplas (2v2) com *No-Ad*. | Torneios rápidos de duplas, circuitos infantojuvenis e Beach Tennis. |
| `MATCH_TB_10` | Match Tiebreak Único | Partida disputada em um único **Super/Match Tiebreak até 10 pontos** (com vantagem mínima de 2 pontos). | Desempates rápidos, Beach Tennis e treinos de alta pressão. |
| `PRO_SET_8` | Pro Set de 8 Games | Set único até 8 games (vence quem atingir 8 games com 2 de vantagem; tiebreak em 7-7 ou 8-8). | Formato rápido, ligas de clubes e Beach Tennis. |

#### Regras de Pontuação por Nível

##### 1. Pontuação por Game
* **Contagem Tradicional:** `0` ("Love"), `1` ("15"), `2` ("30"), `3` ("40").
* **Game:** Conquistado ao vencer o ponto após o 40, desde que haja vantagem mínima de 2 pontos sobre o adversário.
* **Deuce (Empate em 40-40):**
  * *Modo Vantagem (Advantage):* É necessário vencer dois pontos consecutivos após 40-40 para fechar o game.
  * *Modo Sem Vantagem (No-Ad):* Em 40-40, disputa-se um ponto decisivo (*game point/break point*). O recebedor escolhe o lado de devolução em simples (ou no lado correspondente em duplas).

##### 2. Pontuação por Set
* **Set Padrão:** Vence o jogador ou dupla que alcançar 6 games com diferença de pelo menos 2 games (ex: 6-4, 6-3, 7-5).
* **Tiebreak em Set Padrão:** Ocorrendo empate em 6-6, é disputado um tiebreak regular.

##### 3. Regras de Tiebreak
* **Tiebreak Regular (7 pontos):** Vence quem atingir 7 pontos com diferença mínima de 2 pontos (ex: 7-5, 8-6). O vencedor fecha o set por 7-6.
* **Super / Match Tiebreak (10 pontos):** Vence quem atingir 10 pontos com diferença mínima de 2 pontos (ex: 10-8, 12-10). Substitui o set decisivo ou atua como formato único (`MATCH_TB_10`).
* **Alternância de Saque no Tiebreak:** O primeiro sacador saca 1 ponto (do *Deuce Court*). A partir daí, o saque alterna a cada 2 pontos entre os adversários, trocando de lado da quadra a cada 6 pontos somados.

#### Modalidades: Simples e Duplas
* **Simples (1 vs 1):** Alocação de dois slots de jogador (`P1` e `P2`). O controle de lado de saque alterna entre *Deuce Court* (direita) nos pontos pares e *Ad Court* (esquerda) nos pontos ímpares.
* **Duplas (2 vs 2):** Alocação de quatro slots (`P1`, `P2`, `P1Partner`, `P2Partner`). A ordem de sacadores e recebedores é definida obrigatoriamente no início de cada set e mantida até o encerramento do mesmo.

#### Status da Partida no Sistema
| Status | Definição |
| :--- | :--- |
| `Agendada` | Partida configurada no sistema, aguardando início oficial. |
| `Em andamento` | Partida com placar ativo sendo anotado ao vivo no PWA. |
| `Finalizada` | Partida concluída com validação de placar e estatísticas pelo motor. |
| `Suspensa` | Partida interrompida (chuva, falta de luz, lesão) mantendo o estado exato para retomada posterior. |

#### Regras de Vinculação de Atletas aos Slots
Para prevenir ruídos de governança e vínculos incorretos de clubes, o motor exige a classificação explícita de cada atleta no momento da escalação:
* **Meu clube:** Filtra atletas vinculados ao CT do anotador. Novos atletas cadastrados herdam automaticamente estado, cidade e clube do CT logado.
* **Outro clube:** Exibe atletas cadastrados de outros clubes/CTs. Novos atletas criados sob essa opção são salvos de forma independente, **sem vínculo automático** com o CT do treinador/anotador.
* **Sem clube:** Atletas avulsos sem afiliação a centros de treinamento.
* **Externo:** Registro de adversários em partidas cujos atletas não possuem conta no sistema, visível apenas para painéis operacionais e de suporte.

--------------------------------------------------------------------------------

*Módulo atômico: 2-motor-de-regras-e-formatos-itf.md*
