import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import produto1 from './imagem/produto1.jpg';
import produto2 from './imagem/produto2.jpg';
import produto3 from './imagem/produto3.jpg';
import btn1 from './imagem/btn1.jpg';
import btn2 from './imagem/btn2.jpg';
import btn3 from './imagem/btn3.jpg';
import fundo from './imagem/fundo.gif';

export default function Lancamentos() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${fundo})` }}>
      <header className="search-bar">
        <input type="text" placeholder="Pesquisar produtos..." />
        <div className="cart-icon">🛒</div>
      </header>

      <div className="home-content">
        <aside className="sidebar">
          <button className="side-button" style={{ backgroundImage: `url(${btn1})` }} onClick={() => navigate('/home')}>Home</button>
          <button className="side-button" style={{ backgroundImage: `url(${btn2})` }} onClick={() => navigate('/produtos-em-alta')}>Produtos em Alta</button>
          <button className="side-button" style={{ backgroundImage: `url(${btn3})` }} onClick={() => navigate('/queima-de-estoque')}>Queima de Estoque</button>
        </aside>

        <main className="main-area">
          <h1>🚀 Lançamentos</h1>
          <div className="recommendations">
            <div className="product-card">
              <img src={produto1} alt="Produto 1" />
              <h3>Action do Sudo de Gachiakuta</h3>
              <p>R$ 149,00</p>
              <button className="buy-button">Comprar</button>
            </div>
            <div className="product-card">
              <img src={produto2} alt="Produto 2" />
              <h3>Action do Koichi de Vigilantes</h3>
              <p>R$ 89,90</p>
              <button className="buy-button">Comprar</button>
            </div>
            <div className="product-card">
              <img src={produto3} alt="Produto 3" />
              <h3>Actiond da Frieren</h3>
              <p>R$ 99,90</p>
              <button className="buy-button">Comprar</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}