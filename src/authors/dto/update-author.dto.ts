import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto.js';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}