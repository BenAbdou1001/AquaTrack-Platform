/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Setting API Path
  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Swagger Example API')
    .setDescription('Swagger Example API API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Swagger path: http://localhost:3200/api/docs
  SwaggerModule.setup(`${apiPath}/docs`, app, document);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
