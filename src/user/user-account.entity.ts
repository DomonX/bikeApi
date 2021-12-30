import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity(UserAccount.name, { synchronize: false })
export class UserAccount {
  @PrimaryGeneratedColumn() id: string;
  @Column() weight: number;
  @Column() height: number;
  @Column() points: number;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
