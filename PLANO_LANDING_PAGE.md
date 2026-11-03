# 🚀 Plano Diretor da Landing Page — RKT Tennis
> **Versão:** 2.1 (Demo-First · Data-Driven · Steep-Structured Architecture)  
> **Repositório da Landing Page:** `c:\apps\RKT-LP`  
> **Sistema Principal de Referência (Backend/App/Core):** `c:\apps\RKT`  
> **Data:** 01/11/2026  
> **Metodologia:** STE-DEV (Regra R-03: arquivos $\le 100$ linhas)  
> **Identidade Visual:** Telemetry Design System (Dual-Theme Claro/Escuro com Tokens `telemetry-*`)  

---

## 1. Visão Geral & Proposta de Valor

A Landing Page do **RKT** tem como missão posicionar a plataforma como uma solução de **anotação de partidas e análise de telemetria de tênis** para Atletas, Treinadores, Gestores de CT e Espectadores/Pais.

A experiência usa uma **partida simulada** com dados e métricas compatíveis com o sistema para explicar o produto, sem transmitir partidas nem consultar dados ao vivo. As animações são demonstrativas e não devem ser apresentadas como dados em tempo real.

### Conexão e Fonte da Verdade com o Sistema Principal (`c:\apps\RKT`)
- **Design Tokens & Dual-Theme:** `c:\apps\RKT\docs\DESIGN.md`, `c:\apps\RKT\src\app\globals.css` e `tailwind.config.ts`.
- **Regras Arquiteturais:** `c:\apps\RKT\docs\RULES.md` (R-03: arquivos $\le 100$ linhas; proibição estrita de cores genéricas como `bg-gray-*`, `bg-sky-*`, etc.).
- **Motor de Regras & Tipos de Telemetria:** `c:\apps\RKT\docs\PRD.md`, `c:\apps\RKT\src\core\report\report-stats.types.ts` e `c:\apps\RKT\src\core\report\report-analysis.types.ts`.
- **Fluxo de Cadastro & Perfis:** `c:\apps\RKT\src\app\signup\page.tsx` (suporte com pré-seleção via `?perfil=` e `?origem=`).
- **Brand Assets:** `c:\apps\RKT\public\brand\logo.png` e `c:\apps\RKT\src\components\ui\brand-logo.tsx`.
- **Conformidade Legal & LGPD:** `c:\apps\RKT\src\app\termos\page.tsx` e `c:\apps\RKT\src\app\privacidade\page.tsx`.

---

## 2. Fundamentos de Geometria, Espaço & Tokens Visuais (Estilo Steep + Telemetry)

A estrutura espacial combina a referência editorial do Steep.app com os tokens canônicos do Telemetry Design System. Os tokens do sistema principal são a fonte de verdade; exceções só devem ser introduzidas se forem documentadas e aprovadas.

### A. Grade Espacial e Respiro
- **Container Central:** `max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-6` (gutters canônicos de 12px, 16px e 24px).
- **Respiro entre Seções:** `py-12 md:py-16 lg:py-24` (48px mobile, 64px tablet, 96px desktop).
- **Padding Interno de Cards:** `p-5 sm:p-6` para cards de métricas e `p-8 lg:p-10` para os grandes containers da vitrine.
- **Densidade:** utilizar a escala de espaçamento do sistema; não introduzir valores avulsos sem necessidade comprovada.

### B. Sistema de Raios de Borda
- **Botões de Ação (Pills) & Badges:** `rounded-full` (`9999px`).
- **Content Cards:** `rounded-2xl` (16px); grandes blocos funcionais podem usar `rounded-3xl` (24px).
- **Artefatos Flutuantes de Telemetria:** `rounded-2xl` (16px).
- **Inputs & Elementos Internos:** `rounded-2xl` (16px).
- **Mini-gráficos & Telas SVG:** `rounded-xl` (12px).

