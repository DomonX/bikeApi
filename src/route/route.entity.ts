import { RouteCheckpoint } from './route-checkpoint.entity';
import { User } from "src/user/user.entity";
import {  Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity(Route.name)
export class Route {
    @PrimaryGeneratedColumn() id: number;

    @ManyToOne(() => User, (user) => user.routes)
    user: User;

    @OneToMany(() => RouteCheckpoint, (checkpoint) => checkpoint.route)
    checkpoints: RouteCheckpoint;

}