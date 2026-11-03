# 📋 Plano de Execução: Nova Landing Page do RKT

> **Documento:** `PLANO_EXECUCAO_NOVA_LANDING.md`  
> **Repositório:** `c:\apps\RKT-LP`  
> **Status:** Aprovado e consolidado para implementação  
> **Metodologia:** STE-DEV (R-03: arquivos $\le 100$ linhas)

---

## 1. Diretrizes Centrais e Decisões de Negócio

| # | Diretriz | Implementação no RKT-LP |
|---|---|---|
| **1** | **H1 e Proposta de Valor** | **"Você vive o jogo. O RKT transforma cada anotação em evolução."** Foco direto na dor da anotação desperdiçada, sem jargões vazios. |
| **2** | **Regra de Ouro da Comunicação** | *O usuário registra, o RKT processa*. Jamais dizer "o RKT anota". |
| **3** | **Modelo de Acesso e Sem "Grátis"** | O modelo comercial para atletas e clubes está em calibragem. **Eliminar promessas de gratuidade**. CTAs: *«Ver demonstração»* e *«Experimentar o RKT»*. Micro-CTA: *«Demonstração com dados simulados · Sem necessidade de cartão de crédito · Funciona direto no navegador»*. |
| **4** | **Suavização do PWA** | Não expor o termo técnico "PWA" na interface. Comunicar como: *«Plataforma web que funciona direto no celular como um app, sem precisar baixar de lojas ou ocupar espaço»*. |
| **5** | **Registro Offline como Comodidade** | Mencioná-lo sutilmente nos bastidores como garantia de tranquilidade: *«Registro contínuo e sem interrupções, mesmo em quadras com sinal instável»*. |
| **6** | **Ecossistema Completo** | Atender **Centros de Treinamento (CTs), Treinadores, Atletas e Famílias/Pais** que acompanham a evolução de perto. |
| **7** | **Zero Prova Social Falsa** | Sem depoimentos simulados ou notas infladas. O produto se valida pela demonstração interativa e pelo bloco emocional de vivência de quadra. |
| **8** | **Redesenho do Rodapé** | Inspirado na clareza do modelo da Omni Sistemas (3 colunas organizadas, mais leve, com links diretos para `/artigos` e `/conhecimento`). |

---

## 2. Faseamento de Execução

### Fase 0: Validação de Arquitetura Técnica (Concluída)
* **Status:** O RKT-LP já opera 100% em **Next.js 15 App Router com SSG (Static Site Generation)**.
* **Comprovação:** Todas as 31 rotas são pré-renderizadas no build estático. O crawler recebe todo o conteúdo no HTML bruto sem depender de execução JavaScript.
* **Navegação:** Menus e links internos utilizam âncoras e rotas reais (`<a href>` e `<Link href>`).

---

### Fase 1: Copywriting e Estruturação de Conteúdo
1. **Hero & Micro-CTA:**
   * H1: *"Você vive o jogo. O RKT transforma cada anotação em evolução."*
   * Subtítulo: Foco em substituir a impressão subjetiva pós-jogo por dados táticos claros de rali, pontos de quebra e aproveitamento de saque.
   * Micro-CTA sem menção a "grátis": foco na facilidade de testar sem cartão de crédito.
2. **Key Takeaways (3 Pontos no Topo):**
   * *1. Registro simples na quadra:* feito por quem assiste ou treina, sem distrações.
   * *2. Processamento estatístico imediato:* mapas de consistência, erros não forçados e break points.
   * *3. Evolução baseada em fatos:* ajustes técnicos e táticos guiados pelo histórico real das partidas.
3. **Respostas Diretas (AEO / 40 a 50 palavras):**
   * Definições claras para *"O que é o RKT?"* e *"Como o RKT transforma anotações em evolução?"*.
4. **Tabela Comparativa Semântica ("Para quem é o RKT?"):**
   * Estruturada em `<table>` com `<th>` comparando:
     * *Atletas:* Deixam de depender da memória pós-jogo e enxergam onde os pontos foram perdidos.
     * *Treinadores:* Recebem relatórios precisos do desempenho dos alunos em torneios.
     * *Centros de Treinamento e Clubes:* Padronizam o acompanhamento metodológico de suas equipes.
     * *Famílias e Pais:* Apoiam o desenvolvimento esportivo com dados claros e incentivo positivo.
5. **Bloco Emocional ("A paixão de acompanhar o jogo"):**
   * Situação autêntica da vivência de quadra (o calor, a torcida, a tensão do match tiebreak) conectada à tranquilidade de ter o registro seguro.
6. **FAQ Consolidado (6 Perguntas):**
   * Alinhado com a ausência de gratuidade definitiva (planos em lançamento) e ênfase no uso web imediato.

