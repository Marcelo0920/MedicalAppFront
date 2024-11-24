import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importar el archivo de estilos
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Apuntar al div con id "root" en index.html
);
