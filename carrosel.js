/**
 * ===================================================================
 * H.MACCHINA - CARROSSEL INTERATIVO
 * Versão otimizada com melhor performance, acessibilidade e UX
 * ===================================================================
 */

// Classe para gerenciar o carrossel de forma mais organizada e eficiente
class CarouselManager {
    constructor() {
        // Elementos do DOM com verificação de existência
        this.carouselImages = document.querySelector('.carousel-images');
        this.images = document.querySelectorAll('.carousel-images img');
        this.prevButton = document.querySelector('.prev');
        this.nextButton = document.querySelector('.next');
        this.carousel = document.querySelector('.carousel');
        
        // Verificação se todos os elementos existem
        if (!this.carouselImages || !this.images.length || !this.prevButton || !this.nextButton || !this.carousel) {
            console.warn('Carrossel: Elementos necessários não encontrados no DOM');
            return;
        }
        
        // Estado do carrossel
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoScrollInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        // Configurações
        this.config = {
            autoScrollDelay: 5000,      // 5 segundos para auto-scroll
            pauseOnHoverDelay: 6000,    // 6 segundos quando retoma após hover
            animationDuration: 500,     // Duração da animação em ms
            swipeThreshold: 50          // Threshold mínimo para swipe em pixels
        };
        
        // Inicialização
        this.init();
    }
    
    /**
     * Inicializa o carrossel com todos os event listeners e configurações
     */
    init() {
        // Event listeners para botões
        this.prevButton.addEventListener('click', () => this.handlePrevious());
        this.nextButton.addEventListener('click', () => this.handleNext());
        
        // Event listeners para teclado (acessibilidade)
        this.carousel.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Event listeners para mouse hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoScroll());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoScroll());
        
        // Event listeners para touch/swipe (dispositivos móveis)
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Event listener para redimensionamento da janela
        window.addEventListener('resize', () => this.handleResize());
        
        // Tornar o carrossel focável para navegação por teclado
        this.carousel.setAttribute('tabindex', '0');
        
        // Iniciar auto-scroll
        this.startAutoScroll();
        
        // Configuração inicial
        this.updateCarousel();
        
        console.log('Carrossel inicializado com sucesso');
    }
    
    /**
     * Atualiza a posição do carrossel com animação suave
     */
    updateCarousel() {
        if (this.isAnimating || !this.images.length) return;
        
        this.isAnimating = true;
        
        // Calcula a largura da imagem de forma mais precisa
        const imageWidth = this.carousel.clientWidth;
        const translateX = -this.currentIndex * imageWidth;
        
        // Aplica a transformação com transição suave
        this.carouselImages.style.transform = `translateX(${translateX}px)`;
        
        // Atualiza atributos de acessibilidade
        this.updateAriaAttributes();
        
        // Reset do flag de animação após a duração da transição
        setTimeout(() => {
            this.isAnimating = false;
        }, this.config.animationDuration);
    }
    
    /**
     * Navega para a imagem anterior
     */
    handlePrevious() {
        if (this.isAnimating) return;
        
        this.currentIndex = this.currentIndex > 0 
            ? this.currentIndex - 1 
            : this.images.length - 1;
        
        this.updateCarousel();
        this.resetAutoScroll();
    }
    
    /**
     * Navega para a próxima imagem
     */
    handleNext() {
        if (this.isAnimating) return;
        
        this.currentIndex = this.currentIndex < this.images.length - 1 
            ? this.currentIndex + 1 
            : 0;
        
        this.updateCarousel();
        this.resetAutoScroll();
    }
    
    /**
     * Gerencia navegação por teclado para acessibilidade
     */
    handleKeyboard(event) {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this.handlePrevious();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.handleNext();
                break;
            case 'Home':
                event.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                event.preventDefault();
                this.goToSlide(this.images.length - 1);
                break;
        }
    }
    
    /**
     * Gerencia início do toque para swipe em dispositivos móveis
     */
    handleTouchStart(event) {
        this.touchStartX = event.changedTouches[0].screenX;
    }
    
    /**
     * Gerencia fim do toque e detecta swipe
     */
    handleTouchEnd(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.handleSwipe();
    }
    
    /**
     * Processa o gesto de swipe
     */
    handleSwipe() {
        const swipeDistance = this.touchStartX - this.touchEndX;
        const absSwipeDistance = Math.abs(swipeDistance);
        
        if (absSwipeDistance > this.config.swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe para a esquerda - próxima imagem
                this.handleNext();
            } else {
                // Swipe para a direita - imagem anterior
                this.handlePrevious();
            }
        }
    }
    
    /**
     * Gerencia redimensionamento da janela
     */
    handleResize() {
        // Debounce para evitar muitas chamadas durante o redimensionamento
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateCarousel();
        }, 250);
    }
    
    /**
     * Navega diretamente para um slide específico
     */
    goToSlide(index) {
        if (index >= 0 && index < this.images.length && index !== this.currentIndex) {
            this.currentIndex = index;
            this.updateCarousel();
            this.resetAutoScroll();
        }
    }
    
    /**
     * Inicia o auto-scroll
     */
    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.handleNext();
        }, this.config.autoScrollDelay);
    }
    
    /**
     * Pausa o auto-scroll
     */
    pauseAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    /**
     * Retoma o auto-scroll
     */
    resumeAutoScroll() {
        if (!this.autoScrollInterval) {
            this.autoScrollInterval = setInterval(() => {
                this.handleNext();
            }, this.config.pauseOnHoverDelay);
        }
    }
    
    /**
     * Reinicia o auto-scroll (útil após interação manual)
     */
    resetAutoScroll() {
        this.pauseAutoScroll();
        this.resumeAutoScroll();
    }
    
    /**
     * Atualiza atributos ARIA para acessibilidade
     */
    updateAriaAttributes() {
        // Atualiza o aria-label do carrossel
        const currentSlide = this.currentIndex + 1;
        const totalSlides = this.images.length;
        this.carousel.setAttribute('aria-label', 
            `Imagem ${currentSlide} de ${totalSlides} na galeria`);
        
        // Atualiza os botões
        this.prevButton.setAttribute('aria-label', 
            `Ir para imagem anterior (${currentSlide > 1 ? currentSlide - 1 : totalSlides})`);
        this.nextButton.setAttribute('aria-label', 
            `Ir para próxima imagem (${currentSlide < totalSlides ? currentSlide + 1 : 1})`);
    }
    
    /**
     * Destrói o carrossel e limpa event listeners
     */
    destroy() {
        this.pauseAutoScroll();
        
        // Remove event listeners
        this.prevButton?.removeEventListener('click', this.handlePrevious);
        this.nextButton?.removeEventListener('click', this.handleNext);
        this.carousel?.removeEventListener('keydown', this.handleKeyboard);
        this.carousel?.removeEventListener('mouseenter', this.pauseAutoScroll);
        this.carousel?.removeEventListener('mouseleave', this.resumeAutoScroll);
        this.carousel?.removeEventListener('touchstart', this.handleTouchStart);
        this.carousel?.removeEventListener('touchend', this.handleTouchEnd);
        window.removeEventListener('resize', this.handleResize);
        
        console.log('Carrossel destruído');
    }
}

