import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  public constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

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
    try {
      const cliente = await this.orderRepository.insert(createOrderDto);

      return {
        message: 'Pedido criado com sucesso',
        id: cliente.identifiers[0].id,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return updateOrderDto.description;
  }

  async remove(id: string) {
    return id;
  }
}
