import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { Book } from './entitas/book-entity.js';

import { BookService } from './books.service.js';

import { CreateBookDto } from './dto/create-book-dto.js';

// Controller untuk mengatur data buku
@Controller('books')
export class BooksController {

  // Memanggil BookService
  constructor(private readonly bookService: BookService) {}

  // Mengambil semua data buku
  // GET /books
  @Get()
  getAllBooks(): Book[] {
    return this.bookService.getAllBooks();
  }

  // Mengambil satu buku berdasarkan ID
  // GET /books/:id
  @Get(':id')
  getBookById(@Param('id') id: string): Book | undefined {
    return this.bookService.findOne(Number(id));
  }

  // Menambahkan buku baru
  // POST /books
  @Post()
  createBook(@Body() book: CreateBookDto) {
    return this.bookService.create(book);
  }

  // Mengubah data buku berdasarkan ID
  // PUT /books/:id
  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() book: CreateBookDto,
  ) {
    return this.bookService.update(Number(id), book);
  }

  // Menghapus data buku berdasarkan ID
  // DELETE /books/:id
  @Delete(':id')
  deleteBook(@Param('id') id: string): Book | undefined {
    return this.bookService.remove(Number(id));
  }
}