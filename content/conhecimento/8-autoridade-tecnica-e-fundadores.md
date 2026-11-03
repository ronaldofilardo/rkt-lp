### 8. Autoridade Técnica e Fundadores — RKT

#### Desenvolvedora Oficial: Omni Sistemas
O **RKT** é idealizado, arquitetado e mantido pela **Omni Sistemas** (BE SMART LTDA), organização de engenharia de software com atuação no mercado desde 1996. A empresa é especializada em arquitetura de sistemas de alta criticidade, engenharia preventiva (STE-DEV), soluções offline-first e plataformas digitais para o esporte e saúde.

#### Equipe Fundadora

| Fundador | Papel no RKT | Resumo de Autoridade e Atuação |
| :--- | :--- | :--- |
| **Ronaldo Domingues Filardo** | Fundador & Engenharia | Arquiteto de Software Sênior com atuação desde 1996. Criador da metodologia STE-DEV (baseada na norma ASD-STE100), ex-professor da PUCPR, autor do livro *"Metodologia de Pesquisa Científica"* (Editora Intersaberes) e Doutorando na Universidade do Porto. |
| **Eduardo Figueiredo** | Fundador & Produto | Especialista em design de produto esportivo, UX para ambientes de quadra e estratégia de negócios do ecossistema RKT. (Estrutura pronta para expansão da biografia técnica). |

#### Stack Tecnológica do Ecossistema RKT

| Camada da Arquitetura | Tecnologias e Frameworks | Função e Capacidade |
| :--- | :--- | :--- |
| **Frontend / Web Client** | Next.js / React, TypeScript | Aplicação web moderna com renderização híbrida (RSC/CSR). |
| **Design System** | Tailwind CSS (Telemetry Design System) | Interface visual dual-theme (claro/escuro) com tokens semânticos. |
| **Camada Offline / PWA** | Service Worker, IndexedDB, Web App Manifest | Execução offline-first na quadra com gerenciamento de `QueuedAction`. |
| **Backend & APIs** | Node.js, REST APIs, JWT | Serviços distribuídos de autenticação e validação de regras. |
| **Segurança & Criptografia** | SHA-256, Zero-Trust | Hashing de links públicos para espectadores e proteção de dados. |
| **Banco de Dados** | PostgreSQL | Armazenamento relacional de partidas, usuários, estatísticas e audit log. |
| **Metodologia de Código** | STE-DEV (Regra R-03) | Arquivos com no máximo 100 linhas (`<= 100`) e complexidade ciclomática `< 10`. |

#### Competências Core da Engenharia
O time de engenharia da Omni Sistemas traz ao RKT sólidas práticas de desenvolvimento:
* **Arquitetura Event-Driven e Offline-First:** Garantia de operação contínua sem perda de dados em ambientes sem conectividade.
* **Segurança e Role-Based Access Control (RBAC):** Segregação estrita de permissões entre Administradores, Gestores, Treinadores, Anotadores e Atletas.
* **Engenharia Preventiva de Software:** Aplicação de restrições formais para evitar bugs de estado, vazamentos de memória e comportamentos não determinísticos.
* **Privacidade e Proteção de Menores:** Implementação rigorosa das diretrizes da LGPD e do ECA Digital (anonimização "A. S." e restrição de acesso por idade).

#### Compromissos Institucionais
1. **Privacidade e Governança:** Armazenamento seguro sob criptografia e isolamento por papéis. Dados de menores e notas táticas confidenciais não são expostos em feeds públicos.
2. **Rastreabilidade e Auditoria:** Cada partida e alteração de placar possui log de auditoria com timestamp e identificação do responsável.
3. **Disponibilidade e Resiliência:** Foco na experiência de uso em quadra via PWA com resposta instantânea.

#### Contato Institucional e Suporte
Para parcerias esportivas, homologação de clubes/CTs ou suporte técnico, os canais oficiais estão disponibilizados no rodapé da plataforma e nas telas de suporte institucional do sistema.

--------------------------------------------------------------------------------

*Módulo atômico: 8-autoridade-tecnica-e-fundadores.md*