### C. Elevação & Superfícies Dual-Theme
- **Regra de Ouro:** Cards de conteúdo normais são planos (`bg-telemetry-card border border-telemetry-border/10`).
- **Artefatos Flutuantes:** usar os tokens oficiais de elevação e foco do sistema. Não criar sombra customizada de três camadas sem registrar a exceção no design system.
- **Cores:** uso exclusivo dos tokens semânticos:
  - Fundo principal: `bg-telemetry-base` (alternando com `bg-telemetry-surface`).
  - Destaques esportivos: `text-telemetry-volt`, `bg-telemetry-volt`, `text-telemetry-blue`, `border-telemetry-border`.

---

## 3. Camadas de Telemetria do Sistema e Escopo da LP

As camadas abaixo descrevem capacidades e contratos do sistema RKT, não uma promessa de que a landing page exibirá partidas ao vivo. A LP apresentará uma partida **simulada**, usando métricas compatíveis com os tipos reais do sistema. Qualquer métrica não fornecida diretamente pelo motor deve ser identificada como derivada ou ilustrativa.

1. **Scoring Engine:** formatos e regras de pontuação configuráveis no sistema.
2. **Telemetria de Saque:** aproveitamento de primeiro e segundo saque, pontos ganhos, aces, duplas faltas e velocidade quando disponível.
3. **Telemetria de Devolução:** pontos ganhos na devolução e oportunidades/conversões de break conforme os contratos disponíveis.
4. **Pontos de Pressão:** break points e set points; não chamar de “Clutch Index” sem definir e documentar um cálculo real.
5. **Matriz Tática de Golpes & Ralis:** winners, erros, distribuição e extensão de ralis conforme os dados efetivamente registrados.
6. **Momento & Dinâmica:** streaks e scoring runs; não rotular como medição de controle emocional.
7. **Tempo & Ritmo:** duração total e efetiva quando disponível. Ritmo médio entre pontos só pode ser exibido se houver dado ou cálculo definido.
8. **Transmissão & Governança:** o sistema define quais partidas podem ser públicas e aplica suas regras de privacidade. Não haverá transmissão nem consulta de partidas na landing page.


---

## 4. Arquitetura de Conversão & Rastreamento

Cada ponto de contato na Landing Page envia o usuário ao fluxo correspondente no sistema principal. A origem é enviada pelo parâmetro `origem`; a implementação da instrumentação analítica e sua política de consentimento devem ser definidas separadamente.

| Ponto de Contato (CTA) | Rota de Destino | Perfil Pré-selecionado | Origem |
|---|---|---|---|
| **Header (Criar Conta)** | `https://<dominio-do-sistema>/signup?origem=lp_header` | Padrão (Atleta) | `lp_header` |
| **Hero (Começar Agora)** | `https://<dominio-do-sistema>/signup?origem=lp_hero` | Padrão (Atleta) | `lp_hero` |
| **Card: Atleta** | `https://<dominio-do-sistema>/signup?perfil=ATLETA&origem=lp_audience` | `ATLETA` | `lp_audience` |
| **Card: Treinador** | `https://<dominio-do-sistema>/signup?perfil=TREINADOR&origem=lp_audience` | `TREINADOR` | `lp_audience` |
| **Card: Gestor de CT** | `https://<dominio-do-sistema>/signup?perfil=GESTOR&origem=lp_audience` | `GESTOR` | `lp_audience` |
| **Card: Espectador / Pais** | `https://<dominio-do-sistema>/signup?perfil=ESPECTADOR&origem=lp_audience` | `ESPECTADOR` | `lp_audience` |
| **CTA Final (Rodapé)** | `https://<dominio-do-sistema>/signup?origem=lp_bottom` | Padrão | `lp_bottom` |
| **Conhecer acompanhamento** | Placeholder informativo, sem busca ou feed ao vivo na LP | N/A | N/A |

`<dominio-do-sistema>` deve ser uma configuração por ambiente, inicialmente planejada como `sistema.rkt-app.com`; o endereço final será confirmado antes do deploy. Construir query strings com codificação apropriada. A LP não usará `/matches/acompanhar/[id]` nem `/matches/locate` como funcionalidade demonstrativa enquanto não houver integração definida.

---

## 5. Ordem Executiva de Execução & Componentização (STE-DEV R-03)

Todos os arquivos `.tsx` e `.ts` devem respeitar estritamente $\le 100$ linhas. Conteúdos densos e fixtures de partidas simuladas residem em `src/data/*.data.ts`.