---

### Fase 2: Metadados e Grafo JSON-LD
* Manter `<head>` otimizado com `title`, `meta description`, `canonical` e Open Graph.
* JSON-LD:
  * `SoftwareApplication` (sem bloco `offers` prematuro, informando que processa anotações de partidas).
  * `Organization` (Omni Sistemas / Be Smart, CNPJ 55.405.487/0001-84, desde 1996).
  * `Person` (Ronaldo Filardo, Fundador e Arquiteto).
  * `BreadcrumbList` nas rotas internas.
  * `FAQPage` restrito exclusivamente à Home.

---

### Fase 3: Hero, Key Takeaways e Barra de Progresso de Rolagem
1. **Componente de Progresso de Rolagem (`ScrollProgressBar.tsx`):**
   * Inspirado no design do `omni-sistemas.com`.
   * Barra horizontal fixa no topo (sub-header), mostrando percentual de rolagem vertical.
   * Gradiente baseado nas cores do design system (esmeralda/azul tênis).
   * Contraste calibrado para não sumir no dark mode (borda/brilho sutil).
2. **Hero e Key Takeaways:**
   * Atualização do H1 e remoção dos links do guia/glossário do Hero (movidos para o bloco de conhecimento inferior).
   * Inserção dos Key Takeaways logo abaixo da Hero.

---

### Fase 4: Sequência Estrutural da Landing Page
Organização do `<main>` em seções semânticas:
1. `<section id="hero">` — H1, Proposta de valor, CTAs de demonstração e cards simulados.
2. `<section id="key-takeaways">` — 3 pontos centrais de leitura rápida.
3. `<section id="o-que-e">` — O que é o RKT e resposta AEO direta.
4. `<section id="como-funciona">` — Os 3 passos: registrar, processar e evoluir.
5. `<section id="para-quem">` — Tabela semântica de perfis e dores resolvidas.
6. `<section id="telemetria">` — Demonstração interativa de placar e estatísticas.
7. `<section id="paixao">` — Bloco emocional do acompanhamento em família e equipe.
8. `<section id="compartilhar">` — Bloco de indicação para o clube ou treinador.
9. `<section id="faq">` — As 6 perguntas frequentes.
10. `<section id="conhecimento-artigos">` — Pontes de aprofundamento para `/artigos` e `/conhecimento`.

---

### Fase 5: Bloco de Compartilhamento / Indicação (`ShareBlock.tsx`)
* **Proposta:** Incentivar o atleta ou familiar a levar o RKT ao conhecimento do seu clube ou treinador.
* **Componente Interativo:**
  * Botão "Copiar link do RKT" utilizando `navigator.clipboard`.
  * Região de feedback acessível com `aria-live="polite"` ("Link copiado com sucesso!").
  * **Progressive Enhancement:** Exibição do link selecionável para funcionamento pleno mesmo sem JS.
  * **Rastreamento:** Parâmetro `?ref=compartilhar` no link de cópia, mantendo a tag `canonical` da Home estritamente limpa.
  * **Mobile:** Suporte à Web Share API nativa quando disponível.

---

### Fase 6: Redesenho do Rodapé (Inspirado no Modelo Omni Sistemas)
* **Objetivo:** Tornar o rodapé mais limpo, leve e hierárquico, eliminando a sobrecarga de links soltos.
* **Estrutura em 3 Colunas:**
  * **Coluna 1 — Identidade & Contato:**
    * Marca RKT + assinatura Omni Sistemas.
    * Chancela institucional: *«Desde 1996 • Atendimento direto com quem projeta»*.
    * WhatsApp: `(41) 99241-5220`.
    * E-mail oficial: `suporte@omni-sistemas.com`.
  * **Coluna 2 — Navegação da Landing:**
    * Como Funciona, Telemetria, Para Quem, Demonstração, FAQ.
  * **Coluna 3 — Institucional, Conteúdo e Governança:**
    * Metodologia STE-DEV.
    * Artigos (`/artigos`).
    * Base de Conhecimento (`/conhecimento`).
    * Card discreto: *«O RKT faz parte da BE SMART LTDA · CNPJ 55.405.487/0001-84»*.

---

### Fase 7: Verificação e Conformidade STE-DEV
* **Regra R-03:** Cada arquivo criado ou refatorado (`ShareBlock.tsx`, `ScrollProgressBar.tsx`, `Footer.tsx`, etc.) deve possuir **$\le 100$ linhas**.
* **Testes e Tipagem:**
  * Executar suite de testes unitários e de integração (`pnpm test`).
  * Validar tipagem (`pnpm typecheck`).
  * Build estático de produção (`pnpm build`) garantindo pré-renderização completa das 31 páginas.

