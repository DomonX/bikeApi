import { Controller, Get } from '@nestjs/common';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
  constructor(private connection: Connection) {}

  @Get()
  public getHello(): string {
    return `${this.connection.isConnected}`;
  }
}
