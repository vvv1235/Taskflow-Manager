# TaskFlow Manager (Frontend)

Este é o projeto frontend do **TaskFlow Manager**, construído com [Next.js](https://nextjs.org) (App Router).

## Começando

Primeiro, instale as dependências:

```bash
npm install
```

Em seguida, inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `src/app`: Rotas da aplicação e layouts base (Página inicial, Detalhes de Tarefa, Categorias).
- `src/components`: Componentes reutilizáveis de interface (Cards de tarefas, barra de navegação, barra de filtros e badges de status/prioridade).
- `src/lib`: Funções utilitárias e configuração da API (`axios` com a base URL apontando para a porta 3001).
- `src/types`: Interfaces do TypeScript que espelham o esquema de banco de dados do backend.

## Tecnologias Utilizadas

- **React e Next.js 14+**: Renderização e roteamento através do paradigma *App Router*.
- **Tailwind CSS**: Estilização do sistema (design focado no efeito *glassmorphism* e *dark theme*).
- **Lucide Icons**: Pacote de ícones minimalistas.
- **Framer Motion**: Utilizado para criar interações ricas e micro-animações, como na barra lateral ativa.
- **React Hot Toast**: Usado para alertas em tela não-intrusivos, provendo feedback para ações como sucesso/erro no CRUD de tarefas.

## Comunicação com a API

Certifique-se de que o backend NestJS (`/backend`) está em execução na porta **3001** para o pleno funcionamento de todas as consultas e operações simultâneas das tarefas.
