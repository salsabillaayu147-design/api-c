import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from './entities/order-item.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { CreateOrderItemDto } from './dto/create-order-item.dto.js';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const book = await this.bookRepository.findOne({
      where: { id: dto.bookId },
    });

    if (!book) {
      throw new NotFoundException('Book tidak ditemukan');
    }

    const orderItem = this.orderItemRepository.create({
      order,
      book,
      quantity: dto.quantity,
      price: dto.price,
      subtotal: dto.subtotal,
    });

    return this.orderItemRepository.save(orderItem);
  }

  async findAll() {
    return this.orderItemRepository.find({
      relations: {
        order: true,
        book: true,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.orderItemRepository.findOne({
      where: { id },
      relations: {
        order: true,
        book: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Order item tidak ditemukan');
    }

    return item;
  }

  async update(id: string, dto: Partial<CreateOrderItemDto>) {
    const item = await this.findOne(id);

    if (dto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: dto.orderId },
      });

      if (!order) {
        throw new NotFoundException('Order tidak ditemukan');
      }

      item.order = order;
    }

    if (dto.bookId) {
      const book = await this.bookRepository.findOne({
        where: { id: dto.bookId },
      });

      if (!book) {
        throw new NotFoundException('Book tidak ditemukan');
      }

      item.book = book;
    }

    if (dto.quantity !== undefined) item.quantity = dto.quantity;
    if (dto.price !== undefined) item.price = dto.price;
    if (dto.subtotal !== undefined) item.subtotal = dto.subtotal;

    return this.orderItemRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.orderItemRepository.remove(item);

    return { message: 'Order item berhasil dihapus' };
  }
}