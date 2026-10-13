import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { BooksModule } from './books/books.module.js';

@Module({
  imports: [AuthModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}