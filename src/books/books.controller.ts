
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  // Menampilkan semua buku
  @Get()
  getAllBooks() {
    return this.bookService.findAll();
  }

  // Mengecek buku berdasarkan ISBN
  @Get('check-isbn/:isbn')
  checkBookByIsbn(@Param('isbn') isbn: string) {
    return this.bookService.checkIsbn(isbn);
  }
  @Put('restore/:id')
  restoreBook(@Param('id') id: string) {
    return this.bookService.restore(id);
  }
  // Mengambil buku berdasarkan ID
  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  // Menambahkan buku baru
  @Post()
  createBook(@Body() book: CreateBookDto) {
    return this.bookService.create(book);
  }

  // Mengupdate buku berdasarkan ID
  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() book: CreateBookDto,
  ) {
    return this.bookService.update(id, book);
  }

  // Menghapus buku berdasarkan ID
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
