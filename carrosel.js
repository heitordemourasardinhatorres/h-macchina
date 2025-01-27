const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0; // Índice inicial

// Função para atualizar o deslocamento das imagens
function updateCarousel() {
  const imageWidth = images[0].clientWidth; // Largura de uma imagem
  carouselImages.style.transform = `translateX(${-currentIndex * imageWidth}px)`; // Move as imagens
}

// Botão "Anterior"
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
  updateCarousel();
});

// Botão "Próximo"
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

// Função de rolagem automática
function autoScroll() {
  currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
  updateCarousel();
}

// Iniciar rolagem automática
const autoScrollInterval = setInterval(autoScroll, 9000); // Troca a cada 3 segundos

// Pausar a rolagem automática ao passar o mouse no carrossel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval)); // Pausa
carousel.addEventListener('mouseleave', () => setInterval(autoScroll, 10000)); // Retoma
