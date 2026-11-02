import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Nama kategori harus berupa teks' })
  @IsNotEmpty({ message: 'Nama kategori wajib diisi' })
  @MaxLength(100, {
    message: 'Nama kategori maksimal 100 karakter',
  })
  name: string;
}