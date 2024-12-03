// src/models/transactionModel.ts

export interface Transaction {
    id: number;              // ID da transação
    userId: number;         // ID do usuário associado à transação
    description: string;     // Descrição da transação
    amount: number;          // Valor da transação
    date: string;            // Data da transação
    type: 'expense' | 'income' | 'company'; // Tipo da transação
}

export class TransactionModel implements Transaction {
    id: number;
    userId: number;
    description: string;
    amount: number;
    date: string;
    type: 'expense' | 'income' | 'company';

    constructor(id: number, userId: number, description: string, amount: number, date: string, type: 'expense' | 'income' | 'company') {
        this.id = id;
        this.userId = userId;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = type;
    }

    // Você pode adicionar métodos relacionados à transação aqui, se necessário
}
