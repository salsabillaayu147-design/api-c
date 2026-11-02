
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsUUID,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Title wajib diisi' })
  @MaxLength(30)
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'ISBN wajib diisi' })
  @MaxLength(45)
  readonly isbn: string;

  @IsInt({ message: 'Published year harus berupa bilangan bulat' })
  @Min(0)
  readonly publishedYear: number;

  @IsUUID()
  readonly categoryId: string;

  @IsUUID()
  readonly publisherId: string;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsInt()
  @Min(0)
  readonly stock: number;
}