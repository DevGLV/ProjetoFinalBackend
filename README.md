# Controle de Finanças

Um aplicativo de controle financeiro que permite aos usuários registrar, editar e excluir transações financeiras. O aplicativo é construído usando React para o frontend e uma API RESTful para o backend.

## 📋 Funcionalidades

- Registro de usuários com validação de e-mail único.
- Login de usuários.
- Criação, edição e exclusão de transações financeiras.
- Visualização de uma lista de transações.
- Mensagens de feedback para ações bem-sucedidas ou erros.

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React**: Interface de usuário.
- **TypeScript**: Tipagem estática.
- **Axios**: Requisições HTTP.
- **React Router**: Navegação SPA.

### **Backend**
- **Node.js**: Plataforma de execução.
- **Express**: Framework web.
- **SQLite**: Banco de dados leve.

### **Autenticação**
- **Bcrypt**: Hashing de senhas para autenticação segura.

## 🚀 Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) v14 ou superior
- [npm](https://www.npmjs.com/) (vem com o Node.js)
- [SQLite](https://www.sqlite.org/index.html)

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/DevGLV/ProjetoFinalBackend.git
   cd controle-financas

# 📚 Rotas da API - Controle de Finanças

Este documento detalha todas as rotas disponíveis na API do sistema de controle financeiro, incluindo exemplos de uso.

## **Autenticação Necessária**

A maioria das rotas requer autenticação com um token JWT. O token deve ser incluído no cabeçalho da requisição:

---

# 📋 Rotas da API

## **Rotas de Usuário**

### 1. Registrar Usuário

- **Método**: `POST`  
- **URL**: `/api/users`  
  **Exemplo de URL**: `http://localhost:3000/api/users`  
- **Descrição**: Cria um novo usuário.

**Corpo da Requisição (JSON)**:

{
  "username": "novo_usuario",
  "email": "novo_usuario@example.com",
  "password": "senhaSegura"
}

### 2. Login

- **Método**: `POST`  
- **URL**: `/api/users/login`  
  **Exemplo de URL**: `http://localhost:3000/api/users/login`  
- **Descrição**: Login do usuário.

**Corpo da Requisição (JSON)**:

{
  "email": "novo_usuario@example.com",
  "password": "senhaSegura"
}

Selecione POST, insira a URL e cole o corpo JSON. Clique em "Send" para fazer login. O servidor deve retornar um token JWT se o login for bem-sucedido.

### 3. Criar Transação

- **Método**: `POST`  
- **URL**: `/api/transactions`  
  **Exemplo de URL**: `http://localhost:3000/api/transactions`  
- **Descrição**: Criar Transação.

**Corpo da Requisição (JSON)**:

{
  "description": "Compra no supermercado",
  "amount": 150,
  "date": "2024-01-01",
  "type": "saída"
}

**Cabeçalhos:**

Authorization: Bearer SEU_TOKEN_AQUI (substitua por um token válido obtido após o login)

### 4. Ver Transações

- **Método**: `GET`  
- **URL**: `/api/transactions`  
  **Exemplo de URL**: `http://localhost:3000/api/transactions`  
- **Descrição**: List transactions.

**Cabeçalhos:**

Authorization: Bearer SEU_TOKEN_AQUI (substitua por um token válido obtido após o login)

**Exemplo de Uso:**
-Selecione GET, insira a URL e adicione os cabeçalhos necessários. Clique em "Send" para obter a lista de transações.

### 5. Editar Transações

- **Método**: `PUT`  
- **URL**: `/api/transactions`  
  **Exemplo de URL**: `http://localhost:3000/api/transactions/:id` (substitua :id pelo ID da transação que você deseja editar)
- **Descrição**: Editar.

**Cabeçalhos:**

Authorization: Bearer SEU_TOKEN_AQUI (substitua por um token válido obtido após o login)

   **Corpo da Requisição (JSON)**:
{
  "description": "Compra de supermercado - atualizado",
  "amount": 200.00,
  "type": "saída",
  "date": "2024-12-02T00:00:00Z"
}
### 6. Deletar Transação

- **Método**: `DELETE`  
- **URL**: `/api/transactions`  
  **Exemplo de URL**: `http://localhost:3000/api/transactions/:id` (substitua :id pelo ID da transação que você deseja deletar)
- **Descrição**: Deletar.
 **Cabeçalhos:**

Authorization: Bearer SEU_TOKEN_AQUI (substitua por um token válido obtido após o login)

   **Exemplo de Uso:**
      Selecione DELETE, insira a URL com o ID da transação que deseja deletar e adicione os cabeçalhos necessários. Clique em "Send" para deletar a transação.

🧪 Testes

    Utilize ferramentas como Postman ou Insomnia para testar as rotas da API.
    Após clonar e configurar o projeto, você pode simular diferentes cenários para garantir que todas as funcionalidades estão funcionando corretamente.

