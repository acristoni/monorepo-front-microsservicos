import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './auth.guard';
import { InfoUser } from './dto/info-user.dto';

@ApiTags('Usuário')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Apenas para teste de funcionamento da api',
  })
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('login')
  @ApiOperation({
    summary: 'Tráz todos os clientes do banco de dados com paginação',
  })
  @ApiQuery({
    name: 'email',
    type: String,
    description: 'e-mail do usuário',
    example: 'qualquer@coisa.com.br',
  })
  @ApiQuery({
    name: 'senha',
    type: String,
    description: 'senha do usuário',
    example: 'S3nh4F#rt3',
  })
  async login(
    @Query('email') email: string,
    @Query('senha') senha: string,
  ): Promise<{ access_token: string }> {
    return await this.userService.login(email, senha);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('find')
  @ApiOperation({
    summary: 'Lista todos os usuários do sistema',
  })
  async findAll(): Promise<InfoUser[]> {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('find/:id')
  @ApiOperation({
    summary: 'Exibe um usuário.',
  })
  async findOne(@Param('id') id: string): Promise<InfoUser> {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário no sistema',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um usuário.',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Desativa um usuário.',
  })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('validate')
  @ApiOperation({
    summary:
      'Validação de token JWT, utilizado por outros microsserviços principalmente.',
  })
  validateToken() {
    console.log('validacao');
    return {
      message: 'token valido',
      statusCode: 200,
    };
  }
}
