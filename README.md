# TaskFlow Manager

O TaskFlow Manager é uma aplicação web full-stack desenvolvida para criar, organizar e gerenciar tarefas de forma eficiente, permitindo filtros e categorização.

## Pré-requisitos

- Node.js > 18
- Docker (para executar o banco de dados)

## Início Rápido (Backend)

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Inicie o banco de dados PostgreSQL via Docker:
   ```bash
   docker run -d --name taskflow-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=taskflowmanager -p 5432:5432 postgres:16-alpine
   ```
3. Instale as dependências e rode as migrações do Prisma:
   ```bash
   npm install
   npx prisma migrate dev
   npx prisma db seed
   ```
4. Inicie o servidor (rodará na porta 3001)
   ```bash
   npm run start:dev
   ```

## Início Rápido (Frontend)

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do Next.js (rodará na porta 3000)
   ```bash
   npm run dev
   ```
   *Após iniciar, você pode acessar a aplicação em http://localhost:3000*

## Decisões Técnicas

Arquitetura: O sistema foi dividido entre frontend (Next.js) e backend (NestJS) para manter uma separação clara das responsabilidades. Isso facilita a manutenção, organização do código e escalabilidade do projeto conforme novas funcionalidades são adicionadas.

Backend / API: Foi escolhido o NestJS devido à sua estrutura modular, tipagem forte com TypeScript e facilidade para construir aplicações escaláveis. Para comunicação com o banco de dados, utilizou-se o Prisma ORM, que simplifica operações no PostgreSQL, reduzindo a complexidade de consultas SQL e tornando o desenvolvimento mais seguro e produtivo.

Frontend / Interface: A interface foi desenvolvida com Next.js (App Router), aproveitando recursos modernos do framework. A estilização utiliza o Tailwind CSS estruturando uma UI totalmente temática e responsiva.

Gerenciamento de Dados e Estado: A comunicação com o backend é realizada através do Axios, enquanto o React utiliza hooks locais para controle de estado. A abordagem prioriza componentes client-side quando necessário, permitindo atualizações mais rápidas e interações em tempo real dentro da interface.

Validação de Dados: Para garantir integridade e segurança, os dados recebidos pela API passam por validações usando DTOs e class-validator no backend. Isso evita que informações inválidas ou inconsistentes sejam armazenadas no banco de dados.

## Decisões de Design

A estética visual do TaskFlow Manager foi deliberadamente afastada das tradicionais interfaces brutalistas, corporativas e do popular "glassmorphism dark mode". Optou-se por adotar uma **estética de diário/caderno artesanal**.

Essa decisão se apoia nos seguintes pilares:
1. **Nostalgia e Acolhimento**: Fugas de produtividade tóxica. Uma interface que remete a post-its reais, linhas rabiscadas, margens de cadernos escolares e marca-textos cria no usuário uma sensação de **conforto** e redução de ansiedade frente aos seus compromissos. O sistema parece "feito à mão", pessoal, imperfeito e por isso mais convidativo.
2. **Familiaridade Cognitiva**: Todos nós aprendemos a nos organizar em papel e caneta. Trazer metáforas visuais palpáveis — como clipes de metal simulados nas categorias, opções de botões parecendo colagens de adesivos e tipografia de escrita cursiva (Caveat) associada a textos limpos (Nunito) — acelera o entendimento psicológico de cada área da tela e confere uma personalidade inesquecível à aplicação.


## Funcionalidades Implementadas

- Listagem de tarefas com filtros simultâneos (Status, Prioridade, Categoria).
- Criação e exclusão de categorias personalizadas com sistema de cores.
- Detalhes integrais de cada tarefa com mudança rápida de status.
- Formulários avançados com seleção múltipla de categorias (relacionamento *Many-to-Many* real no banco).
