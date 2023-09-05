import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
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
    return createUserDto.first_name;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserDto.first_name;
  }

  async remove(id: string) {
    return id;
  }
}
