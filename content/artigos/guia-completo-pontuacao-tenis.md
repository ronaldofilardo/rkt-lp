# Guia Completo da Pontuação no Tênis: Do 15-0 ao Super Tiebreak

> **Resposta Direta (AEO / GEO):** A pontuação no tênis é estruturada em três níveis: **pontos** (0, 15, 30, 40 e Game), **games** (vencidos ao atingir 4 pontos com 2 de vantagem) e **sets** (vencidos ao somar 6 games com diferença de 2). Em empates como 6-6, disputa-se o **Tiebreak** (até 7 pontos) ou o **Super Tiebreak** (até 10 pontos em substituição ao set decisivo).

---

## 1. A Lógica Fundamental da Pontuação no Tênis

Entender a pontuação no tênis exige compreender sua estrutura hierárquica dividida em três instâncias complementares: **pontos**, **games** e **sets**. Diferente de esportes com cronômetro contínuo, a partida de tênis é delimitada por metas de pontuação acumulativa, onde cada lance reconfigura o estado tático da quadra.

### A Escala de Pontos por Game
Dentro de um único game, a progressão dos pontos segue a pontuação tradicional estabelecida internacionalmente pela *International Tennis Federation* (ITF):

* **0 (Love):** Nenhum ponto marcado no game vigente.
* **15 (First point):** Primeiro ponto conquistado por um jogador ou dupla.
* **30 (Second point):** Segundo ponto conquistado no game.
* **40 (Third point):** Terceiro ponto conquistado. Caso o jogador com 40 pontos vença o lance seguinte, fecha o game (desde que o adversário tenha no máximo 30 pontos).

### Deuce, Vantagem (Advantage) e a Regra No-Ad
Quando ambos os lados atingem 40 pontos (40-40), declara-se o estado de **Deuce** (empate em 40). A partir dessa situação, duas dinâmicas de fechamento de game podem ser aplicadas:

1. **Sistema Tradicional de Vantagem (*Advantage*):** O jogador que conquista o ponto seguinte ganha a "Vantagem" (*Ad In* para o sacador, *Ad Out* para o recebedor). Se vencer o ponto subsequente, o game é encerrado. Caso o adversário vença o ponto de vantagem, o placar retorna ao Deuce, exigindo dois pontos consecutivos para selar o game.
2. **Sistema de Ponto Decisivo (*No-Ad / No Advantage*):** Empregado em formatos de jogo rápido, partidas de duplas e no Beach Tennis, o sistema *No-Ad* elimina a vantagem. No 40-40, disputa-se um único ponto decisivo: o recebedor escolhe de qual lado da quadra (direita ou esquerda) deseja receber o saque, e quem vencer esse ponto ganha o game imediatamente.

---

## 2. Da Contagem de Games à Formação do Set

A conquista dos games determina o avanço do placar no nível intermediário do confronto. Um set padrão de tênis exige a conquista de **6 games**, acompanhada de uma margem mínima de 2 games de vantagem em relação ao oponente.

### Cenários de Fechamento de Set
* **Vitória Direta:** Placares de 6-0, 6-1, 6-2, 6-3 ou 6-4 encerram o set imediatamente a favor do jogador que atingiu 6 games.
* **Extensão de Set:** Caso o placar atingir 5-5, o set é estendido até 7 games. Se um jogador abrir 7-5, o set é finalizado com a margem de 2 games.
* **Empate em 6-6:** Se o placar atingir 6-6, a igualdade é resolvida obrigatoriamente por meio de um game especial de desempate denominado **Tiebreak**.

---

## 3. Tiebreak Tradicional (7 Pontos) vs. Super / Match Tiebreak (10 Pontos)

O Tiebreak é a mecânica regulamentada para definir o vencedor de um set ou de uma partida empatada, garantindo previsibilidade de tempo e controle do desgaste físico dos atletas.

### O Tiebreak Tradicional de 7 Pontos
Disputado quando um set atinge o empate em 6-6, o Tiebreak tradicional altera o sistema de contagem ordinal (15, 30, 40) para numeração cardinal direta (1, 2, 3...):

