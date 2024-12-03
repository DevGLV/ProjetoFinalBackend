// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extensão da interface Request do Express
declare global {
    namespace Express {
        interface Request {
            userId?: number; // Adiciona a propriedade userId
        }
    }
}

interface JwtPayload {
    id: number; // ou string, dependendo de como você está gerando o ID
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token do cabeçalho Authorization

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.userId = (decoded as JwtPayload).id; // Acessa o ID do usuário decodificado
        } else {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        next(); // Chama o próximo middleware ou rota
    });
};
