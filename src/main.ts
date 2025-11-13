import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieparser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieparser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
  .setTitle('Ecommerce Project')
  .setDescription('Ecommerce Backend')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
