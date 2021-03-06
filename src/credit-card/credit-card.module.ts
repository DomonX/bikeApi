import { CreditCard } from './credit-card.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports: [TypeOrmModule.forFeature([CreditCard])] })
export class CreditCardModule {}
