// src/database/db.ts

import { AppDataSource } from './data-source';

// Função para inicializar o banco de dados
export const initDb = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Banco de dados inicializado');
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
        throw error; // Lança o erro para ser tratado onde for chamado
    }
};
