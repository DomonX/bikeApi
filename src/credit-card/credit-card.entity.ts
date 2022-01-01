import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity(CreditCard.name)
export class CreditCard {
  @PrimaryGeneratedColumn() id: number;
  @Column() cardNumber: number;
  @Column() expirationDate: string;
  @Column() ccv: number;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn( { name: 'userId'})
  user: User;
}
