
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // GET semua payment
  async findAll() {
    return this.paymentRepository.find({
      relations: {
        order: true,
      },
    });
  }

  // GET payment berdasarkan ID
  async findOne(id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment tidak ditemukan');
    }

    return payment;
  }

  // POST membuat payment
  async create(dto: CreatePaymentDto) {
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        order: {
          id: dto.orderId,
        },
      },
    });

    if (existingPayment) {
      throw new ConflictException('Order sudah memiliki payment');
    }

    const payment = this.paymentRepository.create({
      order,
      paymentMethod: dto.paymentMethod,
      amount: dto.amount,
      status: dto.status,
      paidAt: dto.paidAt ? new Date(dto.paidAt) : null,
    });

    return this.paymentRepository.save(payment);
  }

  // PUT mengubah payment
  async update(id: string, dto: CreatePaymentDto) {
    const payment = await this.findOne(id);

    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        order: {
          id: dto.orderId,
        },
      },
    });

    if (existingPayment && existingPayment.id !== id) {
      throw new ConflictException('Order sudah memiliki payment');
    }

    payment.order = order;
    payment.paymentMethod = dto.paymentMethod;
    payment.amount = dto.amount;
    payment.status = dto.status;
    payment.paidAt = dto.paidAt ? new Date(dto.paidAt) : null;

    return this.paymentRepository.save(payment);
  }

  // DELETE payment
  async remove(id: string) {
    const payment = await this.findOne(id);

    await this.paymentRepository.remove(payment);

    return {
      message: 'Payment berhasil dihapus',
    };
  }
}
