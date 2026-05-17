import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita as políticas de CORS para permitir que o frontend (na porta 3000)
  // faça requisições para a nossa API na porta 3001
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configura a validação global utilizando o ValidationPipe.
  // Isso intercepta os dados recebidos (DTOs), converte e valida de forma automática
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão definidas no DTO
      transform: true, // Transforma automaticamente os payloads nos tipos esperados pela classe
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Inicia o servidor na porta definida (por padrão, porta 3001 conforme o .env)
  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT ?? 3001}`);
}
bootstrap();