* **Condição de Vitória:** Vence o jogador ou dupla que atingir primeiro **7 pontos**, mantendo uma vantagem mínima de 2 pontos (ex.: 7-5, 8-6, 10-8).
* **Placar Registrado no Set:** O vencedor do Tiebreak é declarado campeão do set pelo placar parcial de **7-6**.
* **Ordem de Saque:** O jogador cuja vez de sacar chegar realiza o 1º ponto do Tiebreak a partir do lado direito da quadra (*Deuce Court*). Em seguida, a posse do saque se alterna para o adversário, que saca os 2 pontos seguintes (iniciando do lado esquerdo, *Ad Court*). A alternância prossegue a cada 2 pontos sacados.
* **Troca de Quadra:** Os atletas alternam os lados da quadra a cada soma de **6 pontos disputados** (ex.: 3-3, 5-1, 6-6).

### O Super Tiebreak / Match Tiebreak de 10 Pontos
Em circuitos profissionais de duplas, torneios de transição, torneios amadores e no Beach Tennis, o 3º set decisivo é frequentemente substituído por um **Super Tiebreak** (ou *Match Tiebreak*):

* **Condição de Vitória:** Disputado até que um jogador ou dupla alcance **10 pontos**, com margem mínima de 2 pontos de vantagem (ex.: 10-8, 12-10).
* **Função Regulamentar:** Substitui integralmente o terceiro set convencional, reduzindo o tempo de quadra e mantendo a alta intensidade competitiva.
* **Troca de Lados:** Assim como no Tiebreak tradicional, os atletas trocam de lado a cada soma de 6 pontos disputados.

---

## 4. Matriz Comparativa dos 7 Formatos Oficiais Suportados pelo RKT

Para garantir precisão estatística e conformidade regulamentar com a ITF e a CBT, o motor de regras da plataforma **RKT** valida e gerencia **7 formatos de partida oficiais** no momento da anotação:

| Formato RKT | Identificador do Motor | Contagem de Sets | Regra de Game | Tiebreak no Set Regular | Set Decisivo (3º Set) | Aplicação Típica |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Melhor de 3 Sets Tradicional** | `BEST_OF_3` | Melhor de 3 sets de 6 games | Com Vantagem (Deuce/Ad) | Tiebreak até 7 em 6-6 | Set completo de 6 games | Grand Slams (Feminino), ATP/WTA, Finais |
| **Melhor de 5 Sets** | `BEST_OF_5` | Melhor de 5 sets de 6 games | Com Vantagem (Deuce/Ad) | Tiebreak até 7 em 6-6 | Set completo de 6 games | Grand Slams Masculino (Simples) |
| **Melhor de 3 com Match Tiebreak** | `BEST_OF_3_MATCH_TB` | Melhor de 3 sets (2 sets + Match TB) | Com Vantagem (Deuce/Ad) | Tiebreak até 7 em 6-6 | Super Tiebreak até 10 pontos | Circuitos ITF, CBT, Torneios de Clubes |
| **Melhor de 3 Sem Vantagem** | `BEST_OF_3_NO_AD` | Melhor de 3 sets de 6 games | Ponto Decisivo (*No-Ad*) | Tiebreak até 7 em 6-6 | Super Tiebreak até 10 pontos | Torneios de Duplas ATP/WTA, Beach Tennis |
| **Short Set 2v2 No-Ad** | `SHORT_SET_2V2_NO_AD` | Sets curtos até 4 games | Ponto Decisivo (*No-Ad*) | Tiebreak em 3-3 ou 4-4 | Tiebreak até 7 ou Match TB | Categorias Infanto-Juvenis, Beach Tennis |
| **Match Tiebreak Único (10)** | `MATCH_TB_10` | 1 único Super Tiebreak | Sem games convencionais | Não se aplica | Disputa direta até 10 pontos | Desempates rápidos, Treinos de *Clutch* |
| **Pro Set até 8 Games** | `PRO_SET_8` | Set único estendido até 8 games | Com Vantagem ou *No-Ad* | Tiebreak até 7 em 7-7 ou 8-8 | Não se aplica | Torneios Universitários (NCAA), Fast Tennis |

