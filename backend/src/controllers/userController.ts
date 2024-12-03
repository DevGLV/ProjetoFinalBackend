// src/controllers/userController.ts
import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env


import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    private jwtSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Carrega o segredo do JWT
        console.log("JWT Secret:", this.jwtSecret); // Log para verificar o valor
    }    
    

    async create(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;

        try {
            const userRepo = AppDataSource.getRepository(User);

            // Verifica se o e-mail já está cadastrado
            const existingUser = await userRepo.findOne({ where: { email } });
            if (existingUser) {
                res.status(400).json({ message: 'Usuário já cadastrado com este e-mail.' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10); // Hash a senha

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = hashedPassword; // Armazena a senha hash

            const savedUser = await userRepo.save(newUser);
            res.status(201).json({ id: savedUser.id });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ message: 'Erro ao criar usuário.' });
        }
    }


    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
    
        try {
            const userRepo = AppDataSource.getRepository(User);
            console.log("Buscando usuário com email:", email); // Log para verificar o email
    
            const user = await userRepo.findOneBy({ email });
    
            if (!user) {
                console.error("Usuário não encontrado."); // Log se o usuário não for encontrado
                res.status(401).json({ message: 'Credenciais inválidas.' });
                return;
            }
    
            console.log("Verificando senha para usuário:", user.username); // Log para verificar o usuário
    
            if (!(await bcrypt.compare(password, user.password))) { // Verifica a senha
                console.error("Senha inválida."); // Log se a senha não corresponder
                res.status(401).json({ message: 'Credenciais inválidas.' });
                return;
            }
    
            // Gera um token JWT
            const token = jwt.sign({ id: user.id }, this.jwtSecret, { expiresIn: '1h' });
    
            // Retorna o token junto com a mensagem de sucesso
            res.status(200).json({ message: 'Login bem-sucedido', token }); // Aqui estamos retornando o token
        } catch (error) {
            console.error("Erro ao fazer login:", error); // Log detalhado do erro
            res.status(500).json({ message: 'Erro ao fazer login.' });
        }
    }
    
    

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const userRepo = AppDataSource.getRepository(User);
            const users = await userRepo.find();
            res.json(users);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            res.status(500).json({ message: 'Erro ao buscar usuários.' });
        }
    }
}
