# Glossário de Termos do Projeto (STE-DEV)

Este documento registra o vocabulário controlado oficial do projeto RKT Landing Page.
Toda entidade de negócio, operação e rótulo de interface deve constar neste glossário antes de ser codificado.

---

## 1. Diretriz de Idioma

- **Identificadores no Código:** Inglês (canônico)
- **Rótulos na Interface de Usuário:** Português (pt-BR)

---

## 2. Entidades de Domínio

| Conceito / Entidade | Identificador Canônico | Rótulo na UI | Definição Semântica Exata |
|---|---|---|---|
| Marca da plataforma | `rkt` | RKT Tennis | Plataforma de inteligência e telemetria tática para o tênis. |
| Empresa responsável | `omni-sistemas` | Omni Sistemas | Empresa desenvolvedora e detentora da marca RKT. |
| Perfil de usuário | `user-profile` | Perfil | Categoria de atleta no ecossistema: ATLETA, TREINADOR, GESTOR, ESPECTADOR. |
| Página dedicada do perfil | `profile-page` | Página dedicada | Rota interna `/para-atletas`, `/para-treinadores`, `/para-gestores`. |
| Partida de tênis | `match` | Partida | Registro de uma partida jogada com dados de telemetria (placar, duração, saque, devolução). |
| Telemetria | `telemetry` | Telemetria | Conjunto de métricas táticas capturadas durante uma partida (saque, rally, pontos de pressão). |
| Sistema principal | `main-system` | Sistema RKT | Aplicação externa (`sistema.rkt-app.com`) onde usuários se cadastram e gerenciam partidas. |
| Origem de CTA | `cta-origin` | Origem | Parâmetro de rastreamento (`origem`) que identifica de qual elemento da LP o cadastro se originou. |
| Cadastro | `signup` | Criar conta | Ação de criação de usuário no sistema principal via URL com parâmetros de perfil e origem. |
| Login | `login` | Entrar / Já tenho conta | Ação de autenticação no sistema principal (`/login`). |

---

## 3. Verbos e Operações Específicas do Domínio

| Verbo Canônico | Escopo de Aplicação | Efeito Esperado |
|---|---|---|
| `signup` | Usuário no sistema principal | Cria conta com perfil e origem de rastreamento. |
| `login` | Usuário no sistema principal | Autentica e redireciona para o painel. |
| `archive` | Conteúdo da LP | Exclusão lógica (soft-delete) preservando histórico. |
| `build` | URLs do sistema | Constrói URL completa com parâmetros de query. |
| `render` | Componentes UI | Produz saída JSX declarativa sem I/O. |

---

## 4. Termos Mapeados do Legado

| Termo Original no Legado | Termo Canônico Aprovado | Justificativa da Mudança |
|---|---|---|
| `user_account` | `user-profile` | Unificação sob o conceito de perfil de usuário. |
| `doBilling` | `createInvoice` | Substituição de verbo vago por ação atômica. |
| `text-[11px]` | `text-sm-extra` | Substituição de magic number por token de Design System. |
| `text-[10px]` | `text-xs-extra` | Substituição de magic number por token de Design System. |

---

## 5. Regras de Nomenclatura

- **Componentes:** PascalCase, substantivo + descrição (`ContentShell`, `CredentialCard`, `CourtLinesBorder`)
- **Hooks:** camelCase, prefixo `use` (`useActiveSection`, `useScrollProgress`)
- **Utilitários:** camelCase, verbo + substantivo (`buildSignupUrl`, `bioForSlug`)
- **Arquivos:** kebab-case para arquivos de utilitário (`site.config.ts`, `page-metadata.ts`)
- **Variáveis CSS:** `--telemetry-*` para cores, `--telemetry-glow-*` para efeitos
