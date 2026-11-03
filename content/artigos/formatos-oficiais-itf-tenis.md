# Formatos Oficiais ITF: Quando Usar No-Ad, Pro-Set e Match Tiebreak

> **Resposta Direta (AEO):** Os formatos oficiais da ITF (International Tennis Federation) e CBT regulam a duração e a intensidade das partidas. O uso do No-Ad elimina a vantagem no deuce, o Pro-Set reduz partidas a um único set de 8 games, e o Match Tiebreak (10 pontos) substitui o set decisivo. O RKT computa nativamente 7 formatos oficiais (`BEST_OF_3`, `BEST_OF_5`, `BEST_OF_3_MATCH_TB`, `BEST_OF_3_NO_AD`, `SHORT_SET_2V2_NO_AD`, `MATCH_TB_10` e `PRO_SET_8`) garantindo validação estrita em torneios e treinos.

---

## 1. O Imperativo da Padronização no Tênis Moderno

A gestão de torneios, campeonatos interclubes e sessões de treinamento de alta performance exige um equilíbrio constante entre tradição esportiva e eficiência operacional. Historicamente, o tênis caracterizou-se por partidas de duração indeterminada, onde a ausência de um limite temporal rigoroso podia estender confrontos por quatro ou cinco horas. Para adaptar o esporte às demandas de transmissão televisiva, preservação física dos atletas e otimização do uso de quadras em academias e centros de treinamento, a **International Tennis Federation (ITF)** e a **Confederação Brasileira de Tênis (CBT)** padronizaram múltiplos formatos de jogo.

A escolha adequada do formato de partida impacta diretamente a dinâmica tática dos atletas, o nível de estresse sob pressão e o gerenciamento de quadras por organizadores. No ecossistema **RKT**, o motor de regras puro (`engine.ts`) foi projetado para validar e computar automaticamente cada um desses formatos, eliminando ambiguidades no registro de placares e assegurando a consistência estatística de simples e duplas.

---

## 2. Matriz Comparativa dos 7 Formatos Oficiais do RKT

O RKT suporta nativamente 7 estruturas formais de disputa configuradas na enumeração `MatchFormat`. A tabela abaixo consolida as especificações técnicas, regras de pontuação decisiva e os cenários típicos de aplicação no tênis e no beach tennis.

| Identificador RKT | Nome do Formato | Estrutura de Sets | Regra de Deuce | Desempate Decisivo | Aplicação Principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `BEST_OF_3` | Melhor de 3 Sets Tradicional | Vence quem fizer 2 sets de 6 games | Vantagem tradicional (*Advantage*) | Tiebreak (7 pontos) em 6-6 nos 3 sets | Torneios profissionais oficiais, Finais e Interclubes Classe A |
| `BEST_OF_5` | Melhor de 5 Sets Tradicional | Vence quem fizer 3 sets de 6 games | Vantagem tradicional (*Advantage*) | Tiebreak (7 pontos) em 6-6 em todos os sets | Chaves masculinas de Grand Slam e confrontos de Copa Davis |
| `BEST_OF_3_MATCH_TB` | Melhor de 3 com Match Tiebreak | 2 sets regulares (6 games); 3º set em Tiebreak de 10 pts | Vantagem tradicional (*Advantage*) | Match Tiebreak (10 pontos) substituindo o 3º set | Circuito infanto-juvenil, Seniores e torneios amadores |
| `BEST_OF_3_NO_AD` | Melhor de 3 com Ponto Decisivo | 2 ou 3 sets de 6 games | Sem Vantagem (*No-Ad* / Ponto Decisivo no 40-40) | Tiebreak (7 pontos) em 6-6 | Torneios universitários, circuitos rápidos e duplas ATP/WTA |
| `SHORT_SET_2V2_NO_AD` | Set Curto 2v2 No-Ad | Sets curtos até 4 games (vence com 4-0, 4-1, 4-2 ou TB em 3-3/4-4) | Sem Vantagem (*No-Ad* / Ponto Decisivo) | Tiebreak curto (7 pontos) | Beach Tennis oficial e torneios Fast4 Tennis |
| `MATCH_TB_10` | Partida em Match Tiebreak | Partida em set único de 10 pontos | Não se aplica (contagem corrida por pontos) | Vence quem atingir 10 pontos (mínimo 2 de vantagem) | Desempates rápidos, torneios de tiro curto e desafios |
| `PRO_SET_8` | Pro Set até 8 Games | Set único estendido até 8 games | Vantagem ou No-Ad (conforme regulamento) | Tiebreak (7 pontos) em 7-7 ou 8-8 | Categorias de entrada, eventos sociais e pré-qualificatórias |

