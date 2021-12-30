import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CreditCardModule],
  controllers: [AppController],
  providers: [PaymentService],
})
export class AppModule {}
