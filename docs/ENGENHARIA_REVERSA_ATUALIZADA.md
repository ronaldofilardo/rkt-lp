# Engenharia Reversa — RKT Landing Page (STE-DEV)

**Projeto:** `rkt-landing-page` (Next.js 15 + Tailwind, Front-end apenas)
**Modo:** Engenharia Reversa — Somente Leitura
**Stack observado:** Next.js 15.3.0, React 18.3, TypeScript 5.5, Tailwind CSS 3.4, ESLint 8, pnpm, tsx (testes)
**Total de arquivos em `src/`:** 108 (TS/TSX)
**Testes:** 18 arquivos em `tests/`

---

## 1. Princípios da Investigação Empírica

- **Modo somente leitura:** nenhuma linha de produção foi alterada, renomeada ou criada.
- **Separação fato/dedução:** `[OBSERVADO]` = evidência em código; `[INFERIDO]` = dedução lógica; `[NÃO VERIFICADO]` = não inspecionado.
- **Incerteza explícita (R-25):** nenhuma premissa tácita de negócio foi assumida.

---

## 2. Diagnóstico dos 6 Pilares

### Pilar 1: RBAC (Controle de Acesso Baseado em Papéis)

| Item | Status |
|---|---|
| Papéis e permissões | Inexistente |
| Autorização por recurso no servidor | N/A (site público) |
| Vulnerabilidade IDOR | N/A |

**[OBSERVADO]** `src/config/site.config.ts` define `UserProfile` (`ATLETA`, `TREINADOR`, `GESTOR`, `ESPECTADOR`) mas apenas como tipo de parâmetro de URL para `buildSignupUrl`. Não há middleware de autenticação, não há sessão, não há validação de papel no servidor.
**[INFERIDO]** O site é uma landing page pública; o RBAC é responsabilidade do sistema externo (`sistema.rkt-app.com`), não deste repositório.
**Risco:** Baixo.

---

### Pilar 2: RLS (Row-Level Security no Banco)

| Item | Status |
|---|---|
| RLS habilitado no banco | Ausente |
| Isolamento por tenant em queries | N/A |

**[OBSERVADO]** Não há banco de dados, nem ORM, nem migrations neste repositório. `src/data/` contém apenas arquivos estáticos (`.data.ts`) e mocks.
**[INFERIDO]** RLS não se aplica.
**Risco:** Baixo.

---

### Pilar 3: APIs (Contratos e Fronteiras)

| Item | Status |
|---|---|
| Validação de borda (Zod/schemas) | Ausente |
| Documentação de contrato (OpenAPI/types) | Parcial |
| Tratamento de erros (HTTP adequado) | N/A |

**[OBSERVADO]** Não há rotas de API (`app/api/`) nem Server Actions. Dados externos são consumidos apenas via `buildSignupUrl` (construção de URL para sistema externo). `src/lib/` contém utilitários de SEO, metadados, temas e artigos — sem validação Zod.
**[INFERIDO]** Como não há API própria, validação de borda com Zod não se aplica atualmente. Se endpoints forem adicionados futuramente, R-07 (validação Zod) será obrigatória.
**Risco:** Baixo (atual) / Médio (se exposto).

---

### Pilar 4: Banco de Dados (Modelagem e Persistência)

| Item | Status |
|---|---|
| Chaves estrangeiras / integridade referencial | Ausente |
| Índices em colunas de busca / tenant_id | Ausente |
| Migrations numeradas e imutáveis | Ausente |
| Transações atômicas | Ausente |

**[OBSERVADO]** Não há banco de dados nem camada de persistência.
**[INFERIDO]** Não se aplica.
**Risco:** Baixo.

---

### Pilar 5: Back (Backend e Regras de Negócio)

| Item | Status |
|---|---|
| Regras de domínio isoladas de framework | Parcial |
| Funções assíncronas com tratamento de erro | N/A |
| Logs sem dados sensíveis | N/A |

**[OBSERVADO]** Não há camada `domain/` pura. Regras de SEO/metadados estão em `src/lib/` (ex: `seo-schema.ts`, `page-metadata.ts`, `knowledge.ts`). Não há chamadas de banco nem I/O direto em componentes UI (R-04 respeitado na maioria dos casos). Não há logs estruturados.
**[INFERIDO]** O back-end é implicitamente o Next.js App Router (SSR/SSG). Regras de negócio estão dispersas entre `src/lib/` e componentes.
**Risco:** Médio (falta de separação domínio/infraestrutura).

---

### Pilar 6: Front (Interface e Apresentação)

| Item | Status |
|---|---|
| Componentes monolíticos (>100 linhas) | 2 violações |
| JSX com chamadas diretas de banco/API | Não observado |
| Cores/hex/pixels arbitrários (sem tokens) | Observado |
| Acessibilidade canônica (A11y) | Parcial |

**[OBSERVADO]**
- `src/components/hero/CourtLines.tsx`: 208 linhas (viola R-03).
- `src/app/sobre/equipe/[slug]/page.tsx`: 133 linhas (viola R-03).
- Uso de `<a>` para navegação interna em múltiplos componentes (ex: `HeaderNav.tsx:35`, `Footer.tsx:51,69,89,92`, `FinalCTA.tsx:29,35`, `MobileStickyCTA.tsx:38`, `Hero.tsx:37`, `TelemetryDemo.tsx:52`, `ContentShell.tsx:23` — este último já corrigido para `<Link>`).
- Classes Tailwind arbitrárias observadas: `text-[11px]`, `text-[10px]`, `p-[...]` (magic numbers, viola R-12).
- Tags HTML nativas soltas (`<p>`, `<span>`, `<h1>`) com classes dispersas (viola R-12 / frontend-ds.md).
- `footer/Footer.tsx:100` linhas (exatamente no limite de R-03).
- `src/components/telemetry-demo/TelemetryPanel.tsx:99` linhas (no limite de R-03).
- `src/components/share/ShareBlock.tsx:97` linhas (próximo do limite).

