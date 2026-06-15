import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API documentation for Task Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      // docExpansion: 'full',
    },
  });

  await app.listen(3000);
}
bootstrap();

// get refresh tokens
// change password
// logout
