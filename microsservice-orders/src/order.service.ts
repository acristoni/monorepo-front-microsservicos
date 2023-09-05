import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  getHello(): string {
    return 'Microsserviço de pedidos em funcionamento!';
  }

  async findAll() {
    return 'mnda geral';
  }

  async findOne(id: string) {
    return id;
  }

  async create(createOrderDto: CreateOrderDto) {
    return createOrderDto.description;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return updateOrderDto.description;
  }

  async remove(id: string) {
    return id;
  }
}
