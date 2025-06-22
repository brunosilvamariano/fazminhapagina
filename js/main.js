/* ===== JAVASCRIPT PRINCIPAL - FAZ MINHA PÁGINA ===== */
/* Funcionalidades interativas e animações */

(function() {
    'use strict';

    // ===== VARIÁVEIS GLOBAIS =====
    let isScrolling = false;
    let scrollTimer = null;
    let lastScrollTop = 0;
    
    // ===== INICIALIZAÇÃO =====
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    function initializeApp() {
        // Inicializar todas as funcionalidades
        initHeader();
        initScrollAnimations();
        initBackToTop();
        initSmoothScroll();
        initScrollProgress();
        initScrollReveal();
        initCounters();
        initParticles();
        initLazyLoading();
        initFormValidation();
        initTooltips();
        initAccordion();
        initMobileMenu();
        
        // Remover preloader se existir
        removePreloader();
        
        console.log('🚀 Faz Minha Página - Inicializado com sucesso!');
    }

    // ===== HEADER E NAVEGAÇÃO =====
    function initHeader() {
        const header = document.getElementById('header');
        const navbar = header?.querySelector('.navbar');
        
        if (!header || !navbar) return;

        // Scroll do header
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Esconder/mostrar header no scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });

        // Ativar link da seção atual
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===== MENU MOBILE =====
    function initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbarToggler || !navbarCollapse) return;

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    }

    // ===== SCROLL SUAVE =====
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== BOTÃO VOLTAR AO TOPO =====
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;

        // Mostrar/esconder botão baseado no scroll
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Ação do clique
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== PROGRESSO DE SCROLL =====
    function initScrollProgress() {
        // Criar barra de progresso se não existir
        let progressBar = document.querySelector('.scroll-progress-bar');
        
        if (!progressBar) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'scroll-progress';
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress-bar';
            progressContainer.appendChild(progressBar);
            document.body.appendChild(progressContainer);
        }

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ===== ANIMAÇÕES DE SCROLL =====
    function initScrollAnimations() {
        // Throttle para performance
        let ticking = false;
        
        function updateAnimations() {
            const scrollTop = window.pageYOffset;
            
            // Parallax simples para elementos com data-parallax
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        });
    }

    // ===== SCROLL REVEAL =====
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // ===== CONTADORES ANIMADOS =====
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number, .counter');
        
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

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
            
            const suffix = element.textContent.replace(/\d/g, '');
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // ===== PARTÍCULAS =====
    function initParticles() {
        const particleContainers = document.querySelectorAll('.hero-particles, .particles');
        
        particleContainers.forEach(container => {
            createParticles(container);
        });
    }

    function createParticles(container) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            container.appendChild(particle);
        }
    }

    // ===== LAZY LOADING =====
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ===== VALIDAÇÃO DE FORMULÁRIO =====
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!validateForm(this)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                this.classList.add('was-validated');
            });
        });
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showFieldError(input, 'Este campo é obrigatório');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showFieldError(input, 'Digite um email válido');
            } else {
                clearFieldError(input);
            }
        });
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(input, message) {
        clearFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--danger-color)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = 'var(--danger-color)';
    }

    function clearFieldError(input) {
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    // ===== TOOLTIPS =====
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }

    function showTooltip(e) {
        const element = e.target;
        const tooltipText = element.getAttribute('data-tooltip');
        
        if (!tooltipText) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-custom';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: var(--border-radius-md);
            font-size: var(--font-size-sm);
            white-space: nowrap;
            z-index: var(--z-tooltip);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
        
        element._tooltip = tooltip;
    }

    function hideTooltip(e) {
        const element = e.target;
        if (element._tooltip) {
            element._tooltip.remove();
            delete element._tooltip;
        }
    }

    // ===== ACCORDION =====
    function initAccordion() {
        const accordionButtons = document.querySelectorAll('.accordion-button');
        
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = document.querySelector(this.getAttribute('data-bs-target'));
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Fechar outros accordions no mesmo grupo
                const accordionGroup = this.closest('.accordion');
                if (accordionGroup) {
                    const otherButtons = accordionGroup.querySelectorAll('.accordion-button');
                    otherButtons.forEach(otherButton => {
                        if (otherButton !== this) {
                            otherButton.setAttribute('aria-expanded', 'false');
                            otherButton.classList.add('collapsed');
                            const otherTarget = document.querySelector(otherButton.getAttribute('data-bs-target'));
                            if (otherTarget) {
                                otherTarget.classList.remove('show');
                            }
                        }
                    });
                }
                
                // Toggle do accordion atual
                if (isExpanded) {
                    this.setAttribute('aria-expanded', 'false');
                    this.classList.add('collapsed');
                    if (target) target.classList.remove('show');
                } else {
                    this.setAttribute('aria-expanded', 'true');
                    this.classList.remove('collapsed');
                    if (target) target.classList.add('show');
                }
            });
        });
    }

    // ===== REMOVER PRELOADER =====
    function removePreloader() {
        const preloader = document.querySelector('.page-loader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        }
    }

    // ===== UTILITÁRIOS =====
    
    // Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Throttle function
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
        };
    }

    // ===== EVENTOS GLOBAIS =====
    
    // Redimensionamento da janela
    window.addEventListener('resize', debounce(function() {
        // Recalcular posições se necessário
        console.log('Window resized');
    }, 250));

    // Mudança de orientação
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalcular após mudança de orientação
            window.scrollTo(0, window.pageYOffset);
        }, 100);
    });

    // ===== PERFORMANCE =====
    
    // Prefetch de links importantes
    function prefetchLinks() {
        const importantLinks = document.querySelectorAll('a[href^="http"]');
        importantLinks.forEach(link => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
        });
    }

    // Executar prefetch após carregamento
    window.addEventListener('load', function() {
        setTimeout(prefetchLinks, 2000);
    });

    // ===== ANALYTICS E TRACKING =====
    
    // Tracking de cliques em botões importantes
    function trackButtonClicks() {
        const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary, .whatsapp-float');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim() || this.getAttribute('title') || 'CTA Button';
                console.log('Button clicked:', buttonText);
                
                // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'CTA',
                        event_label: buttonText
                    });
                }
            });
        });
    }

    // Tracking de scroll depth
    function trackScrollDepth() {
        const milestones = [25, 50, 75, 100];
        const tracked = [];
        
        window.addEventListener('scroll', throttle(function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !tracked.includes(milestone)) {
                    tracked.push(milestone);
                    console.log(`Scroll depth: ${milestone}%`);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            event_category: 'Engagement',
                            event_label: `${milestone}%`
                        });
                    }
                }
            });
        }, 1000));
    }

    // Inicializar tracking
    window.addEventListener('load', function() {
        trackButtonClicks();
        trackScrollDepth();
    });

    // ===== EXPOSIÇÃO GLOBAL =====
    
    // Expor algumas funções globalmente se necessário
    window.FazMinhaPagina = {
        scrollToSection: function(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        },
        
        showNotification: function(message, type = 'info') {
            // Implementar sistema de notificações se necessário
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    };

})();

