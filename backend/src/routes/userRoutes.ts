// src/routes/userRoutes.ts

import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userController = new UserController(); // Certifique-se de que isso está correto

// Rota para criar um novo usuário
router.post('/', userController.create.bind(userController)); // Adicione .bind() para garantir o contexto

// Rota para obter todos os usuários
router.get('/', userController.getAll.bind(userController)); // Adicione .bind() para garantir o contexto

// Rota para login
router.post('/login', userController.login.bind(userController)); // Adicione .bind() para garantir o contexto

export default router;
