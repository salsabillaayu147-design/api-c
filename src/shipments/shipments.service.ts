import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Shipment } from './entities/shipment.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // GET semua shipment
  async findAll() {
    return this.shipmentRepository.find({
      relations: {
        order: true,
      },
    });
  }

  // GET shipment berdasarkan ID
  async findOne(id: string) {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });

    if (!shipment) {
      throw new NotFoundException('Shipment tidak ditemukan');
    }

    return shipment;
  }

  // POST membuat shipment
  async create(dto: CreateShipmentDto) {
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingShipment = await this.shipmentRepository.findOne({
      where: {
        order: {
          id: dto.orderId,
        },
      },
    });

    if (existingShipment) {
      throw new ConflictException('Order sudah memiliki shipment');
    }

    const shipment = this.shipmentRepository.create({
      order,
      courier: dto.courier,
      trackingNumber: dto.trackingNumber ?? null,
      status: dto.status,
      shippedAt: dto.shippedAt ? new Date(dto.shippedAt) : null,
      deliveredAt: dto.deliveredAt ? new Date(dto.deliveredAt) : null,
    });

    return this.shipmentRepository.save(shipment);
  }

  // PUT mengubah shipment
  async update(id: string, dto: CreateShipmentDto) {
    const shipment = await this.findOne(id);

    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingShipment = await this.shipmentRepository.findOne({
      where: {
        order: {
          id: dto.orderId,
        },
      },
    });

    if (existingShipment && existingShipment.id !== id) {
      throw new ConflictException('Order sudah memiliki shipment');
    }

    shipment.order = order;
    shipment.courier = dto.courier;
    shipment.trackingNumber = dto.trackingNumber ?? null;
    shipment.status = dto.status;
    shipment.shippedAt = dto.shippedAt
      ? new Date(dto.shippedAt)
      : null;
    shipment.deliveredAt = dto.deliveredAt
      ? new Date(dto.deliveredAt)
      : null;

    return this.shipmentRepository.save(shipment);
  }

  // DELETE shipment
  async remove(id: string) {
    const shipment = await this.findOne(id);

    await this.shipmentRepository.remove(shipment);

    return {
      message: 'Shipment berhasil dihapus',
    };
  }
}