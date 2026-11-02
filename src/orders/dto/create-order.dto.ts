import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Customer ID wajib diisi' })
  customerId: string;

  @IsString()
  @IsNotEmpty({ message: 'Order number wajib diisi' })
  @MaxLength(50)
  orderNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Status wajib diisi' })
  @MaxLength(30)
  status: string;

  @IsNumber()
  @Min(0, { message: 'Total amount tidak boleh kurang dari 0' })
  totalAmount: number;
}