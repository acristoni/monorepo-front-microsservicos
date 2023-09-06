import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { mockRepositoryProvider } from './utils/mocks/repository.mock';
import { ValidacaoCpf } from './utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from './utils/validacoes/dataNascimento.validacao';
import { ValidacaoEmail } from './utils/validacoes/email.validacao';
import { ValidacaoNome } from './utils/validacoes/nome.validacao';
import { ValidacaoNumeroTelefone } from './utils/validacoes/numeroTelefone.validacao';
import { JwtService } from '@nestjs/jwt';
import CreateUserDtoMock from './utils/mocks/createUserDto.mock';
import UserMock from './utils/mocks/user.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let validacaoCpf: ValidacaoCpf;
  let validacaoDataNascimento: ValidacaoDataNascimento;
  let validacaoNome: ValidacaoNome;
  let validacaoEmail: ValidacaoEmail;
  let validacaoNumeroTelefone: ValidacaoNumeroTelefone;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    validacaoCpf = module.get<ValidacaoCpf>(ValidacaoCpf);
    validacaoDataNascimento = module.get<ValidacaoDataNascimento>(
      ValidacaoDataNascimento,
    );
    validacaoEmail = module.get<ValidacaoEmail>(ValidacaoEmail);
    validacaoNumeroTelefone = module.get<ValidacaoNumeroTelefone>(
      ValidacaoNumeroTelefone,
    );
    validacaoNome = module.get<ValidacaoNome>(ValidacaoNome);
  });

  it('Deve ser definido', () => {
    expect(userService).toBeDefined();
  });

  describe('getHello', () => {
    it('Deve retornar "Api funcionando!"', () => {
      const message = userService.getHello();
      expect(message).toBe('Api funcionando!');
    });
  });

  describe('create', () => {
    it('Deve criar um novo usuário', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEmail, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNumeroTelefone, 'validar').mockReturnValue(true);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockResolvedValue(UserMock);
      const returnCreate = await userService.create(CreateUserDtoMock);
      const returnMessage = 'Usuário criado com sucesso';
      expect(returnCreate.message).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEmail, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNumeroTelefone, 'validar').mockReturnValue(true);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(userRepository, 'save').mockRejectedValue(null);
      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('Não deve criar um usuário com CPF inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(false);

      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        new HttpException(
          'CPF fora do padrão da Receita Federal',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Não deve criar um usuário com data de nascimento inválida', async () => {
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(false);

      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        new HttpException(
          'Data de nascimento inválida',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Não deve criar um usuário com e-mail inválido', async () => {
      jest.spyOn(validacaoEmail, 'validar').mockReturnValue(false);

      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        new HttpException('e-mail inválido', HttpStatus.BAD_REQUEST),
      );
    });

    it('Não deve criar um usuário com nome inválido', async () => {
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(false);

      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        new HttpException('Primeiro nome inválido', HttpStatus.BAD_REQUEST),
      );
    });

    it('Não deve criar um usuário com número de telefone inválido', async () => {
      jest.spyOn(validacaoNumeroTelefone, 'validar').mockReturnValue(false);

      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        new HttpException(
          'Número de telefone inválido',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Não deve criar um usuário com cpf já cadastrado no sistema', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);

      await expect(userService.create(CreateUserDtoMock)).rejects.toThrow(
        new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findAll', () => {
    it('Deve retornar todos os usuário.', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([UserMock]);
      const returnFindAll = await userService.findAll();
      expect(returnFindAll).toStrictEqual([UserMock]);
    });
    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValue(null);
      await expect(userService.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('Deve retornar o usuário pelo id', async () => {
      const id = '123asd123asd';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);

      const returnClient = await userService.findOne(id);
      expect(returnClient).toStrictEqual(UserMock);
    });

    it('Deve tratar NotFoundException.', async () => {
      const id = '123';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(async () => {
        await userService.findOne(id);
      }).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('Deve editar um usuário', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEmail, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNumeroTelefone, 'validar').mockReturnValue(true);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);
      jest.spyOn(userRepository, 'update').mockResolvedValue(null);
      const returnCreate = await userService.update(
        '123asd123asd',
        CreateUserDtoMock,
      );
      const returnMessage = 'Usuário id 123asd123asd atualizado com sucesso!';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoEmail, 'validar').mockReturnValue(true);
      jest.spyOn(validacaoNumeroTelefone, 'validar').mockReturnValue(true);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);
      jest.spyOn(userRepository, 'update').mockRejectedValue(null);
      await expect(
        userService.update('123asd123asd', CreateUserDtoMock),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('Não deve editar um usuário com CPF inválido', async () => {
      jest.spyOn(validacaoCpf, 'validar').mockReturnValue(false);

      await expect(
        userService.update('123asd123asd', CreateUserDtoMock),
      ).rejects.toThrow(
        new HttpException(
          'CPF fora do padrão da Receita Federal',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Não deve editar um usuário com data de nascimento inválida', async () => {
      jest.spyOn(validacaoDataNascimento, 'validar').mockReturnValue(false);

      await expect(
        userService.update('123asd123asd', CreateUserDtoMock),
      ).rejects.toThrow(
        new HttpException(
          'Data de nascimento inválida',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('Não deve editar um usuário com e-mail inválido', async () => {
      jest.spyOn(validacaoEmail, 'validar').mockReturnValue(false);

      await expect(
        userService.update('123asd123asd', CreateUserDtoMock),
      ).rejects.toThrow(
        new HttpException('e-mail inválido', HttpStatus.BAD_REQUEST),
      );
    });

    it('Não deve editar um usuário com nome inválido', async () => {
      jest.spyOn(validacaoNome, 'validar').mockReturnValue(false);

      await expect(
        userService.update('123asd123asd', CreateUserDtoMock),
      ).rejects.toThrow(
        new HttpException('Primeiro nome inválido', HttpStatus.BAD_REQUEST),
      );
    });

    it('Deve tratar um erro do tipo NotFound', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(
        userService.update('123asd123asd', CreateUserDtoMock),
      ).rejects.toThrow(
        new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('remove', () => {
    it('Deve apagar um usuário pelo id', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);
      jest.spyOn(userRepository, 'update').mockResolvedValue(null);
      const returnCreate = await userService.remove('123asd123asd');
      const returnMessage = 'Usuário id 123asd123asd desativado com sucesso!';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo NotFound', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.remove('123')).rejects.toThrow(
        new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND),
      );
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(UserMock);
      jest.spyOn(userRepository, 'update').mockRejectedValue(null);
      await expect(userService.remove('123asd123asd')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
