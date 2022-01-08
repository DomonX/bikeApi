import { User } from './../user/user.entity';
import { Bike, Reservation } from './bike.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BikeController } from './bike.controller';

@Module({ imports: [TypeOrmModule.forFeature([Bike, Reservation, User])], controllers: [BikeController]})
export class BikeModule {}
