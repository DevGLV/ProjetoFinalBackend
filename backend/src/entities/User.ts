// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string; // Em uma aplicação real, nunca armazene senhas em texto claro

    @OneToMany(() => Transaction, transaction => transaction.user)
    transactions!: Transaction[];
}
