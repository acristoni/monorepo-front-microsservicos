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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Pedidos')
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

  @ApiBearerAuth()
  @Get('find')
  @ApiOperation({
    summary: 'Lista todos os pedidos do sistema',
  })
  async findAll() {
    return await this.orderService.findAll();
  }

  @ApiBearerAuth()
  @Get('find/:id')
  @ApiOperation({
    summary: 'Exibe um pedido.',
  })
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Cria um novo pedido.',
  })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza um pedido',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Exclui um pedido',
  })
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
