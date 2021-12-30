import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity(CreditCard.name, { synchronize: false })
export class CreditCard {
  @PrimaryGeneratedColumn() id: number;
  @Column() cardNumber: number;
  @Column() expirationDate: string;
  @Column() ccv: number;

  @ManyToOne(() => User, (user) => user.cards)
  user: User;
}
