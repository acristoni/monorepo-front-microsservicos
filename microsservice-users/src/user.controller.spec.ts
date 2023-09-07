import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { mockRepositoryProvider } from './utils/mocks/repository.mock';
import { ValidacaoCpf } from './utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from './utils/validacoes/dataNascimento.validacao';
import { ValidacaoEmail } from './utils/validacoes/email.validacao';
import { ValidacaoNome } from './utils/validacoes/nome.validacao';
import { ValidacaoNumeroTelefone } from './utils/validacoes/numeroTelefone.validacao';
import CreateUserDtoMock from './utils/mocks/createUserDto.mock';
import InfoUserMock from './utils/mocks/infoUser.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        JwtService,
        mockRepositoryProvider(UserEntity),
        ValidacaoCpf,
        ValidacaoDataNascimento,
        ValidacaoNome,
        ValidacaoEmail,
        ValidacaoNumeroTelefone,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('Deve ser definido', () => {
    expect(userController).toBeDefined();
  });

  describe('getHello', () => {
    it('Deve retornar "Api funcionando!"', () => {
      const result = userController.getHello();
      expect(result).toBe('Api funcionando!');
    });
  });

  describe('login', () => {
    it('Deve retornar um token JWT, no login do usuário', async () => {
      const email = 'user@example.com';
      const senha = 'password';
      const tokenJWT = { access_token: '123ASD12A3SD123A' };
      jest.spyOn(userService, 'login').mockResolvedValue(tokenJWT);

      const result = await userController.login(email, senha);

      expect(result).toBe(tokenJWT);
    });
  });

  describe('findAll', () => {
    it('Deve retornar todos os usuários', async () => {
      const users = [InfoUserMock];
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);

      const result = await userController.findAll();

      expect(result).toBe(users);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um usuário pelo id', async () => {
      const userId = '123asd123asd';
      jest.spyOn(userService, 'findOne').mockResolvedValue(InfoUserMock);

      const result = await userController.findOne(userId);

      expect(result).toBe(InfoUserMock);
    });
  });

  describe('create', () => {
    it('Deve criar um usuário', async () => {
      const resolvedMock = {
        message: 'Usuário criado com sucesso',
        id: '123asd12a3sd1a23s',
      };
      jest.spyOn(userService, 'create').mockResolvedValue(resolvedMock);

      const result = await userController.create(CreateUserDtoMock);

      expect(result).toBe(resolvedMock);
    });
  });

  describe('update', () => {
    it('Deve atualizar um usuário', async () => {
      const userId = '123asd23asd23';
      const resolvedMock = 'Usuário id 123asd23asd23 atualizado com sucesso!';
      jest.spyOn(userService, 'update').mockResolvedValue(resolvedMock);

      const result = await userController.update(userId, CreateUserDtoMock);

      expect(result).toBe(resolvedMock);
    });
  });

  describe('remove', () => {
    it('Deve desativar um usuário', async () => {
      const userId = '123asd123asd';
      const resolvedMock = 'Usuário id 123asd123asd desativado com sucesso!';
      jest.spyOn(userService, 'remove').mockResolvedValue(resolvedMock);

      const result = await userController.remove(userId);

      expect(result).toBe(resolvedMock);
    });
  });

  describe('validateToken', () => {
    it('Deve validar um token JWT, utilizado principalmente por outros microsserviços.', () => {
      const result = userController.validateToken();

      expect(result).toEqual({
        message: 'token valido',
        statusCode: 200,
      });
    });
  });
});
