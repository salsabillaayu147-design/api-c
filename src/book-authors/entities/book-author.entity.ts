
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import { Book } from '../../books/entities/book.entity.js';
import { Author } from '../../authors/entities/author.entity.js';

@Entity('book_authors')
export class BookAuthor {
  @PrimaryColumn({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @PrimaryColumn({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @ManyToOne(() => Book, (book) => book.bookAuthors)
  @JoinColumn({ name: 'book_id' })
  book: Relation<Book>;

  @ManyToOne(() => Author, (author) => author.bookAuthors)
  @JoinColumn({ name: 'author_id' })
  author: Relation<Author>;
}