### Etapa 1: Fundação da LP, Hospedagem e Fixture de Demonstração
> ✅ **Concluída.**

1. **Bootstrap do projeto:** criar a aplicação Next.js, TypeScript, Tailwind/PostCSS, layout raiz, fontes, lint, testes e configuração por ambiente. O repositório da LP é independente do sistema principal.
2. **Hospedagem e navegação:** a landing page será publicada em `rkt-app.com`; o sistema principal ficará em `sistema.rkt-app.com` ou subdomínio equivalente a definir antes do deploy. CTAs e links legais devem usar URLs-base configuráveis por ambiente, não caminhos relativos presumidos.
3. **Rota pública:** definir a raiz do domínio da LP como pública na própria aplicação. Não alterar o middleware do sistema principal para servir a LP: atualmente `/` redireciona para `/login`.
4. **SEO & Metadados:** title, description, OpenGraph, Twitter Cards, domínio canônico e dados estruturados somente para informações verdadeiras da plataforma; não declarar partida ao vivo na LP.
5. **Fixture de demonstração (`src/data/mock-match.data.ts`):** produzir uma partida simulada e coerente com os tipos e métricas existentes no sistema. Dados não representam uma partida oficial real, não devem incluir dados pessoais e devem distinguir campos reais de métricas derivadas ou ilustrativas.
6. **Regra STE-DEV R-03:** todos os arquivos `.ts` e `.tsx` devem ter no máximo 100 linhas, com complexidade ciclomática menor que 10 por arquivo. Aplicar desde a fundação e validar continuamente; decompor com coesão, sem fragmentação artificial.

### Decisões transversais antes das etapas visuais
- **Animações:** priorizar CSS e Web APIs nativas (`IntersectionObserver`, `requestAnimationFrame`) para transições e microanimações simples. Não instalar biblioteca de animação inicialmente. Se a navegação animada exigir `layoutId` ou recursos de animação compartilhada, reavaliar e aprovar uma dependência antes dessa etapa. Toda animação respeita `prefers-reduced-motion`.
- **Tokens e contratos:** manter os tokens de design e os tipos de domínio alinhados à fonte canônica em `c:\apps\RKT`; documentar o processo de atualização para evitar cópias divergentes. A fixture usa os contratos reais disponíveis e identifica explicitamente dados demonstrativos/derivados.
- **Busca e transmissão:** a LP não apresentará partidas ao vivo nem realizará busca funcional de partidas. A funcionalidade da Etapa 8 ficará como placeholder visual/informativo até que produto, contrato e integração sejam definidos. O sistema principal já possui mecanismo para determinar quais partidas podem ser públicas; eventual integração futura deve respeitar essa decisão do sistema.
- **Privacidade:** o sistema principal será responsável pelas proteções de LGPD e ECA Digital, incluindo publicação de partidas, consentimentos e proteção de menores. A LP não deve afirmar ou simular conformidade por meio de efeitos visuais; usar apenas texto institucional aprovado.

### Etapa 2: Header Fixo com Scroll-Spy (`Header.tsx` + `HeaderNav.tsx`)
> ✅ **Concluída.** Logo oficial pendente: `BrandLogo` usa wordmark provisório em texto (trocar só esse arquivo). `ThemeToggle` segue o tema do dispositivo até o usuário escolher; menu mobile em 2ª linha rolável. `SectionPlaceholder` é temporário e sai conforme as etapas 3–12.

- Container `sticky top-0 z-50 backdrop-blur-md border-b border-telemetry-border/10`.
- Esquerda: `<BrandLogo size="md" href="/" priority />`.
- **Centro:** Âncoras semânticas com indicador de seção ativa. Implementar com CSS/estado simples; não usar `layoutId` nem pressupor biblioteca Motion.
- Direita: `<ThemeToggle />`, link "Entrar" e CTA Pill "Criar conta" (`rounded-full`).

### Etapa 3: Hero Demonstrativo (`Hero.tsx` + `HeroArtifacts.tsx`)
> ✅ **Concluída.** Headline + pill-badge + pill-pair CTAs + `CourtLines` SVG dual-theme + `HeroScoreboard` e `HeroServeCard` alimentados pela fixture. Fade-in via IntersectionObserver e flutuação CSS. Cursores multiusuário não implementados (plano, seção 3). Logo ainda pendente no `BrandLogo`.

