// src/components/TransactionList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateTransaction from './CreateTransaction'; // Importando o componente CreateTransaction

interface Transaction {
   id:number;
   description:string;
   amount:number;
   date:string;
   type:string;
}

interface TransactionListProps {
   token:string;
}

const TransactionList : React.FC<TransactionListProps> = ({token}) => {
   const [transactions,setTransactions] = useState<Transaction[]>([]);
   const [message,setMessage] = useState<string | null>(null); // Para mensagens de feedback
   const [isError, setIsError] = useState<boolean>(false); // Para determinar se a mensagem é de erro

   useEffect(() => {
       fetchTransactions();
   },[token]);

   const fetchTransactions = async () => {
       try{
           const response = await axios.get('http://localhost:3000/api/transactions',{
               headers:{Authorization:`Bearer ${token}`},
           });
           setTransactions(response.data);
       } catch (error) {
           console.error('Erro ao buscar transações:', error);
           setMessage('Erro ao carregar transações. Tente novamente.'); // Mensagem de erro
           setIsError(true); // Define como erro

           // Remove a mensagem após 3 segundos
           setTimeout(() => {
               setMessage(null);
           }, 3000);
       }
   };

   const handleDelete = async (id:number) => {
       try{
           await axios.delete(`http://localhost:3000/api/transactions/${id}`,{
               headers:{Authorization:`Bearer ${token}`},
           });
           setTransactions(transactions.filter(transaction => transaction.id !== id)); // Remove a transação da lista
           setMessage('Transação excluída com sucesso!'); // Mensagem de sucesso
           setIsError(false); // Define como não erro

           // Remove a mensagem após 3 segundos
           setTimeout(() => {
               setMessage(null);
           }, 3000);
       } catch (error){
           console.error('Erro ao excluir transação:', error);
           setMessage('Erro ao excluir transação. Tente novamente.'); // Mensagem de erro
           setIsError(true); // Define como erro

           // Remove a mensagem após 3 segundos
           setTimeout(() => {
               setMessage(null);
           }, 3000);
       }
   };

   return (
       <div className="transaction-list">
           
           {message && (
               <p className={`feedback-message ${isError ? 'error' : 'success'}`}>
                   {message}
               </p>
           )} {/* Exibe mensagem de feedback */}
           
           {/* Componente para criar nova transação */}
           <CreateTransaction token={token} onTransactionCreated={fetchTransactions} />

           <ul>
               {transactions.map((transaction) => (
                   <li key={transaction.id} className="transaction-item">
                       <div>
                           <strong>Descrição:</strong> {transaction.description}
                       </div>
                       <div>
                           <strong>Valor:</strong> R$ {transaction.amount.toFixed(2).replace('.', ',')}
                       </div>
                       <div>
                           <strong>Data:</strong> {new Date(transaction.date).toLocaleDateString('pt-BR')}
                       </div>
                       <div>
                           <strong>Tipo:</strong> {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                       </div>
                       <button onClick={() => handleDelete(transaction.id)}>Excluir</button>
                       {/* Link para editar a transação */}
                       <Link to={`/edit/${transaction.id}`}>Editar</Link>
                   </li>
               ))}
           </ul>
       </div>
   );
};

export default TransactionList;

