// src/models/userModel.ts

export interface User {
    id: number;          // ID do usuário
    username: string;   // Nome de usuário
    email: string;      // Email do usuário
    password: string;   // Senha do usuário (armazenada como hash)
}

export class UserModel implements User {
    id: number;
    username: string;
    email: string;
    password: string;

    constructor(id: number, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Você pode adicionar métodos relacionados ao usuário aqui, se necessário
}
