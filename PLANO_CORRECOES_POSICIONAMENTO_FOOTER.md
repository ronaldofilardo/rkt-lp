# 📋 Plano de Correções: Posicionamento, Modelo de Acesso e Redesenho do Rodapé

> **Documento:** `PLANO_CORRECOES_POSICIONAMENTO_FOOTER.md`  
> **Repositório:** `c:\apps\RKT-LP`  
> **Status:** ✅ Executado (ver §5 — Registro de Execução)  
> **Metodologia:** STE-DEV (R-03: arquivos $\le 100$ linhas)

---

## 1. Diretrizes Conceituais e Decisões de Negócio

| # | Diretriz | Situação Atual | Correção Planejada |
|---|---|---|---|
| **1** | **Não destacar que é PWA** | O termo "PWA" é citado exaustivamente em títulos, Hero, cards e Key Takeaways. | **Suavizar a linguagem:** o público-alvo (tenistas, pais e técnicos) não busca "um PWA". O termo será substituído por formulações naturais: *"Plataforma web que funciona direto no celular como um app, sem precisar baixar de lojas ou ocupar espaço na memória"*. O termo técnico fica restrito a artigos de engenharia e tags internas de SEO. |
| **2** | **Registro offline sutil e secundário** | O funcionamento offline vinha sendo promovido como um dos pilares principais de valor do produto. | **Reposicionar como comodidade de bastidores:** a proposta central é **inteligência tática e evolução de desempenho**. O funcionamento offline passa a ser mencionado discretamente como garantia de tranquilidade: *"registro contínuo e sem interrupções, mesmo em quadras com sinal instável"*. |
| **3** | **Não é gratuito para atletas** | O Hero, o Final CTA e o FAQ prometem *"Acesso gratuito para atletas e espectadores"*. | **Eliminar promessa de gratuidade:** o modelo comercial está em desenvolvimento. A ancoragem de confiança (`trustNote`) passa a destacar o teste sem atrito: *"Demonstração interativa · Sem necessidade de cartão de crédito para experimentar"*. No FAQ, a pergunta sobre gratuidade é reformulada para explicar que os planos comerciais estão sendo calibrados para a etapa de lançamento. |
| **4** | **Rodapé muito carregado (seguir modelo anexo)** | O rodapé atual despeja mais de 10 links em lista corrida sem agrupamento semântico, tornando-se visualmente denso. | **Redesenhar em 3 colunas harmoniosas (modelo Omni Sistemas):**<br>1. *Marca, proposta concisa, selo histórico e e-mail de suporte.*<br>2. *Coluna Navegação (Públicos e Recursos).*<br>3. *Coluna Institucional (Artigos, Base de Conhecimento, Glossário, Sobre).*<br>4. *Card sutil de governança empresarial (BE SMART LTDA / CNPJ).* |
| **5** | **Ecossistema completo: CTs, Treinadores, Atletas e Famílias** | O texto atual trata a ferramenta de forma transacional (quem anota x quem vê). | **Evidenciar a rede de evolução conjunta:** o RKT é a plataforma que une o **centro de treinamento e treinadores** (metodologia e métricas), os **atletas** (diagnóstico e evolução) e as **famílias e amigos** (acompanhamento em tempo real, incentivo e celebração do progresso esportivo). |

---

## 2. Detalhamento Técnico das Ações por Arquivo

### A. Reposicionamento do Ecossistema e Remoção de "PWA" / "Gratuito"

1. **`src/config/site.config.ts`:**
   * Atualizar `trustNote` para:  
     `'Demonstração interativa · Sem necessidade de cartão de crédito · Funciona direto no navegador'`
   * Calibrar `SITE_CONFIG.description` para enfatizar o ecossistema de evolução (clubes, treinadores, atletas e famílias) com menção sutil ao app web.

2. **`src/data/key-takeaways.data.ts`:**
   * Reformular o item 1 de *"O RKT Tennis é uma plataforma PWA..."* para:  
     `'O RKT é uma plataforma completa de telemetria e inteligência tática de tênis que funciona direto no celular como um app, sem exigir download de lojas.'`

3. **`src/data/pillars.data.ts` & `src/data/how-it-works.data.ts`:**
   * Substituir referências duras a "PWA" por termos naturais como *"no celular"*, *"na quadra"* e *"direto no navegador"*.
   * Tornar a nota de sincronização offline sutil (uma linha de rodapé, não o título do passo).

4. **`src/data/audience.data.ts` & `src/data/content/profiles.data.ts`:**
   * Reenquadrar o perfil do espectador para **Famílias & Apoiadores**:  
     *Título:* **Famílias e Acompanhantes**  
     *Pergunta:* *"Como familiares e amigos acompanham a evolução do tenista?"*  
     *Resposta:* *"Acompanhe partidas públicas autorizadas pelo clube em tempo real, veja estatísticas de desempenho e participe ativamente da jornada de evolução esportiva de quem você torce."*

