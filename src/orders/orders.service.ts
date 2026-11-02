import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateOrderDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    const order = this.orderRepository.create({
      customer,
      orderNumber: dto.orderNumber,
      status: dto.status,
      totalAmount: dto.totalAmount,
    });

    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({
      relations: { customer: true },
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { customer: true },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    return order;
  }

  async update(id: string, dto: Partial<CreateOrderDto>) {
    const order = await this.findOne(id);

    if (dto.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: dto.customerId },
      });

      if (!customer) {
        throw new NotFoundException('Customer tidak ditemukan');
      }

      order.customer = customer;
    }

    if (dto.orderNumber !== undefined) order.orderNumber = dto.orderNumber;
    if (dto.status !== undefined) order.status = dto.status;
    if (dto.totalAmount !== undefined) order.totalAmount = dto.totalAmount;

    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);

    return { message: 'Order berhasil dihapus' };
  }
}