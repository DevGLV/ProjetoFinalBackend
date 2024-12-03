// src/routes/transactionRoutes.ts

import express from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const transactionController = new TransactionController();

// Rota para criar uma nova transação (protegida)
router.post('/', authMiddleware, transactionController.create.bind(transactionController));

// Rota para obter todas as transações do usuário (protegida)
router.get('/', authMiddleware, transactionController.getAll.bind(transactionController));

// Rota para obter uma transação específica (protegida)
router.get('/:id', authMiddleware, transactionController.getOne.bind(transactionController));

// Rota para editar uma transação específica (protegida)
router.put('/:id', authMiddleware, transactionController.update.bind(transactionController));

// Rota para excluir uma transação específica (protegida)
router.delete('/:id', authMiddleware, transactionController.delete.bind(transactionController));

export default router;
