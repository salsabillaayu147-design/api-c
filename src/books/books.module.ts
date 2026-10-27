import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { DiscountsModule } from '../discounts/discounts.module.js';
import { Book } from './book.entity.js';

@Module({
  imports: [
    DiscountsModule,
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: 'PENALTY_CALCULATOR',
      useFactory: () => {
        const standardRatePerDay = 2500;

        return {
          calculate: (daysLate: number) =>
            daysLate * standardRatePerDay,
          dailyRate: standardRatePerDay,
        };
      },
    },
  ],
  exports: [BooksService],
})
export class BooksModule {}