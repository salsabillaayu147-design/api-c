import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemsController } from './order-items.controller.js';
import { OrderItemsService } from './order-items.service.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { Book } from '../books/entities/book.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Order, Book]),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}