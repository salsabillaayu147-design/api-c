
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { CustomerAddressService } from './customer-address.service.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';

@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly addressService: CustomerAddressService,
  ) {}

  // Menampilkan semua alamat
  @Get()
  getAllAddresses() {
    return this.addressService.findAll();
  }

  // Mengambil alamat berdasarkan ID
  @Get(':id')
  getAddressById(@Param('id') id: string) {
    return this.addressService.findOne(id);
  }

  // Menambahkan alamat
  @Post()
  createAddress(@Body() dto: CreateCustomerAddressDto) {
    return this.addressService.create(dto);
  }

  // Mengupdate alamat
  @Put(':id')
  updateAddress(
    @Param('id') id: string,
    @Body() dto: CreateCustomerAddressDto,
  ) {
    return this.addressService.update(id, dto);
  }

  // Menghapus alamat
  @Delete(':id')
  deleteAddress(@Param('id') id: string) {
    return this.addressService.delete(id);
  }
}
