import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  IsDateString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Order ID wajib diisi' })
  orderId: string;

  @IsString()
  @IsNotEmpty({ message: 'Payment method wajib diisi' })
  @MaxLength(50)
  paymentMethod: string;

  @IsNumber()
  @Min(0, { message: 'Amount tidak boleh kurang dari 0' })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: 'Status wajib diisi' })
  @MaxLength(30)
  status: string;

  @IsOptional()
  @IsDateString()
  paidAt?: string;
}