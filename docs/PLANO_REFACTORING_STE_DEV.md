# Plano de Refatoração — STE-DEV (Legado/Refatoração)

**Modo:** Legado / Refatoração (TC-04-LEGACY-MIGRATION)
**Projeto:** `rkt-landing-page` (Next.js 15 + Tailwind, Front-end apenas — sem banco/RBAC/RLS/Back)

---

## 1. Ordem de Precedência (Conflitos)

```
Segurança > Decisão Expressa do Dev Solo > Correção Funcional > Regras MUST > Regras SHOULD > Estilo Visual
```

## 2. Fase 0 — Engenharia Reversa (Somente Leitura)

> Obrigatório antes de qualquer refatoração (legado.md). Nenhuma linha de produção é alterada nesta fase.

### 2.1 Varredura dos 6 Pilares

| Pilar | Status Observado (RKT-LP) | Risco | Achados [OBSERVADO] |
|---|---|---|---|
| **RBAC** | Inexistente | Baixo | Site público, sem autenticação nem papéis |
| **RLS** | Ausente (não se aplica) | Baixo | Não há banco de dados |
| **APIs** | Sem validação de borda | Baixo | Sem rotas de API; apenas Next.js App Router e dados estáticos em `src/data/` |
| **Banco** | Ausente | Baixo | Sem persistência |
| **Back** | Acoplado ao Front | Médio | Regras de SEO/metadados misturadas em `src/lib/` e componentes; sem camada `domain/` pura |
| **Front** | Monólitos de UI | Médio | Componentes em `src/components/` com possível excesso de linhas; uso de tags `<a>` para navegação interna (violou `no-html-link-for-pages`) |

### 2.2 Matriz de Lacunas (S1–S4)

- **[S3 – Médio]** Violação R-03 (arquivos > 100 linhas), R-12 (classes/estilos arbitrários fora de tokens), R-13 (A11y), uso de `<a>` para rotas internas (erro lint atual).
- **[S4 – Baixo]** Ausência de `docs/ste-dev.md` e `docs/glossario.md` (R-26, R-01).

### 2.3 Veredito

**Refatoração Cirúrgica (Strangler)** — risco baixo, front-end isolado, sem banco.

## 3. Fase 1 — Baseline de Testes 100% Verde (R-15)

> Pré-requisito inegociável. Nenhuma alteração de código antes deste passo.

1. Executar suíte existente: `pnpm test` (17 arquivos em `tests/`).
2. Confirmar **100% verde**.
3. Se houver `red` ou ausência de testes de caracterização para `ContentShell`, criar `ContentShell.characterization.test.ts` capturando comportamento atual (renderização de `Início`, `ThemeToggle`, `Footer`, navegação).
4. Executar `pnpm lint` e `pnpm typecheck` — ambos devem sair verdes.
5. Registrar baseline em `docs/ste-dev.md`.

## 4. Fase 2 — Fatiamento Cirúrgico (Strangler)

Cada iteração: máximo **3 arquivos**, baseline verde antes e depois, `scripts/verificar.ps1` ao final.

### Iteração A — Navegação Interna (`<Link>` em vez de `<a>`)

**Objetivo:** Corrigir erro lint `no-html-link-for-pages` e alinhar à convenção existente (`BrandLogo`, `not-found.tsx` já usam `next/link`).

Arquivos alvo (máx. 3):
1. `src/components/content/ContentShell.tsx` — substituir `<a href="/">` por `<Link href="/">`.
2. (Opcional) Auditar outros `<a href="/">` em `src/components/` com `grep`.

Critérios de aceite:
- `pnpm lint` verde (0 erros, 0 warnings).
- `pnpm typecheck` verde.
- `scripts/verificar.ps1` verde.

### Iteração B — Componentes Monolíticos (> 100 linhas)

**Objetivo:** Aplicar R-03 (máx. 100 linhas por arquivo de UI) e R-04 (UI puramente declarativa).

1. Listar componentes com > 100 linhas via `scripts/check-r03.mjs` ou contagem manual.
2. Para cada monolito:
   - Extrair subcomponentes apresentacionais puros (< 100 linhas cada) recebendo apenas props primitivas.
   - Mover I/O, chamadas de API e regras de negócio para hooks (`src/hooks/`) — sem `fetch` no JSX (R-04).
   - Substituir tags HTML nativas soltas (`<p>`, `<span>`, `<h1>`) por componentes canônicos do Design System (`Heading`, `Text`, `Label`) — frontend-ds.md.
3. Executar `pnpm lint`, `pnpm typecheck`, `scripts/verificar.ps1`.

### Iteração C — Design System e Tokens (R-12, R-13)

**Objetivo:** Eliminar magic numbers, cores hexadecimais soltas e classes arbitrárias.

1. Criar/consultar `src/design-system/tokens/` (cores semânticas, spacing, tipografia, radii).
2. Mapear classes Tailwind arbitrárias (ex: `text-[15px]`, `margin: 18px`) para tokens mais próximos da escala fechada.
3. Garantir A11y canônica: rótulos vinculados (`id` + `htmlFor`), `aria-label` em botões sem texto, `focus-visible` (R-13).
4. Executar verificação.

### Iteração D — Documentação e Glossário (R-01, R-26)

1. Criar `docs/ste-dev.md` com decisões de arquitetura, contratos e histórico de migrações.
2. Criar `docs/glossario.md` com unicidade semântica de termos de domínio.
3. Atualizar o glossário com termos mapeados do legado (ex: `user_account` → `customer`).

## 5. Fase 3 — Portão de Revisão (R-27)

- Apresentar diff conciso por camada (Front, APIs, Back, RBAC, Banco, RLS).
- Status verde de testes e linters.
- Decisões relevantes para inspeção do Dev Solo.

## 6. Regras STE-DEV Aplicadas (MUST)

| ID | Pilar | Regra | Aplicação no RKT-LP |
|---|---|---|---|
| R-01 | Todos | Unicidade semântica | `docs/glossario.md` |
| R-02 | Todos | Proibição de termos vagos | Sem `handle*`, `process*`, `manage*`, `helper`, `utils` |
| R-03 | Front | Arquivo ≤ 100 linhas | Dividir monolíticos |
| R-04 | Front | UI puramente declarativa | Sem I/O/API no JSX |
| R-06 | Front | Sem `any` nas fronteiras | Tipagem estrita em props |
| R-12 | Front | Estilo por tokens | Zero magic numbers/hex |
| R-13 | Front | Acessibilidade canônica | `aria-label`, `focus-visible`, rótulos vinculados |
| R-15 | Legado | Baseline 100% verde pré-refatoração | `pnpm test` verde antes de tocar código |
| R-26 | Documentação | System of Record | `docs/ste-dev.md`, `docs/glossario.md` |
| R-27 | CI/CD | Review Gate do Dev Solo | Diff + testes verdes |

## 7. Scripts de Verificação Canônicos

Usar `scripts/verificar.ps1` (PowerShell) ou adaptar para o projeto:
1. `pnpm exec tsc --noEmit` (typecheck)
2. `pnpm lint` (ESLint)
3. `pnpm test` (testes)

Não gerar `BUILD_APPROVAL_*` (R-14).

---

**Nota:** Este plano é um rastreamento sem alterações de código. A execução requer aprovação do Dev Solo em cada iteração, com baseline verde comprovada antes do primeiro corte.
