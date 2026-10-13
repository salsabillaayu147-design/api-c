import { Test } from '@nestjs/testing';
import { AppModule } from './app.module.js';
import { AppController } from './app.controller.js';
import { BooksController } from './books/books.controller.js';

describe('AppModule', () => {
  it('should register the main and books controllers', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(moduleRef.get(AppController)).toBeInstanceOf(AppController);
    expect(moduleRef.get(BooksController)).toBeInstanceOf(BooksController);
  });
});
