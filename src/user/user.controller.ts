import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { UserAccount } from 'src/user/user-account.entity';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  @Get()
  public get(): Promise<User[]> {
    return this.repository
      .createQueryBuilder('user')
      .leftJoin(UserAccount, 'account', 'user.accountId = account.id')
      .select(['account.*', 'user.*'])
      .execute();
  }

  @Get(':id')
  public getById(@Param('id') id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  @Post()
  public addUser(@Body() data: User): Promise<User> {
    return this.repository.save(data);
  }

  // Move to credit card service
  // @Patch('addCard')
  // public addCard(
  //   @Body('userId') userId: number,
  //   @Body('card') card: CreditCard,
  // ): Promise<any> {
  //   const user: DeepPartial<User> = { id: userId, cards: [card] };
  //   return this.repository.save(user);
  // }

  // @Post('payment')
  // public processPayment(
  //   @Body('amount') amount: number,
  //   @Body('cardId') cardId: number,
  // ): Promise<boolean> {

  //   return of();
  // }
}
