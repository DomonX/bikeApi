import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './user-account.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, UserAccount])],
})
export class UserModule {}
