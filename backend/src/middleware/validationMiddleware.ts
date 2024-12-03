// src/middleware/validationMiddleware.ts

import { Request, Response, NextFunction } from 'express';

// Middleware para validar a criação de um usuário
export const validateUserCreation = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos (username, email, password) são obrigatórios.' });
    }

    // Verifica se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email inválido.' });
    }

    // Se tudo estiver correto, chama o próximo middleware ou controlador
    next();
};

// Middleware para validar a criação de uma transação
export const validateTransactionCreation = (req: Request, res: Response, next: NextFunction) => {
    const { userId, description, amount, date, type } = req.body;

    // Verifica se todos os campos necessários estão presentes
    if (!userId || !description || amount === undefined || !date || !type) {
        return res.status(400).json({ message: 'Todos os campos (userId, description, amount, date, type) são obrigatórios.' });
    }

    // Verifica se o tipo é válido
    const validTypes = ['expense', 'income', 'company'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: 'Tipo inválido. Deve ser "expense", "income" ou "company".' });
    }

    // Se tudo estiver correto, chama o próximo middleware ou controlador
    next();
};
