### 6. Governança de Perfis e Clubes — RKT

#### Visão Geral
O RKT adota uma arquitetura de governança rigorosa baseada em controle de acesso por papéis (RBAC — *Role-Based Access Control*), estruturada em torno de clubes, Centros de Treinamento (CTs) e políticas estritas de proteção de dados (LGPD e ECA Digital).

#### Matriz de Perfis de Usuário (RBAC Operacional)

| Papel | Sigla | Nível de Acesso e Responsabilidade Principal |
| :--- | :--- | :--- |
| **Administrador** | `ADMIN` | Gestão total da infraestrutura, homologação de clubes/CTs, auditoria e parâmetros do sistema. |
| **Gestor de Clube** | `GESTOR` | Administração do clube/CT: aprovação de treinadores, atletas vinculados, relatórios e partidas do clube. |
| **Treinador** | `TREINADOR` | Anotação de partidas de seus atletas, cadastro de atletas do clube/externos e diagnósticos táticos. |
| **Anotador** | `ANNOTATOR` | Papel operacional focado no registro do placar ponto a ponto em tempo real e controle de partidas suspensas. |
| **Atleta** | `ATLETA` | Perfil de consulta pessoal: acesso ao histórico de partidas próprias, rankings e métricas de evolução. |
| **Acompanhante / Espectador** | `VIEWER` | Acesso público ou restrito de visualização de partidas liberadas, sem permissão de edição. |

#### Governança de Visualização: Hash SHA-256 e Acompanhante da Partida
Para permitir que pais, familiares e torcedores acompanhem partidas públicas sem comprometer a segurança do ecossistema autenticado, o RKT utiliza links de acompanhamento com **hash SHA-256**:
* **Links Seguros por Token/Hash:** O acesso ao placar público de uma partida não expõe rotas autenticadas do sistema; é intermediado por uma chave hash única de 256 bits gerada para a partida.
* **Isolamento de Dados Confidenciais:** O acompanhante visualiza apenas a pontuação dinâmica e o tempo decorrido. Notas táticas, áudios e observações gravadas pelos treinadores são bloqueados no backend e inacessíveis na rota de visualização.

#### Proteção de Dados de Menores (LGPD & ECA Digital)
Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o Estatuto da Criança e do Adolescente (ECA Digital):
1. **Consentimento dos Responsáveis:** O cadastro de atletas menores de 18 anos exige consentimento explícito dos pais ou responsáveis legais.
2. **Anonimização Automática em Feeds Públicos:** Em qualquer transmissão ou visualização pública aberta, o nome de atletas menores de idade sem autorização de exposição é automaticamente anonimizado (ex: exibindo apenas as iniciais "A. S.").
3. **Privacidade por Padrão (*Privacy by Default*):** Partidas envolvendo atletas menores de idade são configuradas como privadas por padrão, exigindo liberação expressa do clube ou treinador responsável para tornar o placar acessível.

#### Estrutura de Clubes e Centros de Treinamento (CTs)
* **Clube:** Entidade esportiva jurídica principal (ex: Tênis Clube, Academia de Beach Tennis).
* **CT (Centro de Treinamento):** Unidade de treinamento operacional vinculada a um clube ou autônoma.

##### Status do Clube / CT:
* `Pendente`: Cadastro realizado, aguardando validação do suporte ou administrador.
* `Ativo`: Entidade homologada e operacional na plataforma.
* `Suspenso`: Entidade inativada temporariamente (bloqueando a criação de novas partidas).

#### Regras de Vinculação e Proteção de Atletas
Para evitar que atletas adversários sejam associados incorretamente ao clube do anotador, o sistema impõe quatro categorias de vinculação nos slots de jogo:

| Categoria | Descrição e Regra de Governança |
| :--- | :--- |
| **Meu clube** | Atleta vinculado ao CT do usuário logado. Novo atleta criado herda automaticamente estado, cidade e clube do CT. |
| **Outro clube** | Atleta cadastrado em outro CT. Novo atleta criado nessa opção **não recebe vínculo automático** com o CT do anotador. |
| **Sem clube** | Atleta autônomo sem vinculação institucional. |
| **Externo** | Registro de adversários sem conta na plataforma, mantidos em lista reservada para suporte e auditoria. |

#### Contas Avulsas
Profissionais que atuam de forma independente (ex: treinadores autônomos ou personal trainers de tênis) são registrados como **contas avulsas**. Eles possuem permissão para anotar partidas e gerenciar seus atletas, porém sem acesso a painéis de governança de clubes ou aprovação de CTs.

--------------------------------------------------------------------------------

*Módulo atômico: 6-governanca-de-perfis-e-clubes.md*
