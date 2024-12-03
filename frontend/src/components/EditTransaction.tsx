// src/components/EditTransaction.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface EditTransactionProps {
    token: string; // Espera um token do tipo string
}

const EditTransaction: React.FC<EditTransactionProps> = ({ token }) => {
    const { id } = useParams<{ id: string }>(); // Obtém o ID da transação da URL
    const [transaction, setTransaction] = useState<any>(null); // Use um tipo apropriado se souber a estrutura
    const [message, setMessage] = useState<string | null>(null); // Para mensagens de feedback
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/transactions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransaction(response.data);
            } catch (error) {
                console.error('Erro ao buscar transação:', error);
                setMessage('Erro ao carregar a transação. Tente novamente.'); // Mensagem de erro
            }
        };

        fetchTransaction();
    }, [id, token]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transaction) return;

        try {
            await axios.put(`http://localhost:3000/api/transactions/${id}`, transaction, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Transação editada com sucesso!'); // Mensagem de sucesso
            navigate('/transactions'); // Redireciona para a lista de transações
        } catch (error) {
            console.error('Erro ao atualizar transação:', error);
            setMessage('Erro ao editar a transação. Tente novamente.'); // Mensagem de erro
        }
    };

    if (!transaction) return <p>Carregando...</p>; // Exibe uma mensagem enquanto carrega

    return (
        <div>
            <h2>Editar Transação</h2>
            {message && <p>{message}</p>} {/* Exibe mensagem de feedback */}
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={transaction.description} 
                    onChange={(e) => setTransaction({ ...transaction, description: e.target.value })} 
                    required 
                />
                <input 
                    type="number" 
                    value={transaction.amount} 
                    onChange={(e) => setTransaction({ ...transaction, amount: Number(e.target.value) })} 
                    required 
                />
                <select 
                    value={transaction.type} 
                    onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
                >
                    <option value="saída">Saída</option>
                    <option value="entrada">Entrada</option>
                </select>
                <input 
                    type="date" 
                    value={transaction.date.split('T')[0]} 
                    onChange={(e) => setTransaction({ ...transaction, date: e.target.value })} 
                />
                <button type="submit">Atualizar Transação</button>
            </form>
        </div>
    );
};

export default EditTransaction;
