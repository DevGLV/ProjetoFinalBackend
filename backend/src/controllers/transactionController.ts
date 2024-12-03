// src/controllers/transactionController.ts

import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';

export class TransactionController {

    async create(req: Request, res: Response): Promise<void> {
        const { description, amount, type, date } = req.body; // Certifique-se de que todos os campos estão sendo recebidos
        const userId = req.userId;
    
        try {
            const transactionRepo = AppDataSource.getRepository(Transaction);
            const userRepo = AppDataSource.getRepository(User);
            
            const user = await userRepo.findOneBy({ id: userId });
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado.' });
                return;
            }
    
            const newTransaction = new Transaction();
            newTransaction.description = description;
            newTransaction.amount = amount;
            newTransaction.type = type;
            newTransaction.date = date ? new Date(date) : new Date(); // Usa a data fornecida ou define a data atual
            newTransaction.user = user;
    
            const savedTransaction = await transactionRepo.save(newTransaction);
            res.status(201).json({ id: savedTransaction.id });
        } catch (error) {
            console.error("Erro ao criar transação:", error);
            res.status(500).json({ message: 'Erro ao criar transação.' });
        }
    }
    

    async getAll(req: Request, res: Response): Promise<void> {
        const userId = req.userId; // Obtém o ID do usuário do token JWT
    
        try {
            const transactionRepo = AppDataSource.getRepository(Transaction);
            const transactions = await transactionRepo.find({
                where: { user: { id: userId } }, // Filtra transações pelo usuário
                relations: ['user'], // Inclui informações do usuário
            });
            res.json(transactions);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            res.status(500).json({ message: 'Erro ao buscar transações.' });
        }
    }
    

    async getOne(req: Request, res: Response): Promise<void> {
        const transactionId = parseInt(req.params.id); // Obtém o ID da transação a partir dos parâmetros da URL
        const userId = req.userId; // Obtém o ID do usuário do token JWT
    
        try {
            const transactionRepo = AppDataSource.getRepository(Transaction);
            const transaction = await transactionRepo.findOne({
                where: { id: transactionId, user: { id: userId } }, // Verifica se a transação pertence ao usuário
                relations: ['user'],
            });
    
            if (!transaction) {
                res.status(404).json({ message: 'Transação não encontrada.' });
                return;
            }
    
            res.json(transaction);
        } catch (error) {
            console.error("Erro ao buscar transação:", error);
            res.status(500).json({ message: 'Erro ao buscar transação.' });
        }
    }
    
    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // ID da transação a ser atualizada
        const { description, amount, date, type } = req.body;

        try {
            const transactionRepo = AppDataSource.getRepository(Transaction);
            let transactionToUpdate = await transactionRepo.findOneBy({ id: Number(id) });

            if (!transactionToUpdate) {
                res.status(404).json({ message: 'Transação não encontrada.' });
                return;
            }

            // Atualiza os campos da transação
            transactionToUpdate.description = description;
            transactionToUpdate.amount = amount;
            transactionToUpdate.date = date;
            transactionToUpdate.type = type;

            await transactionRepo.save(transactionToUpdate);
            res.status(200).json({ message: 'Transação atualizada com sucesso.' });
        } catch (error) {
            console.error("Erro ao atualizar transação:", error);
            res.status(500).json({ message: 'Erro ao atualizar transação.' });
        }
    }

     async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // ID da transação a ser excluída

        try {
            const transactionRepo = AppDataSource.getRepository(Transaction);
            let transactionToDelete = await transactionRepo.findOneBy({ id: Number(id) });

            if (!transactionToDelete) {
                res.status(404).json({ message: 'Transação não encontrada.' });
                return;
            }

             await transactionRepo.remove(transactionToDelete); // Remove a transação pelo ID
             res.status(204).send(); // No Content
         } catch (error) {
             console.error("Erro ao excluir transação:", error);
             res.status(500).json({ message: 'Erro ao excluir transação.' });
         }
     }
}
