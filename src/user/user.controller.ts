import { Reservation } from './../bike/bike.entity';
import { PaymentService } from './../payment/payment.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from 'src/credit-card/credit-card.entity';
import { UserAccount } from 'src/user/user-account.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
  @InjectRepository(User) private repository: Repository<User>, 
  @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
  private paymentService: PaymentService) {}

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
    return this.repository
      .createQueryBuilder('user')
      .leftJoin(UserAccount, 'account', 'user.accountId = account.id')
      .select(['account.*', 'user.*'])
      .whereInIds(id)
      .execute();
  }

  @Get(':id/reservations')
  public getReservations(@Param('id') id: string): Promise<Reservation[]> {
    return this.reservationRepository
      .createQueryBuilder('reservation')
      .where(`reservation.userId = ${id}`)
      .select(['*'])
      .execute()
  }

  
  @Get(':id/reservations/:status')
  public getReservationsWithStatus(@Param('id') id: string, @Param('status') status: string): Promise<Reservation[]> {    
    return this.reservationRepository
      .createQueryBuilder('reservation')
      .where(`reservation.userId = ${id}`).andWhere(`reservation.isActive = ${status === 'inactive' ? false : true }`)
      .select(['*'])
      .execute()
  }

  @Post()
  public addUser(@Body() data: User): Promise<User> {
    return this.repository.save(data);
  }

  @Patch('addCard')
  public async addCard(
    @Body('userId') userId: number,
    @Body('card') card: CreditCard,
  ): Promise<any> {
    const user = await this.repository.findOne(userId);
    return this.repository.save({...user, cards: [...user.cards, card]});
  }

  @Post('payment')
  public async processPayment(
    @Body('amount') amount: number,
    @Body('cardId') cardId: number,
  ): Promise<boolean> {
    const query = this.repository
      .createQueryBuilder('user')
      .leftJoin(CreditCard, 'card', 'card.userId = user.id')
      .where(`card.id = ${cardId}`)
      .select(['card.*']);
    const cards: CreditCard[] = await query.execute();

    if(cards.length) {
      return this.paymentService.processPayment(cards[0], amount);
    }
  }
}
