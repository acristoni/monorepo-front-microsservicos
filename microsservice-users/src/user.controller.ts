import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get('find')
  @ApiOperation({
    summary: 'Lista todos os usuários do sistema',
  })
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({
    summary: 'Exibe um usuário.',
  })
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário no sistema',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um usuário, especificado pelo seu id',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Desativa um usuário,  especificado pelo seu id',
  })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
