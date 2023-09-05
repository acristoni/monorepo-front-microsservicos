import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidacaoNome } from './utils/validacoes/nome.validacao';
import { ValidacaoDataNascimento } from './utils/validacoes/dataNascimento.validacao';
import { ValidacaoCpf } from './utils/validacoes/cpf.validacao';
import { UserEntity } from './user.entity';
import { ValidacaoNumeroTelefone } from './utils/validacoes/numeroTelefone.validacao';
import { ValidacaoEmail } from './utils/validacoes/email.validacao';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: false,
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ValidacaoCpf,
    ValidacaoDataNascimento,
    ValidacaoNome,
    ValidacaoNumeroTelefone,
    ValidacaoEmail,
  ],
})
export class UserModule {}
