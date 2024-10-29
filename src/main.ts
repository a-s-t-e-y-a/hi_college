import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('The Authentication API description')
    .setVersion('1.0')
    .addTag('auth')
    .addCookieAuth('token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Custom Swagger setup to handle cookies
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
