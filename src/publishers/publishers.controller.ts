
import { Body, Controller, Get, Post } from '@nestjs/common';
import { PublishersService } from './publishers.service.js';

@Controller('publishers')
export class PublishersController {
  constructor(
    private readonly publishersService: PublishersService,
  ) {}

  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.publishersService.create(body);
  }
}
