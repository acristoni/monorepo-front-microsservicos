import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'Valdecir',
  })
  first_name: string;

  @ApiProperty({
    description: 'último sobrenome do usuário',
    example: 'Silva',
  })
  last_name: string;

  @ApiProperty({
    description: 'CPF ou RG do usuário',
    example: '49317131069',
  })
  document: string;

  @ApiProperty({
    description: 'e-mail do usuário',
    example: 'qualquer@coisa.com.br',
  })
  email: string;

  @ApiProperty({
    description: 'e-mail do usuário',
    example: 'qualquer@coisa.com.br',
  })
  phone_number: string;

  @ApiProperty({
    description: 'Data de nascimento do cliente',
    example: '1990-01-01',
  })
  birth_date: string;
}
