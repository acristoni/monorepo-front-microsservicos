import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  const config = new DocumentBuilder()
    .setTitle('Microsserviço-Pedidos')
    .setDescription(
      'Microsserviço para criação, atualização e autenticação de pedidos',
    )
    .setVersion('1.0')
    .addTag('Pedidos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT);
}
bootstrap();
