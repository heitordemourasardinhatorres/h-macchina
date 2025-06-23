import React from 'react';
import '../styles/format.css';

const Products = () => {
  return (
    <section id="produtos" className="products">
      <h2>Nossos Produtos</h2>
      <div className="product-list">
        <div className="product-item">
          <img src="/images/maquina_de_lasanha_4.png" alt="Máquina produtora de massas de lasanha" />
          <h3>Máquina produtora de massas de lasanha</h3>
          <p>Alta eficiência e precisão no processamento de massas.</p>
        </div>
        <div className="product-item">
          <img src="/images/maquina_de_lasanha_5.JPG" alt="Esfolheador de massas" />
          <h3>Esfolheador de massas</h3>
          <p>Praticidade, agilidade e padronização nas espressuras de suas massas.</p>
        </div>
      </div>
    </section>
  );
};

export default Products; 