**[INFERIDO]** O projeto foi evoluído sem enforce consistente de R-03 e R-12. Existe convenção de `next/link` em `BrandLogo` e `not-found.tsx`, mas não aplicada uniformemente.
**Risco:** Médio.

---

## 3. Matriz de Lacunas Priorizada (S1 a S4)

| Severidade | ID | Descrição | Evidência |
|---|---|---|---|
| **S4 – Baixo** | R-01 | Ausência de `docs/glossario.md` e unicidade semântica de termos | Nenhum glossário no projeto |
| **S4 – Baixo** | R-26 | Ausência de `docs/ste-dev.md` como system of record | Apenas `SEO_GEO.md` e `PLANO_REFACTORING_STE_DEV.md` em `docs/` |
| **S3 – Médio** | R-03 | Arquivos > 100 linhas | `CourtLines.tsx` (208L), `sobre/equipe/[slug]/page.tsx` (133L) |
| **S3 – Médio** | R-12 | Magic numbers e classes arbitrárias fora de tokens | `text-[11px]`, `text-[10px]`, `font-mono text-[11px]` em `Footer.tsx` |
| **S3 – Médio** | R-13 | Acessibilidade canônica parcial | `<a>` sem `aria-label` em alguns casos; tags nativas soltas sem componentes canônicos |
| **S3 – Médio** | no-html-link-for-pages | Uso de `<a>` para navegação interna em vez de `<Link>` | Múltiplos `<a href="/...">` em componentes de navegação |

---

## 4. Resumo Executivo da Topologia

- **Stack Observado:** Next.js 15.3.0, React 18.3, TypeScript 5.5, Tailwind CSS 3.4, ESLint 8 (config `next/core-web-vitals`), pnpm, tsx para testes.
- **Tamanho do Sistema:** ~108 arquivos TS/TSX em `src/`, 18 arquivos de teste, ~20 páginas rotas no App Router, ~30 componentes UI.
- **Nível Geral de Risco:** Médio (front-end isolado, sem banco, sem API própria; principais riscos são de manutenibilidade e acessibilidade, não de segurança crítica).

---

## 5. Veredito e Plano Tático de Modernização

**Decisão formal:** Refatoração Cirúrgica (Strangler) — risco baixo, front-end isolado.

**Ordem recomendada para fatias:**

1. **Fatia A — Navegação Interna (`<Link>`):** Substituir todos os `<a href="/...">` de navegação interna por `<Link>` de `next/link`. Arquivos: `HeaderNav.tsx`, `Footer.tsx`, `FinalCTA.tsx`, `MobileStickyCTA.tsx`, `Hero.tsx`, `TelemetryDemo.tsx`, `ContentShell.tsx`, `CompanyFacts.tsx`, `AudienceCard.tsx`, `TargetAudience.tsx`, `BroadcastPlaceholder.tsx`, `ContentArticle.tsx`.
2. **Fatia B — Componentes > 100 linhas (R-03):** Dividir `CourtLines.tsx` (208L) e `sobre/equipe/[slug]/page.tsx` (133L) em subcomponentes < 100 linhas.
3. **Fatia C — Design System e Tokens (R-12, R-13):** Criar `src/design-system/tokens/`, substituir magic numbers (`text-[11px]`, `text-[10px]`) por tokens semânticos, substituir tags nativas soltas por `Heading`/`Text`/`Label`.
4. **Fatia D — Documentação (R-01, R-26):** Criar `docs/glossario.md` e `docs/ste-dev.md`.
5. **Fatia E — Testes de Caracterização:** Criar testes de caracterização para componentes alvo antes de refatorar (R-15).

**Pré-requisito inegociável (R-15):** Estabelecer baseline de testes 100% verde (`pnpm test`, `pnpm lint`, `pnpm typecheck`) antes da primeira alteração de código.

---

## 6. Regras STE-DEV Aplicadas (MUST) — Status Atual

| ID | Regra | Status no Projeto |
|---|---|---|
| R-01 | Unicidade semântica | ❌ Não implementado (sem glossário) |
| R-02 | Proibição de termos vagos | ⚠️ Parcial (não há `handle*`/`process*` observados, mas sem ESLint `id-denylist`) |
| R-03 | Arquivo ≤ 100 linhas | ❌ 2 violações (`CourtLines.tsx`, `sobre/equipe/[slug]/page.tsx`) |
| R-04 | UI puramente declarativa | ✅ Respeitado (sem I/O no JSX) |
| R-06 | Sem `any` nas fronteiras | ✅ (TypeScript strict, sem `any` observado) |
| R-12 | Estilo por tokens | ❌ Magic numbers observados (`text-[11px]`, `text-[10px]`) |
| R-13 | Acessibilidade canônica | ⚠️ Parcial (alguns `<a>` sem `aria-label`, tags nativas soltas) |
| R-15 | Baseline 100% verde pré-refatoração | ⏳ Pendente (não executado nesta sessão) |
| R-26 | System of Record | ❌ `docs/ste-dev.md` e `docs/glossario.md` ausentes |

---

**Nota:** Este relatório é resultado de engenharia reversa somente leitura. Nenhuma decisão de refatoração foi executada. A decisão sobre o que refatorar, manter ou reescrever cabe exclusivamente ao Dev Solo (R-27, Portão de Revisão).
