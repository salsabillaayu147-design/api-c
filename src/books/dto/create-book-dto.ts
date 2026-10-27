import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Nama harus diisi' })
  readonly name: string;

  @IsNotEmpty({ message: 'Author harus diisi' })
  readonly author: string;
}