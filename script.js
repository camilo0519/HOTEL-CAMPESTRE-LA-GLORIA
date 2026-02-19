// ===================================
// Hotel Campestre La Gloria - JavaScript
// Interactive Functionality
// ===================================

// === DOM Elements ===
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// === Navbar Scroll Effect ===
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// === Mobile Menu Toggle ===
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (spans.length === 3) {
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
}

// === Close Mobile Menu on Link Click ===
if (navLinks.length > 0 && navMenu && hamburger) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');

            // Reset hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

// === Smooth Scrolling for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// === Contact Form Validation & Submission ===
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const telefonoInput = document.getElementById('telefono');
        const tipoCabanaInput = document.getElementById('tipo-cabana');
        const mensajeInput = document.getElementById('mensaje');

        const nombre = nombreInput ? nombreInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const telefono = telefonoInput ? telefonoInput.value.trim() : '';
        const tipoCabana = tipoCabanaInput ? tipoCabanaInput.value : '';
        const mensaje = mensajeInput ? mensajeInput.value.trim() : '';

        // Basic validation
        if (!nombre || !email || !telefono || !tipoCabana || !mensaje) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Por favor, ingresa un email válido', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(telefono)) {
            showNotification('Por favor, ingresa un teléfono válido', 'error');
            return;
        }

        // Simulate form submission
        showNotification('¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.', 'success');

        // Reset form
        contactForm.reset();
    });

    // === Prevent Default Form Submission on Enter in Text Inputs ===
    const formInputs = contactForm.querySelectorAll('input');
    formInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.type !== 'submit') {
                e.preventDefault();
            }
        });
    });
}

// === Notification System ===
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#6B8E23' : '#d32f2f'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add animation styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Append to body
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// === Gallery Image Interaction ===
const galleryImages = document.querySelectorAll('.cabin-gallery img');
if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt);
        });
    });
}

// === Lightbox for Gallery Images ===
function openLightbox(imageSrc, imageAlt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;

    // Create image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        animation: zoomIn 0.3s ease;
    `;

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 3rem;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease;
    `;

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.2)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
    });

    // Add animation styles if not present
    if (!document.getElementById('lightbox-styles')) {
        const style = document.createElement('style');
        style.id = 'lightbox-styles';
        style.textContent = `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes zoomIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        `;
        document.head.appendChild(style);
    }

    // Append elements
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Close lightbox on click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });
}

// === Scroll Reveal Animation ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
const revealElements = document.querySelectorAll('.highlight-card, .cabin-detail, .about-grid');
if (revealElements.length > 0) {
    revealElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// === Carousel Logic ===
class Carousel {
    constructor(containerId, interval = 5000) {
        this.container = document.getElementById(containerId);
        if (!this.container) return; // Exit if container doesn't exist

        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.indicators = this.container.querySelectorAll('.indicator');
        this.prevBtn = this.container.querySelector('.carousel-btn.prev');
        this.nextBtn = this.container.querySelector('.carousel-btn.next');

        this.currentSlide = 0;
        this.slideInterval = interval;
        this.timer = null;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Ensure first slide is active
        this.showSlide(0);

        // Start auto-play
        this.startTimer();

        // Event Listeners for Indicators
        if (this.indicators.length > 0) {
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.resetTimer();
                    this.showSlide(index);
                });
            });
        }

        // Event Listeners for Buttons (if they exist)
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.resetTimer();
                this.prevSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.resetTimer();
                this.nextSlide();
            });
        }
    }

    showSlide(index) {
        // Handle wrapping
        if (index >= this.slides.length) {
            this.currentSlide = 0;
        } else if (index < 0) {
            this.currentSlide = this.slides.length - 1;
        } else {
            this.currentSlide = index;
        }

        // Remove active class
        this.slides.forEach(slide => slide.classList.remove('active'));
        if (this.indicators.length > 0) {
            this.indicators.forEach(indicator => indicator.classList.remove('active'));
        }

        // Add active class
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.add('active');
        }
        if (this.indicators[this.currentSlide]) {
            this.indicators[this.currentSlide].classList.add('active');
        }
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }

    startTimer() {
        this.timer = setInterval(() => this.nextSlide(), this.slideInterval);
    }

    resetTimer() {
        if (this.timer) clearInterval(this.timer);
        this.startTimer();
    }
}

// Initialize Carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hero Carousel (Index) - Targeting parent section to find indicators that are siblings to the content
    new Carousel('inicio', 6000);

    // Hospedajes Carousels
    new Carousel('carousel-suite', 5000);
    new Carousel('carousel-standard', 5000);
    new Carousel('carousel-glamping', 5000);

    // Cabañas Carousels
    new Carousel('carousel-grupal', 5000);
    new Carousel('carousel-pareja', 5000);

    // Iglú Carousel
    new Carousel('carousel-iglu', 5000);

    console.log('✅ Carousels initialized');
});

// === Console Welcome Message ===
console.log('%c🏨 Hotel Campestre La Gloria', 'font-size: 20px; font-weight: bold; color: #6B8E23;');
console.log('%cBienvenido a tu refugio de tranquilidad en el Lago Calima', 'font-size: 14px; color: #8B7355;');

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Website loaded successfully');
});
