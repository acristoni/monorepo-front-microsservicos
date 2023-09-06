import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import OrderMock from './mock/order.mock';
import OrderDtoMock from './mock/orderDto.mock';
import { mockRepositoryProvider } from './mock/repository.mock';
import { OrderEntity } from './order.entity';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService, mockRepositoryProvider(OrderEntity)],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('getHello', () => {
    it('Deve retornar "Microsserviço de pedidos em funcionamento!"', () => {
      const result = orderController.getHello();
      expect(result).toBe('Microsserviço de pedidos em funcionamento!');
    });
  });

  describe('findAll', () => {
    it('Deve retornar todas os pedidos', async () => {
      jest.spyOn(orderService, 'findAll').mockResolvedValue([OrderMock]);

      const result = await orderController.findAll();

      expect(result).toStrictEqual([OrderMock]);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um pedido, pelo seu id', async () => {
      const orderId = '123asd123asd123';
      jest.spyOn(orderService, 'findOne').mockResolvedValue(OrderMock);

      const result = await orderController.findOne(orderId);

      expect(result).toBe(OrderMock);
    });
  });

  describe('create', () => {
    it('Deve criar um pedido', async () => {
      const resolvedMock = {
        message: 'Pedido criado com sucesso',
        id: '123asd12a3sd123',
      };

      jest.spyOn(orderService, 'create').mockResolvedValue(resolvedMock);

      const result = await orderController.create(OrderDtoMock);

      expect(result).toBe(resolvedMock);
    });
  });

  describe('update', () => {
    it('should update an existing order', async () => {
      const orderId = '123asd12a3sd123';
      const resolvedMock = 'Pedido id 123asd12a3sd123 atualizado com sucesso!';
      jest.spyOn(orderService, 'update').mockResolvedValue(resolvedMock);

      const result = await orderController.update(orderId, OrderDtoMock);

      expect(result).toBe(resolvedMock);
    });
  });

  describe('remove', () => {
    it('should delete an existing order', async () => {
      const orderId = '123asd12a3sd123';
      const resolvedMock = 'Pedido id 123asd12a3sd123 excluído com sucesso!';

      jest.spyOn(orderService, 'remove').mockResolvedValue(resolvedMock);

      const result = await orderController.remove(orderId);

      expect(result).toBe(resolvedMock);
    });
  });
});
