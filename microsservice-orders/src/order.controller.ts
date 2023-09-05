import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Usuário')
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({
    summary: 'Apenas para teste de funcionamento do microsserviço',
  })
  getHello(): string {
    return this.orderService.getHello();
  }

  @Get('find')
  @ApiOperation({
    summary: 'Lista todos os usuários do sistema',
  })
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({
    summary: 'Exibe o usuário com id passado no parâmetro',
  })
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo usuário no sistema',
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um usuário especificado pelo seu id',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui os dados de um usuário especificado pelo seu id',
  })
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
