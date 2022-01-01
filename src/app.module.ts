import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { PaymentService } from './payment/payment.service';
import { BikeModule } from './bike/bike.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, CreditCardModule, BikeModule],
  controllers: [AppController],
  providers: [PaymentService],
})
export class AppModule {}