- **Pill Badge no topo:** indicar “Demonstração interativa” e direcionar para a vitrine simulada, sem badge “AO VIVO”.
- **Display Title:** headline forte focada na substituição da intuição pela precisão de dados.
- **Pill Pair CTAs:** botão primário preenchido (`bg-telemetry-blue rounded-full text-white`) + secundário com borda.
- **Fundo SVG com Trajetória:** linhas da quadra em SVG (`CourtLines.tsx`) e trajetória ilustrativa da bola; deixar claro pelo contexto que é uma simulação.
- **Artefatos Demonstrativos:** placar, velocidade de saque e momentum alimentados pela fixture, sem loops que sugiram transmissão em curso.
- **Cursores Colaborativos (Desktop):** remover a simulação de cursores e cliques multiusuário; não representa colaboração ao vivo disponível na LP.

### Etapa 4: Os 3 Pilares com Micro-SVGs (`TelemetryPillars.tsx` + `PillarCard.tsx`)
> ✅ **Concluída.** Grid 3 colunas → carrossel snap no mobile. Ícones SVG animados por pilar; `acompanhar` em opacity reduzida com copy de funcionalidade futura. Token `telemetry-surface` adicionado ao design system.

Grid de 3 colunas (que vira carrossel suave com *snap-x* no mobile):
1. **Anotar (Ponto a Ponto):** Mini-SVG animado simulando o toque na quadra que gera o ponto.
2. **Acompanhar (Futuro):** mini-SVG/ícone informativo sobre o acompanhamento público, sem onda de transmissão em tempo real.
3. **Analisar (Inteligência):** Mini-SVG com micro-barras subindo.

### Etapa 5: Como Funciona com Linha Conectora (`HowItWorks.tsx` + `StepItem.tsx`)
> ✅ **Concluída.** Sequência 01→04 com `StepItem` e linha conectora animada via `useScrollProgress` + `ProgressLine`. Mobile: linha vertical; desktop: horizontal com preenchimento volt proporcional ao scroll. `prefers-reduced-motion`: linha aparece completa.

- Sequência `01 → 02 → 03 → 04` conectada por linha de progresso animada com o scroll (`useScrollProgress`):
  - **Desktop:** Linha horizontal conectando os 4 blocos.
  - **Mobile:** Linha vertical à esquerda com preenchimento em `telemetry-volt`.
- Passos: Cadastro → Vinculação ao CT/Treinador → Anotação na Quadra (PWA) → Análise Tática.

### Etapa 6: Perfis Baseados em Perguntas Reais (`TargetAudience.tsx` + `audience.data.ts`)
> ✅ **Concluída.** 4 cards com pergunta real de cada persona. Tilt no hover (desktop) desativado em `prefers-reduced-motion`. Carrossel snap no mobile → grid 2×2 tablet → 4 colunas desktop. Gestor com CTA `Solicitar cadastro do clube`. Espectador esclarece que partidas públicas são controladas pelo clube/treinador.

Cards com tilt sutil no desktop e carrossel snap no mobile, respondendo à dor central de cada persona:
- **Atleta:** *"Por que meu 1º saque oscila no 3º set?"* → Análise de fadiga e eficiência.
- **Treinador:** *"Onde meu atleta cedeu os pontos decisivos no tiebreak?"* → Matriz de erros e clutch.
- **Gestor de CT:** CTA com texto **“Solicitar cadastro do clube”** ou equivalente, levando ao fluxo de onboarding de gestor; evitar “Criar conta”/“Cadastrar agora”, pois o formulário abre uma etapa de onboarding em vez de concluir um cadastro imediato.
- **Espectador / Pais:** *"Como poderei acompanhar uma partida pública?"* → Informar que o produto oferece acompanhamento sujeito às regras de publicação e privacidade do sistema, sem sugerir que isso ocorre dentro da LP.

