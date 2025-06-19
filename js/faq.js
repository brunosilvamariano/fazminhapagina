// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
});

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            const faqItem = this.closest('.faq-item');
            const icon = this.querySelector('.faq-icon i');
            
            // Toggle aria-expanded
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Smooth animation for opening/closing
            if (!isExpanded) {
                // Opening
                targetElement.style.display = 'block';
                const height = targetElement.scrollHeight;
                targetElement.style.height = '0px';
                targetElement.style.overflow = 'hidden';
                targetElement.style.transition = 'height 0.3s ease-out';
                
                // Force reflow
                targetElement.offsetHeight;
                
                targetElement.style.height = height + 'px';
                
                // Add show class for additional animations
                faqItem.classList.add('show');
                
                // Clean up after animation
                setTimeout(() => {
                    targetElement.style.height = 'auto';
                    targetElement.style.overflow = 'visible';
                }, 300);
                
            } else {
                // Closing
                const height = targetElement.scrollHeight;
                targetElement.style.height = height + 'px';
                targetElement.style.overflow = 'hidden';
                targetElement.style.transition = 'height 0.3s ease-out';
                
                // Force reflow
                targetElement.offsetHeight;
                
                targetElement.style.height = '0px';
                
                // Remove show class
                faqItem.classList.remove('show');
                
                // Hide after animation
                setTimeout(() => {
                    targetElement.style.display = 'none';
                    targetElement.style.height = '';
                    targetElement.style.overflow = '';
                    targetElement.style.transition = '';
                }, 300);
            }
            
            // Close other FAQ items (accordion behavior)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherTargetId = otherQuestion.getAttribute('data-bs-target');
                    const otherTargetElement = document.querySelector(otherTargetId);
                    const otherFaqItem = otherQuestion.closest('.faq-item');
                    
                    if (otherQuestion.getAttribute('aria-expanded') === 'true') {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        
                        const otherHeight = otherTargetElement.scrollHeight;
                        otherTargetElement.style.height = otherHeight + 'px';
                        otherTargetElement.style.overflow = 'hidden';
                        otherTargetElement.style.transition = 'height 0.3s ease-out';
                        
                        // Force reflow
                        otherTargetElement.offsetHeight;
                        
                        otherTargetElement.style.height = '0px';
                        otherFaqItem.classList.remove('show');
                        
                        setTimeout(() => {
                            otherTargetElement.style.display = 'none';
                            otherTargetElement.style.height = '';
                            otherTargetElement.style.overflow = '';
                            otherTargetElement.style.transition = '';
                        }, 300);
                    }
                }
            });
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Smooth scroll to FAQ section when linked
    const faqLinks = document.querySelectorAll('a[href="#faq"]');
    faqLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const faqSection = document.querySelector('#faq');
            if (faqSection) {
                faqSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animation on scroll
    const faqItems = document.querySelectorAll('.faq-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animationDelay = `${index * 0.1}s`;
        faqObserver.observe(item);
    });
}

// Additional utility functions for FAQ
function openFAQItem(itemId) {
    const faqQuestion = document.querySelector(`[data-bs-target="#${itemId}"]`);
    if (faqQuestion && faqQuestion.getAttribute('aria-expanded') !== 'true') {
        faqQuestion.click();
    }
}

function closeFAQItem(itemId) {
    const faqQuestion = document.querySelector(`[data-bs-target="#${itemId}"]`);
    if (faqQuestion && faqQuestion.getAttribute('aria-expanded') === 'true') {
        faqQuestion.click();
    }
}

function closeAllFAQItems() {
    const faqQuestions = document.querySelectorAll('.faq-question[aria-expanded="true"]');
    faqQuestions.forEach(question => {
        question.click();
    });
}

// Export functions for external use
window.FAQUtils = {
    open: openFAQItem,
    close: closeFAQItem,
    closeAll: closeAllFAQItems
};

