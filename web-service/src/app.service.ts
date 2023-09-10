import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from './database';

@Injectable()
export class TxnService {
  private txnRepo: Repository<Transaction>;
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource
  ) {
    this.txnRepo = this.dataSource.getRepository(Transaction);
  }

  async getUserBalance(userId: string | number, fromDate?: number, toDate?: number, limit: number = 100, offset: number = 0) {
    const qb = this.txnRepo.createQueryBuilder();

    qb.select('payer, sum(points)');

    qb.where('user_id = :userId', {userId});

    if (fromDate != null) {
      qb.andWhere('timestamp >= :fromDate', {fromDate});
    }

    if (toDate != null) {
      qb.andWhere('timestamp <= :toDate', {toDate});
    }

    qb.groupBy('payer');
    qb.limit(limit);
    qb.offset(offset);

    return qb.getMany();
  }

  async getBalances(fromDate?: number, toDate?: number, limit: number = 100, offset: number = 0) {
    const qb = this.txnRepo.createQueryBuilder();

    qb.select('payer, sum(points), user_id');

    if (fromDate != null) {
      qb.andWhere('timestamp >= :fromDate', {fromDate});
    }

    if (toDate != null) {
      qb.andWhere('timestamp <= :toDate', {toDate});
    }

    qb.groupBy('payer, user_id');
    qb.limit(limit);
    qb.offset(offset);

    return qb.getMany();
  }

  async saveTransaction(transaction: Transaction) {
    await this.txnRepo.insert(transaction);
    return transaction;
  }

  async spendBonuses(userId: number, amount: number) {
    
  }

}
