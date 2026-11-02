import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateShipmentDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Order ID wajib diisi' })
  orderId: string;

  @IsString()
  @IsNotEmpty({ message: 'Courier wajib diisi' })
  @MaxLength(100)
  courier: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  trackingNumber?: string;

  @IsString()
  @IsNotEmpty({ message: 'Status wajib diisi' })
  @MaxLength(30)
  status: string;

  @IsOptional()
  @IsDateString()
  shippedAt?: string;

  @IsOptional()
  @IsDateString()
  deliveredAt?: string;
}