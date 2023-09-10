import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Transaction } from "./transaction.entity"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @OneToMany(() => Transaction, (txn) => txn.user)
    transactions?: Transaction[];

}