import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuário')
@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Apenas para teste de funcionamento da api',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
