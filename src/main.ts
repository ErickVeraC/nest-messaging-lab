import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { initializeApm } from 'config/apm.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Inicializar APM usando ConfigService
  const configService = app.get(ConfigService);
  initializeApm(configService);

  //Config Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API para gestion de tareas')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // Rechaza requests con propiedades no permitidas
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
