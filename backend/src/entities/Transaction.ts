// src/entities/Transaction.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.transactions)
    user!: User; // Relacionamento com a entidade User

    @Column()
    description!: string;

    @Column('decimal')
    amount!: number;

    @Column()
    date!: Date; // Certifique-se de que esta coluna é do tipo Date

    @Column()
    type!: 'expense' | 'income'; // Tipo da transação (despesa ou entrada)
}
