
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCustomerAddressDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Customer ID wajib diisi' })
  customerId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama penerima wajib diisi' })
  @MaxLength(150)
  recipientName: string;

  @IsString()
  @IsNotEmpty({ message: 'Nomor telepon wajib diisi' })
  @MaxLength(20)
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Alamat wajib diisi' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'Kota wajib diisi' })
  @MaxLength(100)
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'Kode pos wajib diisi' })
  @MaxLength(10)
  postalCode: string;
}