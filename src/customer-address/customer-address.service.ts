
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAddress } from './entities/customer-address.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Menampilkan semua alamat
  async findAll(): Promise<CustomerAddress[]> {
    return this.addressRepository.find({
      relations: { customer: true },
      order: { createdAt: 'DESC' },
    });
  }

  // Mengambil alamat berdasarkan ID
  async findOne(id: string): Promise<CustomerAddress> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: { customer: true },
    });

    if (!address) {
      throw new NotFoundException('Alamat pelanggan tidak ditemukan');
    }

    return address;
  }

  // Menambahkan alamat baru
  async create(dto: CreateCustomerAddressDto): Promise<CustomerAddress> {
    const customer = await this.customerRepository.findOneBy({
      id: dto.customerId,
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    const { customerId, ...addressData } = dto;

    const newAddress = this.addressRepository.create({
      ...addressData,
      customer,
    });

    return this.addressRepository.save(newAddress);
  }

  // Mengupdate alamat
  async update(
    id: string,
    dto: CreateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const existingAddress = await this.findOne(id);

    const customer = await this.customerRepository.findOneBy({
      id: dto.customerId,
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    const { customerId, ...addressData } = dto;

    const updatedAddress = this.addressRepository.merge(
      existingAddress,
      {
        ...addressData,
        customer,
      },
    );

    return this.addressRepository.save(updatedAddress);
  }

  // Menghapus alamat
  async delete(id: string): Promise<{ message: string }> {
    const address = await this.findOne(id);

    await this.addressRepository.remove(address);

    return {
      message: 'Alamat pelanggan berhasil dihapus',
    };
  }
}
