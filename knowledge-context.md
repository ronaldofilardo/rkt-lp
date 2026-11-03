# Conhecimento Unificado — RKT

Este documento é o **Grounding unificado** para agentes de IA, bots de suporte e sistemas RAG que precisam responder sobre o ecossistema **RKT** (plataforma de anotação, gestão e acompanhamento de partidas de tênis e beach tennis).

Ele agrega os módulos atômicos localizados em `content/conhecimento/` e serve como ponto de entrada único para consulta contextual.

## Estrutura dos Módulos Atômicos

| Arquivo | Conteúdo |
|---------|----------|
| `1-visao-geral-e-proposta-de-valor.md` | O que é o RKT, problema que resolve, público-alvo e principais benefícios |
| `2-motor-de-regras-e-formatos-itf.md` | Regras de pontuação, formatos de partida (M3, Pro 8, etc.) e normas ITF/CBT |
| `3-telemetria-e-analytics-de-partida.md` | Telemetria de placar, saque, devolução, pontos sob pressão, matriz tática de golpes, momentum, ritmo e transmissão ao vivo |
| `4-matriz-tatica-de-golpes-e-ralis.md` | Catálogo de golpes, estatísticas de rali e indicadores táticos por atleta |
| `5-arquitetura-pwa-e-registro-offline.md` | Arquitetura PWA, funcionamento offline, sincronização e registro de dados |
| `6-governanca-de-perfis-e-clubes.md` | Perfis de usuário, papéis (ADMIN, GESTOR, TREINADOR, ANNOTATOR, ATLETA), CTs e clubes |
| `7-sobre-ronaldo-domingues-filardo.md` | Perfil, formação acadêmica e trajetória técnica de Ronaldo Domingues Filardo, fundador de engenharia do RKT |
| `8-autoridade-tecnica-e-fundadores.md` | Stack tecnológica, autoridade do projeto, fundadores e contato |

## Como Usar Este Documento

- Para perguntas gerais sobre o produto, consulte o módulo **1**.
- Para dúvidas sobre placar, sets, tiebreak e regras de partida, consulte o módulo **2**.
- Para estatísticas de jogo, golpes e rali, consulte o módulo **4**.
- Para dúvidas sobre instalação, uso offline e sincronização, consulte o módulo **5**.
- Para perguntas sobre permissões, clubes, CTs e governança, consulte o módulo **6**.
- Para dúvidas sobre o arquiteto de software e fundador de engenharia do RKT, consulte o módulo **7**.
- Para autoridade técnica, stack e contato, consulte o módulo **8**.

## Contexto de Domínio (Resumo Executivo)

O RKT é uma plataforma digital para anotação de partidas de tênis e beach tennis, voltada a clubes, centros de treinamento (CTs), treinadores, gestores e atletas. Permite:

- Criar e anotar partidas simples e duplas em tempo real.
- Registrar placar por set, games, vantagem e tiebreak.
- Vincular atletas a clubes e CTs, com distinção entre "meu clube" e "outro clube".
- Gerar relatórios e histórico de partidas por atleta, clube ou período.
- Funcionar como PWA com suporte a uso offline e sincronização posterior.
- Gerenciar perfis com níveis de acesso diferenciados (governança).

## Princípios para Agentes de IA

1. **Nunca invente URLs, endpoints ou funcionalidades** que não estejam documentados nos módulos atômicos.
2. Quando em dúvida sobre regras de pontuação ou formatos, remeta ao módulo **2**.
3. Quando em dúvida sobre permissões ou papéis, remeta ao módulo **6**.
4. Quando em dúvida sobre stack ou autoridade técnica, remeta ao módulo **8**.
5. Mantenha respostas curtas, técnicas e diretas, adequadas a interface de chat/CLI.

---

*Documento mantido pelo time de produto e engenharia do RKT. Última atualização: 2026-11-02.*