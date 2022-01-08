import { BikeType } from 'src/shared/enums';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity(Bike.name)
export class Bike {
    @PrimaryGeneratedColumn() id: string;
    @OneToMany(() => Reservation, (reservation) => reservation.bike) reservations: Reservation[];
    @Column({ type: 'enum', enum: Object.keys(BikeType)}) type: BikeType;
}

@Entity(Reservation.name)
export class Reservation {
    @PrimaryGeneratedColumn() id: string;
    @ManyToOne(() => Bike, (bike) => bike.reservations) bike: Bike;
    @ManyToOne(() => User, (user) => user.reservations) user: User;
    @Column() public isActive: boolean;

}