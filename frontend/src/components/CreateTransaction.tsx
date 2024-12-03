// src/components/CreateTransaction.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface CreateTransactionProps {
    token: string;
    onTransactionCreated: () => void; // Função para atualizar a lista de transações
}

const CreateTransaction: React.FC<CreateTransactionProps> = ({ token, onTransactionCreated }) => {
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [type, setType] = useState<string>('saída');
    const [date, setDate] = useState<string>(''); // Mantém a data no formato YYYY-MM-DD
    const [message, setMessage] = useState<string | null>(null); // Estado para mensagem de feedback
    const [isError, setIsError] = useState<boolean>(false); // Para determinar se a mensagem é de erro

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        try {
            const adjustedDate = new Date(date + 'T00:00:00').toISOString(); // Converte para ISO 8601

            await axios.post('http://localhost:3000/api/transactions', {
                description,
                amount,
                type,
                date: adjustedDate,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Transação criada com sucesso!'); // Mensagem de sucesso
            setIsError(false); // Define como não erro
            
            onTransactionCreated(); // Chama a função para atualizar a lista
            
            // Limpa os campos após a criação
            setDescription('');
            setAmount(0);
            setType('saída');
            setDate('');

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Erro ao criar transação:', error);
            setMessage('Erro ao criar transação. Tente novamente.'); // Mensagem de erro
            setIsError(true); // Define como erro
            
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Valor" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="saída">Saída</option>
                    <option value="entrada">Entrada</option>
                </select>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <button type="submit">Criar Transação</button>
            </form>
            {message && (
                <p className={`feedback-message ${isError ? 'error' : 'success'}`}>
                    {message}
                </p>
            )} {/* Exibe mensagem de feedback */}
        </div>
    );
};

export default CreateTransaction;
