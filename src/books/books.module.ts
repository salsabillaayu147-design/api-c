import { Module } from '@nestjs/common';

import { BooksController } from './books.controller.js';

import { BookService } from './books.service.js';

@Module({
  controllers: [BooksController],
  providers: [BookService],
})
export class BooksModule {}