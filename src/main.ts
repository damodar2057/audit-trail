// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomValidationPipeOptions } from './config/validation-ppe-options.config';
import { FilterPipe } from './common/pipes/filter.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const config = app.get(ConfigService)

  app.enableCors({
    origin: config.get<string>('NODE_ENV') === 'production' ? config.get('ALLOWED_ORIGINS') : true, // we will add our origin when moving to prod
    methods: 'GET,POST,PATCH,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true // allow cookies/auth headers
  })

  
  // set global prefix
  app.setGlobalPrefix(config.get('app.globalPrefix'))
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Template')
    .setDescription('The template api description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'access-token')
    .build();


  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api-docs', app, documentFactory)

  app.use(cookieParser());

  app.use(helmet());

  app.useGlobalPipes(
    new FilterPipe(),
    new ValidationPipe(CustomValidationPipeOptions))
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
