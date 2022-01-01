import { CreditCard } from 'src/credit-card/credit-card.entity';
import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class PaymentService {
  data = {};
  
  public processPayment(card: CreditCard, amount: number): Promise<boolean> {    
    if(!this.data[card.cardNumber]) {
      this.data[card.cardNumber] = Math.random() * 10000;
    }

    if(this.data[card.cardNumber] >= amount) {
      this.data[card.cardNumber] -= amount;
      return of(true).toPromise();
    }
    return of(false).toPromise();
  }
}
