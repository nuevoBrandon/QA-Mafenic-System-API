import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsOptions } from './config/configCors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  app.enableCors(corsOptions);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  const prefix = 'api/v1';
  console.log(`Aplicación corriendo en: http://localhost:${port}/${prefix}`);
}
bootstrap();