5. **`src/data/faq.data.ts`:**
   * Atualizar a resposta do registro offline (explicando com naturalidade o funcionamento local sem jargão pesado de PWA).
   * Substituir a pergunta *"O acesso ao RKT é gratuito?"* por:  
     *Pergunta:* **"Como funciona o modelo de acesso à plataforma RKT?"**  
     *Resposta AEO:* *"O RKT está atualmente em fase de demonstração pública e aberta, permitindo explorar recursos e painéis sem necessidade de cartão de crédito. Os modelos de assinatura e planos de acesso para centros de treinamento, equipes e atletas estão sendo definidos para a fase de lançamento comercial."*

---

### B. Redesenho Completo do Rodapé (`src/components/footer/Footer.tsx`)

Inspirado estritamente na composição visual do `omni-sistemas.com`:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo RKT]                                    NAVEGAÇÃO               INSTITUCIONAL    │
│ Plataforma de inteligência e telemetria       Para Atletas            Artigos Técnicos │
│ para o tênis. Da formação à alta performance. Para Treinadores        Base Conhecimento│
│                                               Para Gestores de CT     Glossário Tênis  │
│ 🛡️ Desenvolvido por Omni Sistemas • Desde 1996  Como Funciona           Sobre o RKT      │
│ ✉️ suporte@omni-sistemas.com                   Painel de Telemetria    Ronaldo Filardo  │
│                                                                       ┌───────────────┐│
│                                                                       │ O RKT faz     ││
│                                                                       │ parte da      ││
│                                                                       │ BE SMART LTDA ││
│                                                                       │ CNPJ ...      ││
│                                                                       └───────────────┘│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ © 2026 RKT · BE SMART LTDA · Curitiba, PR 🎾            [Termos de Uso] [Privacidade]  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Coluna 1 (Identidade e Confiança):**
  * `<BrandLogo size="md" href="/" />`
  * Descrição editorial focada em inteligência de jogo e evolução coletiva.
  * Tag de autoridade: `🛡️ Desenvolvido por Omni Sistemas • Desde 1996`.
  * E-mail de suporte com link `mailto:suporte@omni-sistemas.com`.
* **Coluna 2 (Navegação — Atores do Ecossistema):**
  * Cabeçalho `NAVEGAÇÃO` (mono, uppercase, text-xs, text-telemetry-volt).
  * Links direcionados: `/para-atletas`, `/para-treinadores`, `/para-gestores`, `/#como-funciona` e `/#telemetria`.
* **Coluna 3 (Institucional & Autoridade de Conteúdo):**
  * Cabeçalho `INSTITUCIONAL`.
  * Links diretos para os hubs:
    * **Artigos e Análises Técnicas** (`/artigos`)
    * **Base de Conhecimento** (`/conhecimento`)
    * **Glossário de Tênis** (`/glossario`)
    * **Sobre o RKT** (`/sobre`)
    * **Ronaldo Filardo** (`/sobre/ronaldo`)
  * **Card de Conformidade:** Caixa sutil (`bg-telemetry-card/50 border border-telemetry-border/10 p-3 rounded-lg text-xs`) informando a razão social BE SMART LTDA e CNPJ 55.405.487/0001-84.
* **Barra Inferior (Sub-rodapé):**
  * Copyright limpo e direitos reservados.
  * Links legais compactos (`/termos` e `/privacidade`).

---

## 3. Matriz de Arquivos Impactados

| Arquivo | Modificação Prevista | Limite R-03 |
|---|---|---|
| `src/components/footer/Footer.tsx` | Redesenho em 3 colunas (cópia fiel da arquitetura visual do anexo). | $\le 100$ linhas |
| `src/config/site.config.ts` | Remoção da palavra "gratuito" do `trustNote`; descrição calibrada. | $\le 100$ linhas |
| `src/config/seo.config.ts` | Suavização de "PWA" e remoção de "acesso gratuito". | $\le 100$ linhas |
| `src/data/key-takeaways.data.ts` | Formulação natural de app sem destaque agressivo para PWA. | $\le 100$ linhas |
| `src/data/audience.data.ts` | Foco em famílias e rede de apoio no perfil de acompanhante. | $\le 100$ linhas |
| `src/data/faq.data.ts` | FAQ sobre modelo de acesso comercial e offline sutil. | $\le 100$ linhas |
| `src/data/pillars.data.ts` | Eliminação do jargão técnico PWA nas chamadas dos pilares. | $\le 100$ linhas |
| `src/data/section-answers.data.ts` | Redação dos blocos AEO alinhada ao ecossistema e modelo comercial. | $\le 100$ linhas |
| `tests/etapa-8-11.test.ts` / `tests/seo-interno-links.test.ts` | Atualização das asserções de teste para validar o novo `trustNote` e o FAQ comercial. | $\le 100$ linhas |

