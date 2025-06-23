import React from 'react';
import '../styles/format.css';

const Intro = () => {
  return (
    <div className="intro">
      <h2 className="title">Seja Bem-Vindo!</h2>
      <main className="main-content">
        <p>Transformamos inovação em produtividade! Máquinas alimentícias de ponta para elevar a eficiência e qualidade do seu negócio.</p>
        <video className="video_maq" src="/images/maquina_de_lasanha.mp4" muted autoPlay loop></video>
      </main>
    </div>
  );
};

export default Intro; 