import { AppModule } from './app.module';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('BMS API')
    .setDescription('Books Management System')
    .setVersion('1.0')
    .addTag('BMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
