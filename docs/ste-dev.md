# STE-DEV — Registro de Decisões Arquiteturais

System of Record para decisões de arquitetura, contratos e histórico de migrações do projeto RKT Landing Page.
Mantido conforme R-26 (System of Record Solo) e R-15 (Baseline 100% Verde Pré-Refatoração).

---

## 1. Stack Observado

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js | 15.3.0 |
| UI | React | 18.3.0 |
| Tipagem | TypeScript | 5.5.0 |
| Estilização | Tailwind CSS | 3.4.17 |
| Gerenciador de pacotes | pnpm | — |
| Testes | tsx | 4.23.15 |
| Linter | ESLint | 8.57.1 (next/core-web-vitals) |

---

## 2. Arquitetura — 6 Pilares

O projeto é uma landing page front-end apenas. Não há banco de dados, nem API própria, nem RBAC/RLS neste repositório.

| Pilar | Status | Observação |
|---|---|---|
| RBAC | Inexistente | Site público; autenticação é responsabilidade do sistema externo (`sistema.rkt-app.com`) |
| RLS | Não se aplica | Sem banco de dados |
| APIs | Ausente | Sem rotas de API nem Server Actions; dados estáticos em `src/data/` |
| Banco | Ausente | Sem persistência |
| Back | Acoplado ao Front | Regras de SEO/metadados em `src/lib/`; sem camada `domain/` pura |
| Front | Componentes ≤ 100 linhas | R-03 respeitado após refatoração; `<Link>` para navegação interna |

---

## 3. Decisões de Refatoração (Fases Executadas)

### Fase 0 — Engenharia Reversa (somente leitura)

- Varredura dos 6 pilares concluída (docs/ENGENHARIA_REVERSA_ATUALIZADA.md).
- 2 violações R-03 encontradas: `CourtLines.tsx` (208L) e `sobre/equipe/[slug]/page.tsx` (133L).
- 4 magic numbers encontrados: `text-[11px]` e `text-[10px]` em `Footer.tsx`, `TargetAudience.tsx`, `AudienceCard.tsx`.
- Vários `<a>` para navegação interna sem `<Link>` de `next/link`.

### Fase 1 — Baseline de Testes 100% Verde (R-15)

- `pnpm test`: 144 pass, 0 fail.
- `pnpm lint`: 0 erros, 0 warnings.
- `pnpm typecheck`: limpo.

### Fase 2 — Iteração A: Navegação Interna (`<Link>` em vez de `<a>`)

Arquivos alterados:
- `src/components/footer/Footer.tsx` — `<Link>` para `/para-atletas`, `/para-treinadores`, `/para-gestores` e páginas de conteúdo.
- `src/components/audience/AudienceCard.tsx` — `<Link>` para `card.path` (rotas `/para-*`).
- `src/components/audience/TargetAudience.tsx` — `<Link>` para `card.path` (rotas `/para-*`).
- `src/components/content/ContentShell.tsx` — já estava corrigido previamente.

### Fase 2 — Iteração B: Componentes Monolíticos (R-03)

Arquivos divididos:
- `src/app/sobre/equipe/[slug]/page.tsx` — 133L → 100L. Extraídos: `CredentialCard.tsx`, `FaqCard.tsx`, `BioNotFound.tsx`, `bioForSlug` (movido para `src/lib/team.ts`).
- `src/components/hero/CourtLines.tsx` — 208L → 50L. Extraídos: `CourtLinesBorder.tsx`, `CourtLinesService.tsx`, `CourtLinesNet.tsx`, `CourtLinesBall.tsx`.

Arquivos criados:
- `src/app/sobre/equipe/[slug]/CredentialCard.tsx` (8L)
- `src/app/sobre/equipe/[slug]/FaqCard.tsx` (8L)
- `src/app/sobre/equipe/[slug]/BioNotFound.tsx` (13L)
- `src/lib/team.ts` (7L)
- `src/components/hero/CourtLinesBorder.tsx` (38L)
- `src/components/hero/CourtLinesService.tsx` (54L)
- `src/components/hero/CourtLinesNet.tsx` (32L)
- `src/components/hero/CourtLinesBall.tsx` (30L)

### Fase 2 — Iteração C: Design System e Tokens (R-12, R-13)

- `tailwind.config.ts` — adicionados tokens `fontSize.xs-extra` (10px) e `fontSize.sm-extra` (11px).
- `src/components/footer/Footer.tsx` — `text-[11px]` → `text-sm-extra`, `text-[10px]` → `text-xs-extra`.
- `src/components/audience/TargetAudience.tsx` — `text-[11px]` → `text-sm-extra`.
- `src/components/audience/AudienceCard.tsx` — `text-[10px]` → `text-xs-extra`.

### Fase 2 — Iteração D: Documentação (R-01, R-26)

- `docs/glossario.md` — vocabulário controlado (unicidade semântica R-01).
- `docs/ste-dev.md` — registro de decisões arquiteturais (system of record R-26).

---

## 4. Scripts de Verificação Canônicos

