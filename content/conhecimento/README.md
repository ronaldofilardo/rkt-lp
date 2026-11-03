# Arquivos de conhecimento do RKT Tennis

> Esta pasta contém os módulos atômicos de conhecimento (RAG / grounding de agentes de IA).
> A fonte de verdade dos nomes, ementas e status é `src/data/knowledge.registry.ts`
> (validada em `tests/etapa-15-*`).

## Estrutura

```text
knowledge-context.md                 <- (raiz) síntese para grounding de RAG/agentes
content/conhecimento/
├── README.md                        <- este índice
├── 1-visao-geral-e-proposta-de-valor.md
├── 2-motor-de-regras-e-formatos-itf.md
├── 3-telemetria-e-analytics-de-partida.md
├── 4-matriz-tatica-de-golpes-e-ralis.md
├── 5-arquitetura-pwa-e-registro-offline.md
├── 6-governanca-de-perfis-e-clubes.md
├── 7-sobre-ronaldo-domingues-filardo.md
└── 8-autoridade-tecnica-e-fundadores.md
```

| # | Módulo | Status | Pendências |
|---|--------|--------|------------|
| 1 | Visão geral e proposta de valor | publicado | — |
| 2 | Motor de regras e formatos ITF | publicado | "7 formatos" mas 6 listados: conferir `engine.ts` |
| 3 | Telemetria e analytics de partida | publicado | — |
| 4 | Matriz de golpes e rallies | publicado | Confirmar limites de rally (1–4, 5–8, 9+) e lista de golpes/direções |
| 5 | Arquitetura PWA e registro offline | publicado | Confirmar IndexedDB e fila de sincronização no app |
| 6 | Governança de perfis e clubes | publicado | Decidir se perfis operacionais entram no texto público |
| 7 | Sobre Ronaldo Domingues Filardo | publicado | Confirmar redação "doutoramento em Portugal" |
| 8 | Autoridade técnica e fundadores | publicado | "desde 1996" vs "desde 1997"; bio do Eduardo; doutoramento |

## Como produzir um módulo

1. Resolver as pendências da tabela com a fonte (código em `c:\apps\rkt`, não suposição).
2. Criar o arquivo com o nome exato da tabela e mudar o `status` no registro para `rascunho`/`publicado`.
3. Só afirmar o que existe no produto hoje; recursos futuros (transmissão ao vivo) ficam marcados como "em breve".
4. Para os bots encontrarem: o conteúdo desta pasta **não é servido** pelo Next.js. Ao publicar, expor via rota (ex.: `/conhecimento/<slug>`) ou incorporar ao `/llms-full.txt`, e listar no `public/llms.txt`.
5. `knowledge-context.md`: Entity Profile + Q&A estruturado + restrições de escopo, gerado por último.
