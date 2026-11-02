
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll() {
    return this.authorRepository.find();
  }

  async create(body: Partial<Author>) {
    const author = this.authorRepository.create(body);
    return this.authorRepository.save(author);
  }
}
