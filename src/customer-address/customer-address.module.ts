
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressController } from './customer-address.controller.js';
import { CustomerAddressService } from './customer-address.service.js';
import { CustomerAddress } from './entities/customer-address.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAddress, Customer]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
  exports: [CustomerAddressService],
})
export class CustomerAddressModule {}