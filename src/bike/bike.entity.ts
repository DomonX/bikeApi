import { User } from 'src/user/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity(Bike.name)
export class Bike {
    @PrimaryGeneratedColumn() id: string;
    @OneToMany(() => Reservation, (reservation) => reservation.bike)
    reservations: Reservation[];
}

@Entity(Reservation.name)
export class Reservation {
    @PrimaryGeneratedColumn() id: string;
    @ManyToOne(() => Bike, (bike) => bike.reservations) bike: Bike;
    @ManyToOne(() => User, (user) => user.reservations) user: User;

}