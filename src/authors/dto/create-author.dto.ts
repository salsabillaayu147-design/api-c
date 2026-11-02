
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama author wajib diisi' })
  @MaxLength(150)
  name: string;
}