/**
 * Inicialização quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se os elementos do carrossel existem antes de inicializar
    const carouselElement = document.querySelector('.carousel');
    
    if (carouselElement) {
        // Inicializa o carrossel
        window.carouselManager = new CarouselManager();
        
        // Adiciona suporte para prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Se o usuário prefere movimento reduzido, desabilita auto-scroll
            window.carouselManager.pauseAutoScroll();
            console.log('Auto-scroll desabilitado devido à preferência de movimento reduzido');
        }
        
        // Escuta mudanças na preferência de movimento
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                window.carouselManager.pauseAutoScroll();
            } else {
                window.carouselManager.startAutoScroll();
            }
        });
    } else {
        console.warn('Elemento .carousel não encontrado. Carrossel não foi inicializado.');
    }
});

/**
 * Limpeza quando a página for descarregada
 */
window.addEventListener('beforeunload', () => {
    if (window.carouselManager) {
        window.carouselManager.destroy();
    }
});

/**
 * Função utilitária para controle manual do carrossel (opcional)
 * Pode ser usada por outros scripts se necessário
 */
window.carouselControls = {
    goToSlide: (index) => {
        if (window.carouselManager) {
            window.carouselManager.goToSlide(index);
        }
    },
    pause: () => {
        if (window.carouselManager) {
            window.carouselManager.pauseAutoScroll();
        }
    },
    resume: () => {
        if (window.carouselManager) {
            window.carouselManager.resumeAutoScroll();
        }
    }
};

