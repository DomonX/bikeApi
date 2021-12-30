import { CreditCard } from '../credit-card/credit-card.entity';
import { UserAccount } from './user-account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(User.name, { synchronize: false })
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() firstName: string;

  @Column() lastName: string;

  @OneToOne(() => UserAccount, (account) => account.user, { cascade: true })
  @JoinColumn({ name: 'accountId' })
  account: UserAccount;

  @OneToMany(() => CreditCard, (card) => card.user, { cascade: true })
  cards: CreditCard[];
}
