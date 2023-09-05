import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidacaoCpf } from './utils/validacoes/cpf.validacao';
import { ValidacaoDataNascimento } from './utils/validacoes/dataNascimento.validacao';
import { ValidacaoNome } from './utils/validacoes/nome.validacao';
import { ValidacaoEmail } from './utils/validacoes/email.validacao';
import { ValidacaoNumeroTelefone } from './utils/validacoes/numeroTelefone.validacao';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly validacaoCpf: ValidacaoCpf,
    private readonly validacaoDataNascimento: ValidacaoDataNascimento,
    private readonly validacaoNome: ValidacaoNome,
    private readonly validacaoEmail: ValidacaoEmail,
    private readonly validacaoNumeroTelefone: ValidacaoNumeroTelefone,
  ) {}

  getHello(): string {
    return 'Api funcionando!';
  }

  async findAll() {
    return 'mnda geral';
  }

  async findOne(id: string) {
    return id;
  }

  async create(createUserDto: CreateUserDto) {
    if (!this.validacaoCpf.validar(createUserDto.document)) {
      throw new HttpException(
        'CPF fora do padrão da Receita Federal',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validacaoDataNascimento.validar(createUserDto.birth_date)) {
      throw new HttpException(
        'Data de nascimento inválida',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validacaoNumeroTelefone.validar(createUserDto.phone_number)) {
      throw new HttpException(
        'Número de telefone inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!this.validacaoNome.validar(createUserDto.first_name)) {
      throw new HttpException('Primeiro nome inválido', HttpStatus.BAD_REQUEST);
    }

    if (!this.validacaoEmail.validar(createUserDto.email)) {
      throw new HttpException('e-mail inválido', HttpStatus.BAD_REQUEST);
    }

    if (!this.validacaoNome.validar(createUserDto.first_name)) {
      throw new HttpException(
        'Sobrenome nome inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    const cpfJaCadastrado = await this.userRepository.findOne({
      where: { document: createUserDto.document },
    });

    if (cpfJaCadastrado) {
      throw new HttpException('CPF já cadastrado', HttpStatus.BAD_REQUEST);
    }

    try {
      const cliente = await this.userRepository.insert(createUserDto);

      return {
        message: 'Usuário criado com sucesso',
        id: cliente.identifiers[0].id,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserDto.first_name;
  }

  async remove(id: string) {
    return id;
  }
}
