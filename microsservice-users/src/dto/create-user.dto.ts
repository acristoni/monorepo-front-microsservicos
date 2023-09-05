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
    description: 'CPF do usuário',
    example: '49317131069',
  })
  document: string;

  @ApiProperty({
    description: 'e-mail do usuário',
    example: 'qualquer@coisa.com.br',
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '1112341234',
  })
  phone_number: string;

  @ApiProperty({
    description: 'Data de nascimento do usuário',
    example: '1990-01-01',
  })
  birth_date: string;

  @ApiProperty({
    description: 'Senha para login do usuário',
    example: 'S3nh4F#rt3',
  })
  password: string;
}
