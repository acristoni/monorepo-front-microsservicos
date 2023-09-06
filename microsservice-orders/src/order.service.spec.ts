import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { mockRepositoryProvider } from './mock/repository.mock';
import OrderDtoMock from './mock/orderDto.mock';
import OrderMock from './mock/order.mock';

describe('UserService', () => {
  let orderService: OrderService;
  let orderRepository: Repository<OrderEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, mockRepositoryProvider(OrderEntity)],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  it('Deve ser definido', () => {
    expect(orderService).toBeDefined();
  });

  describe('getHello', () => {
    it('Deve retornar "Microsserviço de pedidos em funcionamento!"', () => {
      const message = orderService.getHello();
      expect(message).toBe('Microsserviço de pedidos em funcionamento!');
    });
  });

  describe('create', () => {
    it('Deve criar um novo pedido', async () => {
      jest.spyOn(orderRepository, 'insert').mockResolvedValue({
        identifiers: [{ id: '123asd123asd123' }],
        generatedMaps: [],
        raw: [],
      });
      const returnCreate = await orderService.create(OrderDtoMock);
      const returnMessage = 'Pedido criado com sucesso';
      expect(returnCreate.message).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(orderRepository, 'insert').mockRejectedValue(null);
      await expect(orderService.create(OrderDtoMock)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('Deve retornar todos os pedidos.', async () => {
      jest.spyOn(orderRepository, 'find').mockResolvedValue([OrderMock]);
      const returnFindAll = await orderService.findAll();
      expect(returnFindAll).toStrictEqual([OrderMock]);
    });
    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(orderRepository, 'find').mockRejectedValue(null);
      await expect(orderService.findAll()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('Deve retornar o pedido pelo id', async () => {
      const id = '123asd123asd';

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(OrderMock);

      const returnClient = await orderService.findOne(id);
      expect(returnClient).toStrictEqual(OrderMock);
    });

    it('Deve tratar NotFoundException.', async () => {
      const id = '123';

      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(async () => {
        await orderService.findOne(id);
      }).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('Deve editar um pedido', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(OrderMock);
      jest.spyOn(orderRepository, 'update').mockResolvedValue(null);
      const returnCreate = await orderService.update(
        '123asd123asd',
        OrderDtoMock,
      );
      const returnMessage = 'Pedido id 123asd123asd atualizado com sucesso!';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(OrderMock);
      jest.spyOn(orderRepository, 'update').mockRejectedValue(null);
      await expect(
        orderService.update('123asd123asd', OrderDtoMock),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('Deve tratar um erro do tipo NotFound', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(
        orderService.update('123asd123asd', OrderDtoMock),
      ).rejects.toThrow(
        new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('remove', () => {
    it('Deve apagar um usuário pelo id', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(OrderMock);
      jest.spyOn(orderRepository, 'delete').mockResolvedValue(null);
      const returnCreate = await orderService.remove('123asd123asd');
      const returnMessage = 'Pedido id 123asd123asd excluído com sucesso!';
      expect(returnCreate).toBe(returnMessage);
    });

    it('Deve tratar um erro do tipo NotFound', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(null);

      await expect(orderService.remove('123')).rejects.toThrow(
        new HttpException('Pedido não encontrado', HttpStatus.NOT_FOUND),
      );
    });

    it('Deve tratar um erro do tipo InternalServerErrorException', async () => {
      jest.spyOn(orderRepository, 'findOne').mockResolvedValue(OrderMock);
      jest.spyOn(orderRepository, 'delete').mockRejectedValue(null);
      await expect(orderService.remove('123asd123asd')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
