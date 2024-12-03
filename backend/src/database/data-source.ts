// src/database/data-source.ts

import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Transaction],
    synchronize: true,
});
