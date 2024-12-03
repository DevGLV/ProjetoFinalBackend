// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TransactionList from './components/TransactionList';
import EditTransaction from './components/EditTransaction'; // Importando o componente EditTransaction
import './App.css'; // Importando o CSS

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null); // Armazena o token JWT aqui

    return (
        <Router>
            <div>
                <h1>Controle de Finanças</h1>
                <Routes>
                    {/* Rota de Registro */}
                    <Route path="/" element={<RegisterForm />} />

                    {/* Rota de Login */}
                    <Route path="/login" element={<LoginForm setToken={setToken} />} />

                    {/* Rota Principal das Transações */}
                    <Route path="/transactions" element={
                        !token ? (
                            <Navigate to="/login" replace /> // Redireciona para login se não estiver autenticado
                        ) : (
                            <TransactionList token={token} />
                        )
                    } />

                    {/* Rota para Editar uma Transação */}
                    <Route path="/edit/:id" element={
                        token ? (
                            <EditTransaction token={token} />
                        ) : (
                            <Navigate to="/login" replace /> // Redireciona para login se não estiver autenticado
                        )
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
