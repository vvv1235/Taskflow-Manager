# TaskFlow Manager (Backend)

Este é o projeto backend do **TaskFlow Manager**, construído com o framework [NestJS](https://github.com/nestjs/nest) utilizando TypeScript, e o **Prisma ORM** para a comunicação com banco de dados PostgreSQL.

## Começando

Primeiro, certifique-se de que seu banco de dados PostgreSQL esteja em execução (conforme a configuração no arquivo `.env`, o padrão mapeia para um banco local na porta `5432`). 

Instale as dependências:

```bash
npm install
```

O projeto utiliza o Prisma. É preciso sincronizar as tabelas através da ferramenta de migração (isso criará as tabelas `User`, `Task`, `Category` e `_TaskCategories` no seu PostgreSQL):

```bash
npx prisma migrate dev
```

E em seguida, popular (semear / *seed*) as categorias iniciais e também o usuário padrão do sistema:

```bash
npx prisma db seed
```

## Comandos de Execução

Você pode rodar a aplicação backend de 3 formas:

```bash
# modo de desenvolvimento (padrão)
npm run start

# modo de desenvolvimento com 'watch mode' (auto-restart caso salve algum arquivo)
npm run start:dev

# modo de produção
npm run start:prod
```

O servidor começará a aceitar requisições na porta **3001** (`http://localhost:3001`).

## Estrutura do Projeto

- `src/main.ts`: Ponto de entrada. Configura o CORS, as portas e a validação DTO (ValidationPipe) global.
- `src/prisma`: Um Módulo e Serviço globais para injetar o provedor do ORM em outros módulos da aplicação sem necessidade de se conectar múltiplas vezes.
- `src/tasks`: O maior módulo; gerencia o CRUD geral, atualização rápida de status (`Patch`) e o filtro flexível em formato *query-string*.
- `src/categories`: Integração e gestão da tabela satélite e cores em HEX.
- `src/users`: Onde gerenciamos a listagem de usuários.

## Testes

O *scaffold* original provê suporte para testes automatizados nativos com o framework JesT.

```bash
# testes unitários
npm run test

# testes integrados e e2e (end-to-end)
npm run test:e2e

# avaliação de cobertura de código
npm run test:cov
```
