document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Update
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        if (body.style.overflow === 'hidden') {
            body.style.overflow = '';
        } else {
            body.style.overflow = 'hidden';
        }
    };

    if (hamburger && mobileNav && overlay) {
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 3. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.closest('.faq-item');
            const isActive = currentItem.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current
            if (!isActive) {
                currentItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Header Shadow on Scroll
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 6. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Scroll Animation (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-in');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animateElements.forEach(el => el.classList.add('visible'));
    }

    // 8. Active Nav Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    
    const navHighlighter = () => {
        let scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', navHighlighter, { passive: true });

    // 9. WhatsApp Click Tracking
    window.dataLayer = window.dataLayer || [];
    document.querySelectorAll('.whatsapp-cta').forEach(btn => {
        btn.addEventListener('click', function() {
            window.dataLayer.push({
                'event': 'whatsapp_click',
                'whatsapp_location': this.dataset.location || 'floating'
            });
        });
    });
});
