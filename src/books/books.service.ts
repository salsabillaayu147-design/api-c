
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create-book-dto.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Menampilkan semua buku, termasuk yang soft-deleted
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      withDeleted: true,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // Mengecek buku berdasarkan ISBN, termasuk yang soft-deleted
  async checkIsbn(isbn: string) {
    return this.bookRepository.find({
      where: { isbn },
      withDeleted: true,
    });
  }

  // Mengambil buku berdasarkan ID
  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    return book;
  }

  // Menambahkan buku baru
  async create(book: CreateBookDto): Promise<Book> {
    const { categoryId, publisherId, ...bookData } = book;

    const newBook = this.bookRepository.create({
      ...bookData,
      category: { id: categoryId },
      publisher: { id: publisherId },
    });

    return await this.bookRepository.save(newBook);
  }

  // Mengupdate buku
  async update(
    id: string,
    book: CreateBookDto,
  ): Promise<Book> {
    const existingBook = await this.findOne(id);

    const { categoryId, publisherId, ...bookData } = book;

    const updatedBook = this.bookRepository.merge(
      existingBook,
      {
        ...bookData,
        category: { id: categoryId },
        publisher: { id: publisherId },
      },
    );

    return await this.bookRepository.save(updatedBook);
  }

  // Menghapus buku
  async delete(
    id: string,
  ): Promise<{ message: string; deletedId: string }> {
    await this.findOne(id);
    await this.bookRepository.softDelete(id);

    return {
      message: 'Buku berhasil dihapus',
      deletedId: id,
    };
  }
    async restore(id: string): Promise<Book> {
    await this.bookRepository.restore(id);
    return this.findOne(id);
  }

}
