import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/validation.pipe';


const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);


  Logger.log(`SErver running on, ${PORT}`);
}
bootstrap();
