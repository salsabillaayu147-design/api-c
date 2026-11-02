import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { BookAuthorsService } from './book-authors.service.js';
import { CreateBookAuthorDto } from './dto/create-book-author.dto.js';

@Controller('book-authors')
export class BookAuthorsController {
  constructor(private readonly bookAuthorsService: BookAuthorsService) {}

  @Get()
  findAll() {
    return this.bookAuthorsService.findAll();
  }

  @Get(':bookId/:authorId')
  findOne(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookAuthorsService.findOne(bookId, authorId);
  }

  @Post()
  create(@Body() dto: CreateBookAuthorDto) {
    return this.bookAuthorsService.create(dto);
  }

  @Put(':bookId/:authorId')
  update(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
    @Body() dto: CreateBookAuthorDto,
  ) {
    return this.bookAuthorsService.update(bookId, authorId, dto);
  }

  @Delete(':bookId/:authorId')
  delete(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookAuthorsService.delete(bookId, authorId);
  }
}