### Etapa 7: Vitrine Interativa de Telemetria Demonstrativa (`TelemetryShowcase.tsx` + 6 Abas)
> ✅ **Concluída.** Painel com 4 abas (Saque, Devolução, Pressão, Momentum) alimentadas pela fixture. `StatBar` com barra dupla animada. `MomentumDots` com dots proporcionais. CTA inline `origem=lp_telemetria`. Dados 100% da fixture — sem valores hardcoded no JSX.

Apresenta uma partida simulada em seis abas, com métricas compatíveis com os dados existentes no sistema. Não é placar ao vivo nem consulta a partidas reais. Deixar visível que os dados são demonstrativos.
- **Navegação:** Lista de 6 abas (desktop) ou chips horizontais roláveis (mobile). A troca automática de 4 segundos é opcional e só deve ser usada se não prejudicar navegação, leitura ou acessibilidade; pausa em foco, hover, toque, aba em segundo plano e `prefers-reduced-motion`.
- **Aba 1 (Saque):** métricas disponíveis de saque com `MiniBars.tsx`; não inventar mapa de direções se o fixture não possuir esses dados.
- **Aba 2 (Devolução):** métricas existentes de devolução e break; não inferir “devolução válida” sem contrato correspondente.
- **Aba 3 (Pontos de Pressão):** break points e set points disponíveis; evitar badge “CLUTCH” até haver definição e cálculo formal.
- **Aba 4 (Golpes e Ralis):** winners, erros e extensão de ralis conforme os tipos existentes.
- **Aba 5 (Momento e Duração):** streaks, scoring runs e duração disponíveis; sem rotular como controle emocional.
- **Aba 6 (Motor de Regras):** demonstrar formatos somente se a fixture e os contratos cobrirem os cenários exibidos.


### Etapa 8: Placeholder de Acompanhamento e Privacidade (`BroadcastPlaceholder.tsx`)
> ✅ **Concluída.** Bloco estático informativo. Não simula feed, código de acesso ou anonimização. 3 mini-cards (controle, privacidade por padrão, notificação). CTA `origem=lp_broadcast`.

- Exibir apenas um bloco informativo/visual estático indicando que o acompanhamento público será detalhado em uma etapa futura.
- Não simular digitação, consulta de código, abertura de placar, feed ao vivo ou dados de partidas públicas.
- Não demonstrar anonimização como prova de conformidade. O sistema principal é responsável por LGPD, ECA Digital, consentimentos e determinação das partidas públicas.
- Definir integração, conteúdo e critérios desta etapa futuramente, antes de substituir o placeholder por funcionalidade.

### Etapa 9: Marquee Técnico de Telemetria (`TelemetryMarquee.tsx`)
> ✅ **Concluída.** Faixa CSS pura com 18 métricas reais dos contratos. Animação `marquee-scroll` pausada em `prefers-reduced-motion`. `aria-hidden` no contêiner.

- Faixa técnica estática ou com movimento reduzido automaticamente, em CSS, usando apenas nomes de métricas existentes nos contratos. Não usar `Clutch Index`, `Shot Heatmap`, `Net Points` ou outros termos como recurso implementado se não houver definição e suporte correspondente.

### Etapa 10: Equipe e Autoridade (`Team.tsx` + `team.data.ts`)
> ✅ **Concluída.** Ronaldo Filardo e Eduardo Figueiredo com avatares de iniciais. Fade-up via `animation-timeline: view()` com fallback estático. Assinatura "Desenvolvido por Omni Sistemas · Be Smart".

- Apresentação minimalista da equipe fundadora com fade-up leve:
  - **Ronaldo Filardo**
  - **Eduardo Figueiredo**
  - Assinatura: *"Desenvolvido por Omni Sistemas · Be Smart"*.

### Etapa 11: FAQ Acessível Semântico (`FAQ.tsx` + `faq.data.ts`)
> ✅ **Concluída.** Acordeão nativo `<details name="rkt-faq">` com chevron rotacionando via `group-open:rotate-180`. Cobre telemetria, PWA offline, privacidade de menores (LGPD/ECA) e modelo de acesso.

- Acordeão nativo com `<details className="group">` e chevron rotacionando:
  - Explicação sobre telemetria esportiva.
  - Funcionamento offline via PWA na quadra.
  - Protocolo de privacidade e proteção de dados de menores.
  - Modelo de acesso e gratuidade para espectadores.

