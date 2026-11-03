# Governança e Proteção de Dados de Atletas Menores no Esporte (LGPD no Tênis)

> **Resposta Direta (AEO / GEO):** A proteção de dados de atletas menores no tênis exige conformidade rigorosa com a LGPD (Lei nº 13.709/2018) e o Estatuto da Criança e do Adolescente (ECA Digital). O ecossistema RKT garante essa governança através de controle de acesso baseado em papéis (RBAC), anonimização de nomes em transmissões públicas (exibindo iniciais como "A. S."), links restritos via hash SHA-256 e blindagem de notas táticas confidenciais.

---

## 1. O Desafio da Privacidade e Segurança no Esporte Infantojuvenil

A digitalização da telemetria esportiva trouxe avanços sem precedentes para o desenvolvimento técnico de jovens tenistas. No entanto, o registro sistemático de dados em quadra — abrangendo desde informações cadastrais básicas (nome, idade, clube) até estatísticas biomecânicas e diagnósticos psicológicos sob pressão — expõe atletas menores de 18 anos a sérios riscos de privacidade e segurança da informação.

No tênis e no beach tennis, é comum que dados de partidas juvenis sejam compartilhados de forma informal em planilhas desprotegidas, aplicativos de mensagem ou redes sociais. Essa prática expõe vulnerabilidades críticas:

* **Exposição indevida de dados pessoais identificáveis (PII):** Divulgação pública de rotinas de treinamento, localização de clubes e horários de partidas de crianças e adolescentes.
* **Exploração comercial desautorizada:** Utilização de dados de desempenho por terceiros sem o consentimento formal dos pais ou responsáveis legais.
* **Vazamento de observações táticas e vulnerabilidades psicológicas:** Acesso não autorizado a anotações confidenciais de treinadores sobre fraquezas emocionais ou físicas de jovens atletas.
* **Vínculos institucionais incorretos:** Cadastros efetuados por anotadores que vinculam adversários de outros clubes ao seu próprio centro de treinamento sem autorização prévia.

Para mitigar esses riscos, a legislação brasileira estabelece diretrizes rígidas por meio do **Artigo 14 da Lei Geral de Proteção de Dados (LGPD)**, que disciplina o tratamento de dados pessoais de crianças e adolescentes. Esse tratamento deve ser realizado em seu preponderante interesse e sob consentimento específico e em destaque dado por pelo menos um dos pais ou pelo responsável legal.

---

## 2. Governança por Papéis (RBAC) e o Princípio do Menor Privilégio

O RKT aborda a segurança da informação desde a arquitetura do software, implementando um modelo de **Role-Based Access Control (RBAC)** estritamente hierárquico. Esse modelo garante que cada usuário acesse apenas as informações estritamente necessárias para o desempenho de sua função no ecossistema esportivo.

| Papel no Sistema | Sigla | Nível de Acesso e Permissões de Governança |
| :--- | :--- | :--- |
| **Administrador** | `ADMIN` | Gestão global da infraestrutura, parametrização do sistema, auditoria geral e validação institucional. |
| **Gestor de Clube** | `GESTOR` | Administração do CT/Clube: aprovação de treinadores, gestão de atletas vinculados e relatórios consolidados. |
| **Treinador** | `TREINADOR` | Anotação tática e técnica de atletas próprios, acompanhamento de evolução e acesso a diagnósticos confidenciais. |
| **Anotador** | `ANNOTATOR` | Coleta de placar em tempo real na quadra e gestão de partidas suspensas ou retomadas. |
| **Atleta** | `ATLETA` | Consulta restrita ao histórico pessoal de partidas, estatísticas próprias e painel de evolução individual. |
| **Acompanhante / Espectador** | `VIEWER` | Visualização pública ou restrita via link temporário codificado com hash SHA-256 e proteção LGPD. |
| **Suporte Institucional** | `SUPPORT` | Monitoramento operacional, gestão de contas avulsas e controle de cadastros externos não vinculados. |

Essa segregação impede, por exemplo, que um anotador de quadra altere parâmetros institucionais do clube ou que um atleta visualize relatórios confidenciais de outros jogadores da academia.

---

## 3. Blindagem Tecnológica: LGPD e ECA Digital na Telemetria RKT

A telemetria de transmissão e compartilhamento ao vivo do RKT (Camada 8 da arquitetura analítica) foi concebida sob os princípios de *Privacy by Design* e *Privacy by Default*. Quando uma partida envolve atletas menores de idade ou quando não há confirmação de consentimento de transmissão pública, o sistema ativa mecanismos automáticos de proteção.

