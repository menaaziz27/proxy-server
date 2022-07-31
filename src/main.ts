import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('html');

  await app.listen(3000);
}
bootstrap();