| Comando | Propósito |
|---|---|
| `pnpm test` | Executa suíte de testes (144 testes) |
| `pnpm lint` | ESLint com `--max-warnings 0` |
| `pnpm typecheck` | `tsc --noEmit` |
| `scripts/verificar.ps1` | Verificação completa STE-DEV (R-14, typecheck, lint, testes, R-03) |
| `node scripts/check-r03.mjs` | Auditoria R-03 isolada (arquivos ≤ 100 linhas) |

Não gerar arquivos `BUILD_APPROVAL_*` (R-14).

---

## 5. Review Gate — Diff por Camada dos 6 Pilares (R-27)

### Pilar 1: RBAC — Sem alterações
- Status: Inexistente (site público)
- Motivo: Autenticação/autorização é responsabilidade do sistema externo (`sistema.rkt-app.com`)
- Arquivos afetados: Nenhum

### Pilar 2: RLS — Não se aplica
- Status: Sem banco de dados
- Motivo: Landing page estática, sem persistência
- Arquivos afetados: Nenhum

### Pilar 3: APIs — Sem alterações
- Status: Sem rotas de API nem Server Actions
- Motivo: Dados estáticos em `src/data/`, consumo externo apenas via `buildSignupUrl`
- Arquivos afetados: Nenhum

### Pilar 4: Banco de Dados — Não se aplica
- Status: Sem persistência
- Motivo: Projeto front-end apenas
- Arquivos afetados: Nenhum

### Pilar 5: Back — Regras de SEO/metadados mantidas em `src/lib/`
- Status: Regras de domínio permanecem em `src/lib/` (sem camada `domain/` pura criada nesta iteração)
- Motivo: Refatoração cirúrgica focada em front-end; camada `domain/` fica para iteração futura
- Arquivos afetados: `src/lib/team.ts` (novo — `bioForSlug` extraído da página de equipe)

### Pilar 6: Front — Refatoração completa
| Sub-item | Antes | Depois | Arquivos |
|---|---|---|---|
| Navegação interna | `<a href="/...">` | `<Link href="/...">` | `Footer.tsx`, `AudienceCard.tsx`, `TargetAudience.tsx`, `ContentShell.tsx` |
| Componentes > 100 linhas | `CourtLines.tsx` (208L), `EquipeBioPage` (133L) | Todos ≤ 100 linhas | 8 subcomponentes criados, 2 monolíticos divididos |
| Magic numbers | `text-[11px]`, `text-[10px]` | Tokens `text-sm-extra`, `text-xs-extra` | `tailwind.config.ts`, `Footer.tsx`, `TargetAudience.tsx`, `AudienceCard.tsx` |
| Tags nativas soltas | `<p>`, `<h1>`, `<h2>` com classes dispersas | `Heading`, `Text` do Design System | `ContentArticle.tsx`, `Footer.tsx`, `Hero.tsx` |
| Design System tokens | Ausente | `src/design-system/tokens/` (cores, tipografia, spacing, radii) | 5 novos arquivos |
| Componentes primitivos DS | Ausente | `Heading`, `Text`, `Label` | 4 novos arquivos em `typography/` |
| Testes de caracterização | Ausente | `tests/content-shell.characterization.test.ts` | 1 novo arquivo |

---

## 6. Regras STE-DEV Aplicadas (MUST) — Status

| ID | Regra | Status |
|---|---|---|
| R-01 | Unicidade semântica | ✅ `docs/glossario.md` |
| R-02 | Proibição de termos vagos | ✅ Sem `handle*`, `process*`, `manage*`, `helper`, `utils` |
| R-03 | Arquivo ≤ 100 linhas | ✅ 125/125 arquivos OK |
| R-04 | UI puramente declarativa | ✅ Sem I/O no JSX |
| R-06 | Sem `any` nas fronteiras | ✅ TypeScript strict |
| R-12 | Estilo por tokens | ✅ Magic numbers substituídos |
| R-13 | Acessibilidade canônica | ✅ `<Link>` para navegação, `aria-label` onde aplicável |
| R-15 | Baseline 100% verde pré-refatoração | ✅ 144 testes verdes antes de qualquer alteração |
| R-26 | System of Record | ✅ `docs/ste-dev.md`, `docs/glossario.md` |

---

## 6. Histórico de Alterações

| Data | Alteração | Arquivos | Regra |
|---|---|---|---|
| 2026-11-03 | Correção lint `no-html-link-for-pages` | `ContentShell.tsx` | — |
| 2026-11-03 | Conversão `<a>` → `<Link>` (navegação interna) | `Footer.tsx`, `AudienceCard.tsx`, `TargetAudience.tsx` | — |
| 2026-11-03 | Divisão de monolíticos (R-03) | `CourtLines.tsx`, `sobre/equipe/[slug]/page.tsx` + subcomponentes | R-03 |
| 2026-11-03 | Substituição de magic numbers por tokens (R-12) | `tailwind.config.ts`, `Footer.tsx`, `TargetAudience.tsx`, `AudienceCard.tsx` | R-12 |
| 2026-11-03 | Criação de documentação (R-01, R-26) | `docs/glossario.md`, `docs/ste-dev.md` | R-01, R-26 |
