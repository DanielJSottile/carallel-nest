import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port || 3000);
}
bootstrap();
