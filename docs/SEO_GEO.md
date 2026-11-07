# SEO / GEO / AEO — notas

Arquivos principais: `src/config/seo.config.ts` (title, description, OG, featureList), `src/lib/seo-schema.ts` (JSON-LD),
`src/app/robots.ts`, `src/app/sitemap.ts`, `public/llms.txt`, `public/og-image.png` (1200×630).

## Manutenção
- `public/llms.txt` é estático: ao mudar o FAQ ou o domínio, atualize-o (o teste `etapa-13` acusa divergência no FAQ).
- FAQPage é gerado de `faq.data.ts` — editar o FAQ atualiza HTML e JSON-LD juntos.
- Respostas diretas das seções ficam em `src/data/section-answers.data.ts` (40–50 palavras, validado em teste).

## CSS (item 11 da auditoria)
O Tailwind é compilado em arquivo CSS externo no build do Next.js. O `globals.css` (variáveis de tema e keyframes) entra
no mesmo bundle; não há `<style>` inline relevante no HTML bruto. Nenhuma ação necessária além de não adicionar `<style>` inline grande.

## Páginas de conteúdo (rodada 2)
- Dados em `src/data/content/*.data.ts`; rotas: `/sobre`, `/glossario`, `/guia/estatisticas-de-tenis`, `/para-atletas|treinadores|gestores`.
- `SITE_PAGES` (`pages.data.ts`) alimenta sitemap, rodapé e testes. Nova página = novo dado + rota + linha no `public/llms.txt`.
- `/llms-full.txt` é gerado de `src/lib/llms-full.ts` a partir dos mesmos dados (sem divergência).
- `Organization` no layout, sem `sameAs`: acrescente LinkedIn/Instagram/GitHub em `seo-schema-pages.ts` quando existirem perfis oficiais.
- Não incluído: `manifest` (pertence ao app em `sistema.rkt-app.com`; o logo atual não é quadrado).
- Atualize `CONTENT_LAST_UPDATED` ao editar conteúdo.

## Entidade, contato e conhecimento (rodada 3)
- `src/config/entity.config.ts`: Omni Sistemas (BE SMART LTDA, CNPJ, desde 1996), e-mail de suporte e dados do fundador. Única fonte para schema, rodapé, /sobre, llms e humans.
- `Organization` agora tem `ContactPoint`, `parentOrganization` (razão social, CNPJ) e fundadores como `Person` (Ronaldo com Lattes em `sameAs`). Autoria dos artigos continua da organização.
- `public/.well-known/security.txt` vence em 2027-10-31: o teste falha se faltar menos de 0 dias ou passar de 366.
- Arquivos de conhecimento: apenas estrutura (`content/conhecimento/README.md` + `src/data/knowledge.registry.ts`). Nada foi gerado; pendências por módulo estão no registro.

## Estrutura, grafo e SEO técnico (rodada 4 — `PLANO_SEO_ESTRUTURAL.md`)
- **Título:** root layout com `title: { default: 'RKT | …', template: '%s | RKT' }`. Os títulos em `PageMeta` ficam **sem** sufixo de marca (evita `| RKT | RKT`); `TITLE_SUFFIX`/`formatTitle()` em `site.config.ts` aplicam `| RKT` nos metadados OG/Twitter. Marca canônica nas tags de título: **RKT**.
- **FAQPage:** só em `src/app/page.tsx`, junto ao componente FAQ. O layout mantém apenas `SoftwareApplication` e `Organization`. Cada página de conteúdo segue com o próprio `FAQPage` derivado do seu Q&A visível.
- **Grafo:** `WebSite` (`/#website`) com `publisher: { @id: …/#organization }`; `SoftwareApplication` publica pelo mesmo `@id`. `Organization.parentOrganization` → `https://omni-sistemas.com/#organization`. `/sobre/ronaldo` emite `ProfilePage` + `Person` com `@id` **compartilhado** com o nó `founder` (`ronaldoPersonId()`).
- **BreadcrumbList** em todas as rotas internas, gerado de `src/data/content/breadcrumbs.data.ts` (home = raiz, sem breadcrumb).
- **`og:type`:** padrão `website`; `article` no guia; `profile` em `/sobre/ronaldo` (campo opcional `PageMeta.ogType`).
- **Desorfanamento:** `/sobre/ronaldo` entrou em `SITE_PAGES` → sitemap, `llms.txt`, `llms-full.txt`, rodapé e bloco "Veja também".
- **Links internos:** títulos dos cards de público apontam para `/para-*` (cadastro continua no CTA); Hero e seção de telemetria ligam guia + glossário; o guia liga termos técnicos às âncoras do glossário (`LinkedText` + `glossary-links.data.ts`); `RelatedLinks` fecha toda página de conteúdo.
- **Sitemap:** `lastModified` = `fs.statSync` do arquivo da rota (fallback `CONTENT_LAST_UPDATED`). **robots:** diretiva `host` removida.
- **Sistema (`sistema.rkt-app.com`):** ✅ concluído no repositório do sistema — `next.config.ts` envia `X-Robots-Tag: noindex, nofollow` em todas as telas autenticadas (`/admin/*`, `/dashboard/*`, `/painel/*`, `/match*`, `/gestor/*`, etc., espelhando o matcher do middleware) e nos fluxos de recuperação (`/forgot`, `/trocar-senha`); títulos próprios em `/termos` (server), `/privacidade` (server), `/login` e `/signup` (via `layout.tsx`, pois as páginas são client components). Rotas públicas (`/login`, `/signup`, `/termos`, `/privacidade`) ficam fora do noindex.
- **Testes:** `tests/seo-estrutural.test.ts` (metadados + grafo) e `tests/seo-interno-links.test.ts` (desorfanamento, links, sitemap/robots, blindagem).