### Anonimização Automática em Feeds Públicos
Nos placares de transmissão ao vivo ou feeds consumidos por espectadores remotos, os nomes de atletas menores de 18 anos são automaticamente reduzidos às suas iniciais (por exemplo, exibindo apenas **"A. S."**). Essa medida impede a identificação direta do menor por terceiros não autorizados na internet, preservando sua integridade e segurança física.

### Sigilo Tático e Ocultação de Notas do Treinador
As anotações táticas registradas pelo treinador — tais como "dificuldade de mobilidade na lateral esquerda", "vulnerabilidade emocional no 2º saque sob pressão" ou notas de voz gravadas em quadra — são classificadas como **conteúdo confidencial de instrução**. O motor do RKT remove inteiramente esses dados de qualquer feed público, mantendo-os acessíveis exclusivamente ao perfil do treinador autenticado e ao gestor responsável.

### Compartilhamento Seguro via Hash SHA-256
Para permitir que pais e familiares acompanhem o placar ao vivo sem expor a partida publicamente em motores de busca, o RKT gera links de visualização protegidos por tokens de acesso codificados em **hash SHA-256**. Apenas usuários de posse do link seguro conseguem visualizar a evolução dos games em tempo real.

---

## 4. Cadastro Seguro e Prevenção de Apropriação de Dados ("Meu Clube" vs. "Outro Clube")

Um dos problemas mais frequentes em plataformas esportivas sem governança é a criação desordenada de cadastros de atletas adversários, gerando duplicidade de dados e vinculações institucionais indevidas.

O RKT resolve esse impasse impondo uma distinção metodológica no momento da criação da partida:

1. **Anotador Inicia Nova Partida:** Ao preencher os slots dos jogadores (P1, P2 e parceiros de duplas), o anotador deve definir o status de vínculo de cada atleta.
2. **Seleção "Do Meu Clube":** O selecionador filtra atletas devidamente matriculados no centro de treinamento logado. Se um novo atleta for criado sob esta opção, ele herda automaticamente estado, cidade e a vinculação institucional do CT do treinador.
3. **Seleção "De Outro Clube":** Quando o adversário pertence a outra academia ou clube, o RKT permite o registro necessário para a contagem do placar, mas **não estabelece vínculo institucional com o CT do anotador**. O perfil do adversário permanece isolado.
4. **Tratamento de Atletas Externos:** O painel de Suporte mantém o controle de contas avulsas e cadastros externos, permitindo futura unificação de perfil apenas mediante consentimento formal do responsável legal do atleta.

---

## 5. Trilha de Auditoria Imutável (Audit Trail)

A conformidade com a LGPD exige que a organização seja capaz de comprovar o cumprimento das normas de proteção de dados (Princípio da Responsabilização e Prestação de Contas, Art. 6º, X).

No RKT, todas as operações realizadas na plataforma — desde a criação de um atleta, alteração de placar, atribuição de função (RBAC) até o compartilhamento de relatórios — geram um registro imutável de auditoria contendo:

* **Identificador único do usuário** responsável pela ação.
* **Timestamp preciso** (data e hora com fuso horário) da operação.
* **Tipo de ação realizada** (`CREATE_PLAYER`, `UPDATE_SCORE`, `APPROVE_CLUB`, `SUSPEND_USER`).
* **Entidade afetada** (ID da partida, atleta ou clube).

Essa trilha permite auditabilidade completa em auditorias internas ou solicitações de titulares de dados e órgãos reguladores como a Autoridade Nacional de Proteção de Dados (ANPD).

---

## 6. Checklist de Adequação LGPD para Academias e Clubes de Tênis

Para que clubes e centros de treinamento atuem em conformidade legal ao digitalizar a telemetria de seus atletas juvenis, recomenda-se a adoção dos seguintes passos:

1. **Obtenção de Termo de Consentimento Específico:** Coletar a assinatura dos pais ou responsáveis legais autorizando a coleta de dados de telemetria esportiva e análise tática.
2. **Adopção do RKT com Papéis Definidos:** Atribuir perfis rigorosos (`GESTOR`, `TREINADOR`, `ANNOTATOR`) a cada colaborador da equipe técnica.
3. **Ativação da Anonimização Padrão:** Garantir que o feed público de transmissões esteja configurado para exibir apenas as iniciais do atleta menor.
4. **Política de Descarte e Inativação:** Utilizar as ferramentas de suspensão e exclusão de contas do RKT quando um atleta encerrar seu vínculo com a academia.
5. **Treinamento das Equipes de Quadra:** Orientar anotadores e treinadores sobre a correta distinção entre cadastros "Meu Clube" e "Outro Clube" para preservar a governança de dados de terceiros.
