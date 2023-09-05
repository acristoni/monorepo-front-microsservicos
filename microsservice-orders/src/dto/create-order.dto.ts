import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID do usuário que responsáevl pelo pedido',
    example: '8b2fc323-3eb1-417d-bea2-ebc5b7f4e59a',
  })
  user_id: string;

  @ApiProperty({
    description: 'Descrição do pedido',
    example: 'Almoço executivo',
  })
  description: string;

  @ApiProperty({
    description: 'Quantidade de itens no pedido',
    example: 3,
  })
  quantity: number;

  @ApiProperty({
    description: 'Preço do pedido',
    example: 2.56,
  })
  price: number;
}
