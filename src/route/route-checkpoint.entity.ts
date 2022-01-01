import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Route } from './route.entity';
@Entity(RouteCheckpoint.name)
export class RouteCheckpoint {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => Route, (route) => route.checkpoints)
    route: Route;

    @Column()
    latitude: number;

    @Column()
    longtitude: number;

}