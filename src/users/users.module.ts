import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserController } from './user.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController, UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
