import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // Get ConfigService instance
  const port = configService.get<number>('PORT'); // Get PORT from environment variable

  app.enableCors();
  await app.listen(port);
}

bootstrap();
