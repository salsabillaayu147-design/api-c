
import {
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookAuthorDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Book ID wajib diisi' })
  bookId: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Author ID wajib diisi' })
  authorId: string;
}