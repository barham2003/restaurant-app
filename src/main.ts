import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from "node:process"


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
}

bootstrap();
