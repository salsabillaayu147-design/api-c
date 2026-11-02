import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookAuthor } from './entities/book-author.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { Author } from '../authors/entities/author.entity.js';
import { CreateBookAuthorDto } from './dto/create-book-author.dto.js';

@Injectable()
export class BookAuthorsService {
  constructor(
    @InjectRepository(BookAuthor)
    private readonly bookAuthorRepository: Repository<BookAuthor>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll() {
    return this.bookAuthorRepository.find({
      relations: { book: true, author: true },
    });
  }

  async findOne(bookId: string, authorId: string) {
    const data = await this.bookAuthorRepository.findOne({
      where: { bookId, authorId },
      relations: { book: true, author: true },
    });

    if (!data) {
      throw new NotFoundException('Relasi buku dan penulis tidak ditemukan');
    }

    return data;
  }

  async create(dto: CreateBookAuthorDto) {
    const book = await this.bookRepository.findOneBy({
      id: dto.bookId,
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    const author = await this.authorRepository.findOneBy({
      id: dto.authorId,
    });

    if (!author) {
      throw new NotFoundException('Penulis tidak ditemukan');
    }

    const existing = await this.bookAuthorRepository.findOneBy({
      bookId: dto.bookId,
      authorId: dto.authorId,
    });

    if (existing) {
      throw new ConflictException('Relasi buku dan penulis sudah ada');
    }

    const newData = this.bookAuthorRepository.create({
      bookId: dto.bookId,
      authorId: dto.authorId,
      book,
      author,
    });

    return this.bookAuthorRepository.save(newData);
  }

  async update(
    bookId: string,
    authorId: string,
    dto: CreateBookAuthorDto,
  ) {
    const existing = await this.findOne(bookId, authorId);

    const book = await this.bookRepository.findOneBy({
      id: dto.bookId,
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    const author = await this.authorRepository.findOneBy({
      id: dto.authorId,
    });

    if (!author) {
      throw new NotFoundException('Penulis tidak ditemukan');
    }

    if (dto.bookId !== bookId || dto.authorId !== authorId) {
      const duplicate = await this.bookAuthorRepository.findOneBy({
        bookId: dto.bookId,
        authorId: dto.authorId,
      });

      if (duplicate) {
        throw new ConflictException('Relasi buku dan penulis sudah ada');
      }
    }

    await this.bookAuthorRepository.remove(existing);

    const updated = this.bookAuthorRepository.create({
      bookId: dto.bookId,
      authorId: dto.authorId,
      book,
      author,
    });

    return this.bookAuthorRepository.save(updated);
  }

  async delete(bookId: string, authorId: string) {
    const data = await this.findOne(bookId, authorId);

    await this.bookAuthorRepository.remove(data);

    return { message: 'Relasi buku dan penulis berhasil dihapus' };
  }
}