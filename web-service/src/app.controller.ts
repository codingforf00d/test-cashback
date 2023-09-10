import { Controller, Get, Param } from '@nestjs/common';
import { TxnService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly txnService: TxnService) {}

  @Get('/user_balance')
  getUserBalance(
    @Param('user_id') user_id: string
  ) {
    return this.txnService.getUserBalance(user_id);
  }
}
