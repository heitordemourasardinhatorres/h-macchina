import React from 'react';
import '../styles/format.css';

const Header = () => {
  return (
    <header className="header">
      <img className="logopng" src="/images/logo.png" alt="Logo da H.MACCHINA" />
      <h1 className="logo">H.MACCHINA</h1>
      <nav className="navigation">
        <a href="https://wa.me/5512997567946" target="_blank" className="chat-button">
          <img className="whatsapp_logo" src="/images/whatsapp logo.png" alt="WhatsApp" />
          <p className="p_contato">Fale Conosco</p>
        </a>

        <ul>
          <li><a href="#sobre-nos">SOBRE NÓS</a></li>
          <li><a href="#produtos">PRODUTOS</a></li>
          <li><a href="#galeria">GALERIA</a></li>
          <li><a href="https://wa.me/5512997567946">CONTATO</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 