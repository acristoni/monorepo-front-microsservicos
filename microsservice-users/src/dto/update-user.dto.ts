import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'Valdecir',
    required: false,
  })
  first_name?: string;

  @ApiProperty({
    description: 'último sobrenome do usuário',
    example: 'Silva',
    required: false,
  })
  last_name?: string;

  @ApiProperty({
    description: 'CPF ou RG do usuário',
    example: '49317131069',
    required: false,
  })
  document?: string;

  @ApiProperty({
    description: 'e-mail do usuário',
    example: 'qualquer@coisa.com.br',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'e-mail do usuário',
    example: 'qualquer@coisa.com.br',
    required: false,
  })
  phone_number?: string;

  @ApiProperty({
    description: 'Data de nascimento do cliente',
    example: '1990-01-01',
    required: false,
  })
  birth_date?: string;
}
