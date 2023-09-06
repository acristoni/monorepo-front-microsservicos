import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
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
import { JwtService } from '@nestjs/jwt';

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
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Api funcionando!';
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
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

    if (!this.validacaoNome.validar(createUserDto.last_name)) {
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
      const newUser = new UserEntity();
      newUser.email = createUserDto.email;
      newUser.first_name = createUserDto.first_name;
      newUser.last_name = createUserDto.last_name;
      newUser.document = createUserDto.document;
      newUser.phone_number = createUserDto.phone_number;
      newUser.birth_date = new Date(createUserDto.birth_date);
      newUser.setPassword(createUserDto.password);
      await this.userRepository.save(newUser);

      return {
        message: 'Usuário criado com sucesso',
        id: newUser.id,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (
      updateUserDto.document &&
      !this.validacaoCpf.validar(updateUserDto.document)
    ) {
      throw new HttpException(
        'CPF fora do padrão da Receita Federal',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateUserDto.birth_date &&
      !this.validacaoDataNascimento.validar(updateUserDto.birth_date)
    ) {
      throw new HttpException(
        'Data de nascimento inválida',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateUserDto.phone_number &&
      !this.validacaoNumeroTelefone.validar(updateUserDto.phone_number)
    ) {
      throw new HttpException(
        'Número de telefone inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      updateUserDto.first_name &&
      !this.validacaoNome.validar(updateUserDto.first_name)
    ) {
      throw new HttpException('Primeiro nome inválido', HttpStatus.BAD_REQUEST);
    }

    if (
      updateUserDto.email &&
      !this.validacaoEmail.validar(updateUserDto.email)
    ) {
      throw new HttpException('e-mail inválido', HttpStatus.BAD_REQUEST);
    }

    if (
      updateUserDto.last_name &&
      !this.validacaoNome.validar(updateUserDto.last_name)
    ) {
      throw new HttpException(
        'Sobrenome nome inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findOne(id);

    return await this.userRepository
      .update(id, updateUserDto)
      .then(() => `Usuário id ${id} atualizado com sucesso!`)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.userRepository
      .update(id, { active: false })
      .then(() => `Usuário id ${id} desativado com sucesso!`)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new UnauthorizedException('Senha ou email inválido');
    }

    if (user && !user.active) {
      throw new UnauthorizedException(
        'Usuário com esse e-mail foi desativado do sistema',
      );
    }

    if (user && user.checkPassword(password)) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.SECRET_JWT,
        }),
      };
    } else {
      throw new UnauthorizedException('Senha ou email inválido');
    }
  }
}
