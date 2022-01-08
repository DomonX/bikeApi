import { User } from './../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike, Reservation } from './bike.entity';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';

@Controller('bike')
export class BikeController {

    constructor(
        @InjectRepository(Bike) private bikeRepository: Repository<Bike>,
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
        @InjectRepository(User) private userRepository: Repository<User>,
        ) {}

    @Post()
    public addBike(@Body() data: Bike): Promise<Bike> {
        return this.bikeRepository.save(data);
    }

    @Post(':id/reserve')
    public async reserveBike(@Body('id') id: number, @Body('userId') userId: number): Promise<unknown> {
        const bike = await this.bikeRepository.findOne(id);
        const user = await this.userRepository.findOne(userId);
        const activeReservations: Reservation[] = await this.reservationRepository
            .createQueryBuilder('reservation')
            .where(`reservation.bikeId = ${id}`).andWhere('reservation.isActive = true')
            .select(['*'])
            .execute();
        if(activeReservations.length === 0) {
            return this.reservationRepository.save({ isActive: true, bike, user });
        } else {
            throw new BadRequestException('Bike is reserved already');
        }
    }

    @Post(':id/unreserve')
    public async unreserve(@Body('id') id: number): Promise<unknown> {
        const activeReservations: Reservation[] = await this.reservationRepository
            .createQueryBuilder('reservation')
            .where(`reservation.bikeId = ${id}`).andWhere('reservation.isActive = true')
            .select(['*'])
            .execute();

        if(activeReservations.length >= 1) {
            return this.reservationRepository.save(activeReservations.map(i => ({ ...i, isActive: false })));
        } else {
            throw new BadRequestException('Bike is not reserved');
        }        
    }
}
