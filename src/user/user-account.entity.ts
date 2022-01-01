import { BikeType } from './../shared/enums';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity(UserAccount.name)
export class UserAccount {
  @PrimaryGeneratedColumn() id: string;
  @Column() weight: number;
  @Column() height: number;
  @Column() points: number;
  @Column({type: 'enum', enum: Object.values(BikeType), nullable: true}) preferedType: BikeType;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
