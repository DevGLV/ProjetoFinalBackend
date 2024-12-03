// src/express.d.ts

import { User } from './entities/User'; // Ajuste o caminho conforme necessário

declare global {
    namespace Express {
        interface Request {
            userId?: number; // Adiciona a propriedade userId
            user?: User; // Se você quiser armazenar um objeto de usuário completo
        }
    }
}
