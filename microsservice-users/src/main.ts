import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const config = new DocumentBuilder()
    .setTitle('Microsserviço-Usuário')
    .setDescription(
      'Microsserviço para criação, atualização e autenticação de usuário',
    )
    .setVersion('1.0')
    .addTag('Usuário')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3003;
  await app.listen(PORT);
}
bootstrap();
