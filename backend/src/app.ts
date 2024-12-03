// src/app.ts

import express from 'express';
import cors from 'cors';
import { initDb } from './database/db'; // Importando a função initDb
import userRoutes from './routes/userRoutes'; // Importando rotas de usuário
import transactionRoutes from './routes/transactionRoutes'; // Importando rotas de transação
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta definida no .env ou 3000 como padrão

// Middleware para permitir JSON no corpo das requisições e CORS.
app.use(cors());
app.use(express.json());

// Usando as rotas importadas.
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Inicializa o banco de dados e inicia o servidor.
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
     console.error('Erro ao inicializar o banco de dados:', error);
});
