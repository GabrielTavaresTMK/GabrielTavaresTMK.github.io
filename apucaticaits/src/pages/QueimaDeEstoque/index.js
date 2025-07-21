import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import produto1 from './imagem/escudo_furia.png';
import produto2 from './imagem/Kazutora.jpg';
import produto3 from './imagem/kirito.jpg';
import btn1 from './imagem/btn1.jpg';
import btn2 from './imagem/btn2.jpg';
import btn3 from './imagem/btn3.jpg';
import fundo from './imagem/fundo.gif';

export default function QueimaDeEstoque() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${fundo})` }}>
      <header className="search-bar">
        <input type="text" placeholder="Pesquisar produtos..." />
        <div className="cart-icon">🛒</div>
      </header>

      <div className="home-content">
        <aside className="sidebar">
          <button className="side-button" style={{ backgroundImage: `url(${btn1})` }} onClick={() => navigate('/')}>Home</button>
          <button className="side-button" style={{ backgroundImage: `url(${btn2})` }} onClick={() => navigate('/produtos-em-alta')}>Produtos em Alta</button>
          <button className="side-button" style={{ backgroundImage: `url(${btn3})` }} onClick={() => navigate('/lancamentos')}>Lançamentos</button>
        </aside>

        <main className="main-area">
          <h1>🔥 Queima de Estoque</h1>
          <div className="recommendations">
            <div className="product-card">
              <img src={produto1} alt="Produto 1" />
              <h3>Action Figure Midoriya</h3>
              <p>R$ 59,90</p>
              <button className="buy-button">Comprar</button>
            </div>
            <div className="product-card">
              <img src={produto2} alt="Produto 2" />
              <h3>Poster Star Wars</h3>
              <p>R$ 19,90</p>
              <button className="buy-button">Comprar</button>
            </div>
            <div className="product-card">
              <img src={produto3} alt="Produto 3" />
              <h3>Mousepad Zelda</h3>
              <p>R$ 25,00</p>
              <button className="buy-button">Comprar</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
