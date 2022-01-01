import { Bike, Reservation } from './bike.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({ imports: [TypeOrmModule.forFeature([Bike, Reservation])]})
export class BikeModule {}