---

## 4. Protocolo de Verificação e Qualidade
1. `node scripts/check-r03.mjs` (100% dos arquivos $\le 100$ linhas).
2. `pnpm typecheck` (zero erros de TypeScript).
3. `pnpm test` (100% dos testes verdes).
4. `pnpm build` (todas as 31 rotas estáticas pré-renderizadas com sucesso).

---

## 5. Registro de Execução

**Resultado final (verde em todos os comandos do §4):**

| Comando | Resultado |
|---|---|
| `node scripts/check-r03.mjs` | 98 arquivos $\le 100$ linhas (incl. `Footer.tsx` com 98 linhas) |
| `pnpm typecheck` | zero erros |
| `pnpm lint` | zero warnings/erros (`--max-warnings 0`) |
| `pnpm test` | **129 testes verdes, 0 falhas** (baseline era 128; +1 teste novo no `etapa-8-11`) |
| `pnpm build` | 31/31 rotas estáticas com sucesso |

**Diretrizes aplicadas:**
1. **PWA suavizado** em `pillars`, `how-it-works`, `key-takeaways`, `faq`, `section-answers`, `profiles.shared`, `about.data` e `featureList` do SEO — substituído por "no celular", "direto no navegador" e afirmações naturais. PWA permanece apenas em tags/meta SEO (`SEO.description`), glossário e artigos de engenharia (diretriz 1, camada permitida).
2. **Offline sutil:** sai do `trustNote` e dos títulos; vira nota de bastidores ("mesmo com sinal instável", "funciona mesmo sem sinal"). A pergunta do FAQ de offline é mantida (exigência de cobertura dos ids), mas a resposta perde o jargão de PWA.
3. **Gratuidade removida:** `trustNote`, `offerDescription`, pergunta/resposta comercial do FAQ, QA "gratuito" de `profiles.data`, `FINAL_CTA_ANSWER` e os botões "Criar conta gratuita" de `FinalCTA` e `MobileStickyCTA` → "Criar conta".
4. **Rodapé em 3 colunas** conforme mockup Omni Sistemas: Identidade (logo, proposta, selo "Desde 1996", suporte) · NAVEGAÇÃO (atores + âncoras) · INSTITUCIONAL (hubs de conteúdo + card BE SMART LTDA/CNPJ) + barra inferior com Termos/Privacidade.
5. **Ecossistema:** card de espectador reenquadrado como **"Famílias e Acompanhantes"** (id/profile `espectador`/`ESPECTADOR` preservados — exigência de teste), `AUDIENCE_ANSWER`, `KEY_TAKEAWAYS` e `llms.txt` alinhados a famílias/acompanhantes.

**Desvios declarados (com justificativa):**
- **`SITE_COLUMNS` vs. teste de crawlability:** o rodapé mantém `SITE_PAGES.map` + `href={page.path}` (exigido por `etapa-14`); a coluna Institucional filtra `/para-*` (que vivem na Navegação explícita) e **inclui `/guia/estatisticas-de-tenis`**, link real ausente da lista do mockup — necessário para crawlability completa de todas as páginas de `SITE_PAGES`.
- **"Criar conta"/"Entrar" fora do rodapé:** o mockup aprovado não os prevê; o teste `etapa-12` valida `buildSignupUrl({origem:'lp_footer'})` na função, não no componente — permanece verde.
- **`SEO.description` mantém "PWA" e "espectador":** exigido pelo teste `etapa-13` (janela 140–185) e útil como palavra-chave na camada de meta tags; a janela efetiva é **140–155** (teste `seo-estrutural` é mais restritivo) — nova description com 148 chars e foco no ecossistema (CTs, treinadores, atletas e famílias).
- **Key takeaway 1:** a frase sugerida pelo plano tem 26 palavras e o teste exige $\le 25$ — removida a palavra "completa".
- **Arquivos tocados além da matriz do plano** (alinhamento às diretrizes 1–3): `MobileStickyCTA.tsx`, `FinalCTA.tsx`, `profiles.shared.ts`, `profiles.data.ts` (QA `gratuito` → `modelos-de-acesso`), `about.data.ts` e `public/llms.txt` (pergunta do FAQ obrigatória por teste + ajustes de enquadramento).
- **Testes atualizados conforme previsto:** `seo-interno-links` (novas asserções do `trustNote` + "sem gratuidade") e `etapa-8-11` (novo teste do FAQ comercial). Nenhuma outra asserção foi alterada.
- **Correções menores de consistência:** typo "matrix de golpes" → "matriz" no passo `analise`; passo `cadastro` e demais listas de perfil usam "acompanhante" no lugar de "espectador" na copy de marketing.