### Etapa 12: CTA Final, Rodapé e Mobile Sticky CTA (`FinalCTA.tsx`, `Footer.tsx`, `MobileStickyCTA.tsx`)
> ✅ **Concluída.** `FinalCTA` com pill pair centralizado. `Footer` com 4 links institucionais apontando para o sistema (não para a LP), copyright dinâmico e assinatura Curitiba. `MobileStickyCTA` com `IntersectionObserver` no sentinel do Hero, `tabIndex=-1` quando oculto, `pb-safe` e `motion-reduce:transition-none`.

- **FinalCTA:** Bloco de fechamento em pill pair centralizado com link direto para o cadastro.
- **Footer:** links institucionais; Termos e Privacidade apontam para o domínio do sistema configurado por ambiente, não para rotas locais da LP.
- **MobileStickyCTA:** Botão fixo inferior que surge via fade/slide após o usuário rolar além do Hero, garantindo conversão contínua em telas pequenas com `pb-safe`.

---

## 6. Primitivas Reutilizáveis & Hooks Isolados

Para assegurar conformidade total com a regra **STE-DEV R-03 ($\le 100$ linhas)**:

### Componentes Primitivos (`src/components/telemetry-ui/`)
- `CountUp.tsx`: Animação de números com curva de aceleração e prevenção de hidratação.
- `ProgressRing.tsx`: SVG vetorial circular com interpolação de stroke-dashoffset.
- `MiniBars.tsx`: Barras de progresso duplas com stagger delay.
- `CourtLines.tsx`: Malha vetorial da quadra de tênis com suporte nativo a dual-theme via `currentColor`.
- `Reveal.tsx`: Wrapper atômico para entrada suave via IntersectionObserver.
- `HeroCursors.tsx`: remover da implementação inicial; cursores multiusuário não fazem parte da demonstração da LP.

### Hooks Isolados (`src/hooks/`)
- `useInView.ts`: Detecção eficiente de viewport sem dependência de scroll listeners pesados.
- `useCountUp.ts`: Lógica matemática de aceleração e easing de contadores.
- `useScrollProgress.ts`: normalização de progresso da página e containers, somente se necessário para revelar o fluxo sem impor animação essencial.
- `useChoreography.ts`: não previsto na implementação inicial; preferir animações CSS simples e estados declarativos.

---

## 7. Guardrails de Performance, Acessibilidade e Engenharia

1. **Acessibilidade & `prefers-reduced-motion`:** animações demonstrativas são pausáveis e têm estado estático equivalente; respeitar foco, teclado, toque, aba em segundo plano e preferência por movimento reduzido.
2. **Performance Mobile:** medir carregamento, estabilidade visual e execução em dispositivos móveis definidos no plano de teste; animar preferencialmente `transform` e `opacity`.
3. **Isolamento de Hidratação SSR (Next.js App Router):**
   - As seções principais permanecem React Server Components (RSC) sempre que possível.
   - As micro-ilhas de interação (`CountUp`, `ProgressRing`, `ThemeToggle`) são declaradas com `"use client"` com valores iniciais estáticos garantidos no SSR.
4. **Validação Automatizada de Código:**
   - Typecheck sem erros e lint sem avisos.
   - Todos os arquivos `.ts`/`.tsx` com até 100 linhas e complexidade ciclomática menor que 10.
5. **Aceite funcional e de produto:**
   - Links de cadastro usam domínio configurável e preservam `perfil`/`origem`; CTA de gestor diz “Solicitar cadastro do clube” ou copy aprovada equivalente.
   - A fixture e a vitrine são identificadas claramente como simulação; nenhum componente ou metadado sugere transmissão ou consulta ao vivo na LP.
   - Termos e privacidade apontam para páginas oficiais no domínio do sistema.
   - Navegação por teclado, foco visível, contraste, temas claro/escuro, reduced motion e estados mobile são verificados.
   - Busca/transmissão permanecem placeholder até definição posterior; nenhuma integração ignora a regra do sistema que determina partidas públicas.
   - SEO, analytics e performance têm validação por ambiente e critérios medidos, não apenas declarações no plano.
