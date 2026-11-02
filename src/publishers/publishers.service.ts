
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async findAll() {
    return this.publisherRepository.find();
  }

  async create(body: Partial<Publisher>) {
    const publisher = this.publisherRepository.create(body);
    return this.publisherRepository.save(publisher);
  }
}