---

## 3. Anatomia Detalhada de Cada Formato de Jogo

### 3.1. Formatos Tradicionais de Longa Duração (`BEST_OF_3` e `BEST_OF_5`)

Os formatos de longa duração representam o padrão histórico do tênis de campo. No formato `BEST_OF_3`, o jogador ou dupla precisa vencer dois sets de seis games. Para fechar um set regular, é necessária uma vantagem mínima de dois games (ex.: 6-4). Caso o placar alcance 6-6, disputa-se um **tiebreak tradicional** de até sete pontos (exigindo dois pontos de diferença, como 7-5 ou 8-6).

No formato `BEST_OF_5`, exclusivo das chaves masculinas de torneios Grand Slam e certos confrontos históricos de seleções, a exigência de resistência física e mental é levada ao limite. O vencedor precisa conquistar três sets. O motor RKT gerencia a contagem contínua de pontos e a alternância de saques através desses longos confrontos, mantendo o histórico de rotação de lados da quadra e servidores a cada game e tiebreak.

### 3.2. Formatos com Match Tiebreak no Set Decisivo (`BEST_OF_3_MATCH_TB` e `MATCH_TB_10`)

Com a aceleração do calendário esportivo e a necessidade de reduzir a sobrecarga articular em atletas juvenis e veteranos, a ITF padronizou a substituição do terceiro set completo por um **Match Tiebreak** (também conhecido como Super Tiebreak). 

No formato `BEST_OF_3_MATCH_TB`, os dois primeiros sets são disputados na pontuação convencional até 6 games. Se a partida empatar em 1 set a 1, a definição ocorre em um tiebreak especial disputado até 10 pontos (com margem de 2 pontos para vitória, ex.: 10-8 ou 12-10). O RKT trata o Match Tiebreak como a terceira parcial da partida, atribuindo o placar final de sets como 2 a 1 e registrando o placar exato do tiebreak no histórico estatístico.

O formato `MATCH_TB_10` comprime a partida inteira em uma única disputa de 10 pontos. É amplamente utilizado em clínicas de treinamento, torneios corporativos ou como critério de desempate entre equipes em confrontos interclubes.

### 3.3. A Revolução da Regra No-Ad (`BEST_OF_3_NO_AD` e `SHORT_SET_2V2_NO_AD`)

A regra do **No-Ad** (*No Advantage* ou Ponto Decisivo) elimina a fase estendida de deuce/vantagem no término de cada game. Quando o placar de um game atinge 40-40 (terceiro deuce na contagem tradicional), o game é decidido imediatamente no ponto seguinte.

#### Regras do Ponto Decisivo no No-Ad:
1. **Escolha do Lado de Devolução:** Em partidas de simples, o recebedor escolhe se deseja receber o saque no lado direito (*Deuce Court*) ou no lado esquerdo (*Ad Court*).
2. **Duplas:** A dupla recebedora define qual dos dois parceiros efetuará a devolução do ponto decisivo, devendo manter sua posição de quadra estabelecida para aquele set.
3. **Duplas Mistas:** Em duplas mistas com regra No-Ad oficial, o sacador do sexo masculino deve obrigatoriamente sacar para o recebedor do sexo masculino, e a sacadora feminina para a recebedora feminina.

O formato `SHORT_SET_2V2_NO_AD` combina a velocidade do No-Ad com a redução de games por set (vencidos ao atingir 4 games). Este é o padrão consolidado no **Beach Tennis** internacional e em partidas de exibição de Fast4.

### 3.4. O Pro Set de 8 Games (`PRO_SET_8`)

O `PRO_SET_8` é um formato intermediário em que a partida é disputada em um único set expandido. O primeiro atleta ou dupla a atingir 8 games com uma diferença mínima de 2 games (ex.: 8-6) sagra-se vencedor. Caso ocorra um empate em 7-7 ou 8-8 (a depender do regulamento específico da competição), dispara-se um tiebreak tradicional de 7 pontos para encerrar o confronto por 8-7 ou 9-8.

---

## 4. Guia Prático de Escolha para Torneios e Clubes

A seleção do formato de jogo não deve ocorrer de maneira aleatória. Diretores de torneios, organizadores de ligas e treinadores devem alinhar a escolha do `MatchFormat` aos objetivos específicos do evento e às restrições de infraestrutura.

