### 4. Matriz Tática de Golpes e Ralis — RKT

#### Visão Geral
A Matriz Tática de Golpes e Ralis do RKT é sustentada pelo schema do módulo `rally.ts`, fornecendo aos treinadores e atletas um diagnóstico minucioso da biomecânica esportiva e da eficiência tática. Em vez de avaliar apenas o placar final, a matriz analisa a qualidade de cada batida, a direção da bola, o efeito imprimido e a duração das trocas de bola.

#### Schema da Matriz Tática (`rally.ts`)

##### 1. Catálogo de Golpes (`ShotType`)
Mapeamento preciso dos golpes executados em partidas de tênis e beach tennis:

| Sigla / Golpe | Nome Completo | Descrição Técnica e Aplicação |
| :--- | :--- | :--- |
| `Saque` | Saque / Serviço | Golpe inicial de colocação da bola em jogo efetuado por cima da cabeça. |
| `FH` | Forehand (Direito) | Golpe batido no lado dominante do corpo do atleta. |
| `BH` | Backhand (Reverso) | Golpe batido no lado não-dominante do corpo (uma ou duas mãos). |
| `VFH` | Voleio de Forehand | Golpe de interseção executado no lado dominante antes da bola quicar na quadra. |
| `VBH` | Voleio de Backhand | Golpe de interseção executado no lado não-dominante antes do quique. |
| `Smash` | Smash | Golpe de ataque potente desferido por cima da cabeça contra um lob do adversário. |
| `Drop Shot` | Deixadinha | Golpe curto e suave projetado para cair imediatamente após a rede. |
| `Lob` | Lob / Globo | Golpe elevado projetado para encobrir o adversário posicionado na rede. |
| `Passagem` | Passing Shot (Passada) | Golpe acelerado buscando passar pelo adversário subido à rede. |
| `Half-Volley` | Meia-Voleia / Bate-pronto | Golpe disparado no exato instante em que a bola quica na quadra. |
| `Swing Volley` | Voleio com Balanço | Voleio acelerado com rotação e balanço completo do braço. |

##### 2. Efeitos de Bola (`SpinType`)
* `topspin`: Efeito com rotação para a frente (topspin), fazendo a bola acelerar e quicar alto.
* `slice`: Efeito cortado com rotação para trás (backspin), mantendo a bola baixa e flutuante.
* `flat`: Golpe chapado sem efeito significativo, priorizando velocidade e trajetória direta.

##### 3. Direcionamento de Trajetória (`DirectionType`)
* `cruzada`: Bola direcionada na diagonal (*cross-court*).
* `paralela`: Bola direcionada na linha lateral da quadra (*down-the-line*).
* `centro`: Bola direcionada ao meio da quadra adversária (*center*).
* `inside-out`: Golpe batido do lado de backhand correndo para bater de forehand para a diagonal oposta.
* `inside-in`: Golpe batido de forehand no lado do backhand direcionado na paralela.

##### 4. Faixas Estritas de Extensão de Rali (`RallyLength`)
O número exato de trocas de bola por ponto é categorizado em 3 faixas estruturais:
* **`1–4` bolas (Ralis Curtos):** Pontos definidos no saque ou na primeira devolução. Mede a força do serviço e a agressividade do retorno.
* **`5–8` bolas (Ralis Médios):** Pontos definidos na fase de construção tática e transição para a rede.
* **`9+` trocas (Ralis Longos):** Pontos de alta exigência física e mental, medindo a paciência, consistência e solidez do jogo de fundo.

##### 5. Classificação Estrita de Desfecho (`PointOutcome`)
Cada ponto finalizado recebe uma classificação taxonômica estrita:
* `W` (**Winner / Golpe Vencedor**): Bola válida em quadra que o adversário não conseguiu tocar com a raquete.
* `EF` (**Erro Forçado**): Falha do jogador provocada diretamente pelo peso, profundidade ou angulação da bola do adversário.
* `ENF` (**Erro Não Forçado / Unforced Error**): Erro próprio em bola neutra ou sem pressão defensiva do adversário.
* `DF` (**Dupla Falta / Double Fault**): Erro cometido nos dois saques do mesmo ponto.

#### Diagnóstico e Uso Tático para Treinadores
Os dados da matriz tática alimentam relatórios comparativos que permitem:
1. **Mapeamento de Vulnerabilidades:** Identificar se o lado de `BH` produz mais `ENF` do que o de `FH`.
2. **Eficiência no Jogo de Rede:** Medir a taxa de conversão de pontos com `VFH`, `VBH` e `Smash` em subidas à rede.
3. **Ajuste da Estratégia por Faixa de Rali:** Descobrir se o atleta perde mais pontos em ralis curtos (`1–4`) por falta de saque ou em ralis longos (`9+`) por precipitação tática.
4. **Volume de Erros sob Efeito:** Identificar a receptividade e o controle do atleta contra bolas com `slice` ou `topspin`.

--------------------------------------------------------------------------------

*Módulo atômico: 4-matriz-tatica-de-golpes-e-ralis.md*
