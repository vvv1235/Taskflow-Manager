import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

// O AppModule é o módulo principal e a raiz da aplicação.
// Aqui nós listamos todos os módulos (camadas de negócio) que o NestJS deve inicializar
@Module({
  imports: [
    PrismaModule,     // Módulo que fornece o serviço de banco de dados
    CategoriesModule, // Integração com a tabela de categorias
    TasksModule,      // Integração e controle das tarefas e filtros
    UsersModule       // Gerencia os dados do usuário do sistema
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
