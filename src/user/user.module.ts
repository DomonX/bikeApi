import { RouteCheckpoint } from './../route/route-checkpoint.entity';
import { PaymentService } from './../payment/payment.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './user-account.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Route } from 'src/route/route.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User, UserAccount, Route, RouteCheckpoint])],
  providers: [PaymentService]
})
export class UserModule {}
