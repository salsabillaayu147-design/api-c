import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book-dto.js';
import { Book } from './entitas/book-entity.js';

@Injectable()
export class BookService {
  private readonly books: Book[] = [
    {
      id: 1,
      name: 'buku 1',
      author: 'Author 1',
      isbn: '123-4-56-789-0',
      publishedYear: 2020,
      isAvailable: true,
    },
    {
      id: 2,
      name: 'buku 2',
      author: 'Author 2',
      isbn: '098-7-65-432-1',
      publishedYear: 2021,
      isAvailable: true,
    },
  ];

  getAllBooks(): Book[] {
    return this.books;
  }

  findOne(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(book: CreateBookDto): Book {
    const newBook: Book = {
      id: this.books.length + 1,
      name: book.name,
      author: book.author,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      isAvailable: true,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, book: CreateBookDto): Book | undefined {
    const index = this.books.findIndex((existingBook) => existingBook.id === id);
    if (index === -1) {
      return undefined;
    }

    const existingBook = this.books[index];
    existingBook.name = book.name;
    existingBook.author = book.author;
    existingBook.isbn = book.isbn;
    existingBook.publishedYear = book.publishedYear;
    return existingBook;
  }

  remove(id: number): Book | undefined {
    const index = this.books.findIndex((existingBook) => existingBook.id === id);
    if (index === -1) {
      return undefined;
    }

    const [deletedBook] = this.books.splice(index, 1);
    return deletedBook;
  }
}