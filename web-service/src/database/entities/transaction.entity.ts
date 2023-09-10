import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Index, Unique } from "typeorm"
import { User } from "./user.entity"

@Entity('transactions')
@Unique('txn_id_uniq_idx', ['transactionId'])
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    payer: string;

    @Column("integer")
    points: number;

    @CreateDateColumn({
        type: 'timestamp',
      })
    timestamp: Date;

    @Column("varchar", {
        name: 'transaction_id'
    })
    transactionId: string;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}