/* ===================================
   JAVASCRIPT INTERATIVO - BM Developer Portfolio
   ================================== */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // === INICIALIZAÇÃO === //
    initializePortfolio();
    
    function initializePortfolio() {
        // Inicializar todos os componentes
        initNavigation();
        initScrollEffects();
        initAnimations();
        initPortfolioFilter();
        initBackToTop();
        initSmoothScroll();
        initTypingEffect();
        initParticles();
        initLazyLoading();
        
        // Adicionar classe de carregamento completo
        document.body.classList.add('loaded');
        
        console.log('🚀 BM Developer Portfolio inicializado com sucesso!');
    }
    
    // === NAVEGAÇÃO === //
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Efeito de scroll na navbar
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Destacar link ativo baseado na seção visível
            highlightActiveNavLink();
        });
        
        // Destacar link ativo
        function highlightActiveNavLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // Fechar menu mobile ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
    
    // === EFEITOS DE SCROLL === //
    function initScrollEffects() {
        // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animação especial para estatísticas
                    if (entry.target.classList.contains('stat-number')) {
                        animateCounter(entry.target);
                    }
                    
                    // Animação especial para barras de progresso
                    if (entry.target.classList.contains('skill-bar')) {
                        animateSkillBar(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .hero-content,
            .hero-visual,
            .about-content,
            .about-visual,
            .service-card,
            .portfolio-card,
            .testimonial-card,
            .contact-item,
            .stat-number,
            .skill-bar
        `);
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // === ANIMAÇÕES === //
    function initAnimations() {
        // Animação de contadores
        function animateCounter(element) {
            const target = parseInt(element.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const suffix = element.textContent.replace(/\d/g, '').replace(/\+/g, '');
                element.textContent = Math.floor(current) + suffix;
            }, 16);
        }
        
        // Animação de barras de habilidade
        function animateSkillBar(element) {
            const percentage = element.getAttribute('data-percentage');
            const bar = element.querySelector('.skill-progress');
            
            if (bar) {
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                }, 200);
            }
        }
        
        // Efeito de digitação
        function initTypingEffect() {
            const typingElement = document.querySelector('.hero-profession');
            if (!typingElement) return;
            
            const texts = [
                'Especialista em Sites Institucionais',
                'Criador de Landing Pages',
                'Desenvolvedor Frontend',
                'Designer de Experiências'
            ];
            
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function typeText() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    typingElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                let typeSpeed = isDeleting ? 50 : 100;
                
                if (!isDeleting && charIndex === currentText.length) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typeSpeed = 500;
                }
                
                setTimeout(typeText, typeSpeed);
            }
            
            // Iniciar efeito após um delay
            setTimeout(typeText, 1000);
        }
        
        // Tornar funções acessíveis globalmente
        window.animateCounter = animateCounter;
        window.animateSkillBar = animateSkillBar;
    }
    
    // === FILTRO DO PORTFÓLIO === //
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Atualizar botão ativo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar itens
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        item.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // === BOTÃO VOLTAR AO TOPO === //
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // === SCROLL SUAVE === //
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // === PARTÍCULAS ANIMADAS === //
    function initParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;
        
        // Criar partículas dinâmicas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroParticles.appendChild(particle);
        }
        
        // Adicionar keyframes para partículas
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translateY(0px) translateX(0px); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // === LAZY LOADING === //
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // === UTILITÁRIOS === //
    
    // Debounce function para otimizar performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // === INTERAÇÕES AVANÇADAS === //
    
    // Efeito parallax suave
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        const handleParallax = throttle(() => {
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(window.scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);
        
        window.addEventListener('scroll', handleParallax);
    }
    
    // Efeito de hover nos cards
    function initCardEffects() {
        const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Inicializar efeitos avançados
    initParallax();
    initCardEffects();
    
    // === PERFORMANCE === //
    
    // Preload de imagens críticas
    function preloadImages() {
        const criticalImages = [
            // Adicionar URLs de imagens críticas aqui
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Otimização de scroll
    let ticking = false;
    
    function updateScrollEffects() {
        // Atualizar efeitos baseados no scroll
        if (!ticking) {
            requestAnimationFrame(() => {
                // Código de scroll otimizado aqui
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateScrollEffects);
    
    // === ACESSIBILIDADE === //
    
    // Suporte a navegação por teclado
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // ESC para fechar modais
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    const modal = bootstrap.Modal.getInstance(openModal);
                    modal.hide();
                }
            }
            
            // Enter/Space para ativar botões
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('btn')) {
                e.preventDefault();
                e.target.click();
            }
        });
    }
    
    // Melhorar contraste em modo de alto contraste
    function initAccessibilityFeatures() {
        // Detectar preferência de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }
        
        // Detectar modo escuro
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkMode.matches) {
            document.body.classList.add('dark-mode');
        }
    }
    
    initKeyboardNavigation();
    initAccessibilityFeatures();
    
    // === ANALYTICS E TRACKING === //
    
    // Tracking de interações (placeholder)
    function trackInteraction(action, element) {
        // Implementar tracking analytics aqui
        console.log(`Interação: ${action} em ${element}`);
    }
    
    // Adicionar listeners para tracking
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn')) {
            trackInteraction('click', e.target.textContent);
        }
    });
    
    // === ERROR HANDLING === //
    
    // Tratamento global de erros
    window.addEventListener('error', function(e) {
        console.error('Erro capturado:', e.error);
        // Implementar relatório de erro aqui
    });
    
    // === INICIALIZAÇÃO FINAL === //
    
    // Remover loading screen se existir
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    }
    
    // Preload de recursos
    preloadImages();
    
    // Log de inicialização completa
    console.log('✅ Portfolio BM Developer carregado completamente!');
    
});

// === FUNÇÕES GLOBAIS === //

// Função para abrir links externos
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Função para copiar texto para clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Texto copiado para a área de transferência!', 'success');
    } catch (err) {
        console.error('Erro ao copiar texto:', err);
        showNotification('Erro ao copiar texto', 'error');
    }
}

// Sistema de notificações simples
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Adicionar estilos para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeInUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
`;

document.head.appendChild(notificationStyles);

