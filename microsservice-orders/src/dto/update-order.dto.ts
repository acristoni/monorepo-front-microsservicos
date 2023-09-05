import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'ID do usuário que responsáevl pelo pedido',
    example: '8b2fc323-3eb1-417d-bea2-ebc5b7f4e59a',
    required: false,
  })
  user_id?: string;

  @ApiProperty({
    description: 'Descrição do pedido',
    example: 'Almoço executivo',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Quantidade de itens no pedido',
    example: 3,
    required: false,
  })
  quantity?: number;

  @ApiProperty({
    description: 'Preço do pedido',
    example: 2.56,
    required: false,
  })
  price?: number;
}
