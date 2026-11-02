
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama publisher wajib diisi' })
  @MaxLength(150)
  name: string;
}