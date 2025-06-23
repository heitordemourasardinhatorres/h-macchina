import React, { useState, useEffect } from 'react';
import '../styles/format.css';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/cortador_lasanha.jpg',
    '/images/maquinaalimenticia_01.png',
    '/images/maquina_lasanha.png',
    '/images/cortador_lasanha.jpg'
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="galeria" className="gallery">
      <h2>Galeria</h2>
      <div className="carousel">
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <div className="carousel-images" style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}>
          {images.map((src, index) => (
            <img 
              key={index}
              src={src}
              alt={`Máquina ${index + 1}`}
            />
          ))}
        </div>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
    </section>
  );
};

export default Gallery; 