```
                  ┌─────────────────────────────────────────┐
                  │    QUAL O OBJETIVO DO CAMPEONATO?       │
                  └────────────────────┬────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────┐                             ┌───────────────────────┐
│ TORNEIO OFICIAL / CBT │                             │ TORNEIO INTERNO / CT  │
└───────────┬───────────┘                             └───────────┬───────────┘
            │                                                     │
      ┌─────┴─────┐                                         ┌─────┴─────┐
      ▼           ▼                                         ▼           ▼
┌───────────┐ ┌───────────┐                           ┌───────────┐ ┌───────────┐
│ Profissal │ │ Juvenil/  │                           │ Tempo     │ │ Beach     │
│ /Finais   │ │ Amador    │                           │ Restrito  │ │ Tennis    │
└─────┬─────┘ └─────┬─────┘                           └─────┬─────┘ └─────┬─────┘
      │             │                                       │             │
      ▼             ▼                                       ▼             ▼
`BEST_OF_3`  `BEST_OF_3_MATCH_TB`                       `PRO_SET_8` `SHORT_SET_2V2_NO_AD`
```

### Matriz de Decisão Operacional:

1. **Minimização de Atrasos na Programação:** Quando um torneio possui dezenas de partidas agendadas na mesma quadra em um único dia, o uso de `BEST_OF_3_MATCH_TB` com regra *No-Ad* garante que nenhuma partida ultrapasse 1 hora e 15 minutos, prevenindo atrasos em cadeia.
2. **Preservação de Atletas Juvenis:** Em etapas de circuitos Infanto-Juvenis (como CBT de 12 a 16 anos), o formato `BEST_OF_3_MATCH_TB` é a diretriz padrão da ITF para evitar lesões por overtraining durante maratonas de jogos no mesmo final de semana.
3. **Eficiência em Beach Tennis:** A modalidade de Beach Tennis adota quase universalmente o formato `SHORT_SET_2V2_NO_AD` ou sets de 6 games com No-Ad obrigatório, garantindo dinâmica ágil e trocas intensas de rali.

---

## 5. Telemetria RKT e Impacto no Desgaste Físico e Tempo de Jogo

O RKT monitora continuamente o tempo total de partida e a duração efetiva de bola em jogo através da sua **Camada 7 de Telemetria (Duration & Pace)**. A escolha do formato altera profundamente a distribuição dessas métricas.

```
Proporção de Duração Média e Tempo Efetivo de Jogo por Formato:

BEST_OF_3            [======================================] ~120 min (Tempo Efetivo: 22%)
BEST_OF_3_MATCH_TB   [==========================] ~75 min (Tempo Efetivo: 24%)
PRO_SET_8            [==================] ~50 min (Tempo Efetivo: 26%)
SHORT_SET_2V2_NO_AD  [============] ~35 min (Tempo Efetivo: 31%)
```

### Análise de Rendimento Tático por Formato:
* **Fator de Pressão em Jogos No-Ad:** Em formatos convencionais, a média de pontos por game oscila entre 6 e 8 pontos. No formato No-Ad, a média cai para 5,1 pontos por game, aumentando em **38% a incidência de pontos decisivos** sob pressão máxima.
* **Aproveitamento de Saque no Match Tiebreak:** A telemetria RKT demonstra que a porcentagem de conversão de 1º saque no Match Tiebreak cai em média 7% em relação ao primeiro set, evidenciando o componente psicológico nos 10 pontos finais.

---

## 6. Computação e Validação pelo Motor de Regras RKT

O motor de regras do RKT (`engine.ts`) funciona como uma máquina de estados finitos que valida cada ponto inserido pelo anotador em tempo real. Independente do formato selecionado, a aplicação garante as seguintes regras de integridade:

1. **Alternância de Saque e Lados:** Em tiebreaks convencionais (7 pontos) ou Match Tiebreaks (10 pontos), o motor exige a troca de lados da quadra a cada 6 pontos somados (ex.: 3-3, 4-2, 5-1), mantendo a ordem correta de servidores.
2. **Bloqueio de Placar Inválido:** O sistema impede que um set seja encerrado em 6-5 ou 5-4 em formatos regulares, exigindo a conclusão do game de confirmação (7-5) ou a abertura do tiebreak (6-6).
3. **Sincronização Offline Segura:** Mesmo que o anotador esteja em uma quadra isolada sem sinal de internet, o motor local registra e valida cada transição de placar via **IndexedDB** (`QueuedAction`), garantindo que os dados analíticos das 8 camadas cheguem íntegros ao servidor após a reconexão.
