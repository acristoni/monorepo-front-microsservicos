import { OrderEntity } from 'src/order.entity';

const OrderMock: OrderEntity = {
  id: 'asd1a23sd1a23sd',
  user_id: '123asd12a3sd123',
  description: 'teste',
  quantity: 1,
  price: 1.5,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default OrderMock;
