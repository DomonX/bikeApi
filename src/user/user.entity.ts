import { Reservation } from './../bike/bike.entity';
import { Route } from './../route/route.entity';
import { CreditCard } from '../credit-card/credit-card.entity';
import { UserAccount } from './user-account.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(User.name)
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() firstName: string;

  @Column() lastName: string;

  @OneToOne(() => UserAccount, (account) => account.user, { cascade: true })
  account: UserAccount;

  @OneToMany(() => CreditCard, (card) => card.user, { cascade: true, eager: true })
  cards: CreditCard[];

  @OneToMany(() => Route, (route) => route.user)
  routes: Route[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
