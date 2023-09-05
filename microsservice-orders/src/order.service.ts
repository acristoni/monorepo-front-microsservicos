import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id: id } });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
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
    await this.findOne(id);

    return await this.orderRepository
      .update(id, updateOrderDto)
      .then(() => `Pedido id ${id} atualizado com sucesso!`)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.orderRepository
      .delete({ id: id })
      .then(() => `Pedido id ${id} excluído com sucesso!`)
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }
}
