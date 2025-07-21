import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import produto1 from './imagem/produto1.jpg';
import produto2 from './imagem/produto2.jpg';
import produto3 from './imagem/produto3.jpg';
import btn1 from './imagem/btn1.jpg';
import btn2 from './imagem/btn2.jpg';
import btn3 from './imagem/btn3.jpg';
import fundo from './imagem/fundo.jpg';

export default function Home() {
  const navigate = useNavigate();

  const irParaProdutosEmAlta = () => {
    navigate('/produtos-em-alta');
  };
  const irParaQueimaDeEstoque = () => {
    navigate('/queima-de-estoque');
  };
  const irParaLancamentos = () => {
    navigate('/lancamentos');
  };

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <header className="search-bar">
        <input type="text" placeholder="Pesquisar produtos..." />
        <div className="cart-icon" title="Ver carrinho">🛒</div>
      </header>

      <div className="home-content">
        <aside className="sidebar">
          <button
            className="side-button"
            style={{ backgroundImage: `url(${btn1})` }}
            onClick={irParaProdutosEmAlta}
          >
            <span>Produtos em Alta</span>
          </button>

          <button
            className="side-button"
            style={{ backgroundImage: `url(${btn2})` }}
            onClick={irParaQueimaDeEstoque}
          >
            <span>Queima de Estoque</span>
          </button>

          <button
            className="side-button"
            style={{ backgroundImage: `url(${btn3})` }}
            onClick={irParaLancamentos}
          >
            <span>Lançamentos</span>
          </button>
        </aside>

        <main className="main-area">
          <h1>Bem-vindo(a) à Apucaticaits</h1>
          <h1>Conheça o melhor do universo Geek com nossos produtos</h1>
          <h1>Recomendados:</h1>
          <div className="recommendations">
            <div className="product-card">
              <img src={produto1} alt="Produto 1" />
              <h3>Funko Pop Goku</h3>
              <p>R$ 129,90</p>
              <button className="buy-button">Comprar</button>
            </div>
            <div className="product-card">
              <img src={produto2} alt="Produto 2" />
              <h3>Camisa do Madara</h3>
              <p>R$ 79,90</p>
              <button className="buy-button">Comprar</button>
            </div>
            <div className="product-card">
              <img src={produto3} alt="Produto 3" />
              <h3>Caneca do Gojo</h3>
              <p>R$ 49,90</p>
              <button className="buy-button">Comprar</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