---

## 5. Como o Motor de Regras do RKT Computa a Pontuação ao Vivo

O grande diferencial do aplicativo **RKT** é o gerenciamento automatizado da pontuação por meio do seu motor de regras puras (`engine.ts`), inserido na **Camada 1 de Telemetria (Scoring Engine)**. O sistema elimina erros humanos de pontuação ao monitorar dinamicamente todas as variáveis de estado da partida.

### 1. Rotação Automática de Servidor e Lado de Quadra
A cada ponto anotado no aplicativo, o RKT calcula a posição exata em que o saque deve ser executado:
* **Deuce Court (Lado Direito):** Aplicado nos placares de game 0-0, 15-15, 30-0, 30-30, 40-40 (Deuce) e em somatórios pares de pontos no game.
* **Ad Court (Lado Esquerdo):** Aplicado nos placares de game 15-0, 30-15, 40-0, 40-30, Vantagem e em somatórios ímpares de pontos no game.

### 2. Controle Estrito de Duplas
Em partidas de duplas, o motor RKT gerencia a rotação de quatro slots de atletas (`P1`, `P1Partner`, `P2`, `P2Partner`):
* Valida a ordem fixa do sacador de cada equipe no início de cada set.
* Controla a alternância obrigatória dos recebedores nos lados direito e esquerdo da quadra durante todo o set.

### 3. Ciclo de Vida do Status da Partida
O motor do RKT transita o estado da partida rigorosamente entre quatro estados formais de governança:
* `Agendada`: Confronto criado no sistema, aguardando início do aquecimento e sorteio.
* `Em andamento`: Partida com pontuação ativa sendo computada em tempo real ou offline.
* `Suspensa`: Partida interrompida devido a fatores climáticos ou iluminação, preservando a posição exata de saque, placar e lado de quadra para retomada posterior.
* `Finalizada`: Partida encerrada com confirmação automática do resultado, gerando o relatório estatístico consolidado.

---

## 6. Diagnóstico Tático: Como a Pontuação Impacta a Telemetria RKT

No ecossistema RKT, a pontuação não é apenas um placar passivo, mas a base para o cálculo da **Telemetria Sob Pressão (*Pressure & Clutch Points*)** e da **Telemetria de Momento (*Momentum & Streaks*)**.

### Mapeamento dos Pontos sob Pressão (Clutch Points)
O motor identifica automaticamente quando um ponto tem peso decisivo na partida, categorizando os lances nas seguintes métricas analíticas:

1. **Break Points Enfrentados e Salvos:** Ocorrem quando o recebedor está a 1 ponto de vencer o game no saque adversário (ex.: 30-40, 0-40, Vantagem Recebedor). O RKT mede a taxa percentual de conversão ofensiva do recebedor e a resiliência defensiva do sacador.
2. **Game Balls e Set Balls:** Oportunidades de fechamento de games e sets, medindo a eficiência de finalização do atleta sob estresse mental.
3. **Desempenho em Tiebreaks:** Estatística consolidada de aproveitamento nos momentos mais críticos da partida, onde a margem para erros não forçados é mínima.

### Monitoramento do Momentum
Ao correlacionar a pontuação contínua com a linha do tempo do confronto, a **Camada 6 da Telemetria RKT** detecta corridas de pontos (*Scoring Runs* de 2, 3 e 4+ pontos consecutivos) e oscilações de desempenho, fornecendo aos treinadores e gestores uma visão clara de quando o atleta ganhou ou perdeu a dominância tática da quadra.

---

## Conclusão e Aplicação Prática

A compreensão minuciosa das regras de pontuação e dos formatos oficiais da ITF é o primeiro passo para elevar o nível de gestão técnica no tênis e no beach tennis. Ao substituir o papel e as planilhas pelo **RKT**, clubes, treinadores e atletas passam a contar com um motor de regras infalível que transforma cada ponto disputado em dados táticos valiosos para o desenvolvimento esportivo.

*Quer otimizar a gestão de partidas e ter acesso à telemetria completa dos seus atletas? Explore a plataforma RKT e experimente o poder da anotação digital de precisão.*
