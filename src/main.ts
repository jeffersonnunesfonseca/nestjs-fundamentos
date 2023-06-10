import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptor/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); //habilta validações de pipe global, exemplo utilização das validações DTO

  // app.useGlobalInterceptors(new LogInterceptor()); //utiliza interceptor de forma global

  await app.listen(3000);
}
bootstrap();
