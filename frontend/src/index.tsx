import React from 'react';
import ReactDOM from 'react-dom/client'; // Para versões mais recentes do React
import App from './App'; // Certifique-se de que este caminho está correto
import './styles/global.css'; // Importando estilos globais, se houver
import '@fortawesome/fontawesome-free/css/all.min.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
