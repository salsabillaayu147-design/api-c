import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';


// Module untuk fitur authentication
@Module({
  controllers: [AuthController],
})
export class AuthModule {}