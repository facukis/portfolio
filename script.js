// Elementos del DOM
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const scrollTopBtn = document.getElementById('scrollTop');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');

// Funcionalidad de navegación móvil
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Efecto scroll en navbar
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Cambiar apariencia del navbar al hacer scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar botón scroll to top
    if (scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Funcionalidad del botón scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navegación activa basada en scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Animaciones de entrada en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Aplicar observer a elementos que necesitan animación
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .stat, .contact-item');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Efecto de escritura en el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animación de contadores en las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observer para animaciones de contadores
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');        statNumbers.forEach((stat, index) => {
            const targetValue = [15, 3, 2][index]; // Updated values: 15+ Technologies, 3+ Programming Languages, 2+ CS50 Certificates
            setTimeout(() => {
                animateCounter(stat, targetValue);
            }, index * 200);
        });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Aplicar observer a la sección de estadísticas
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    counterObserver.observe(aboutStats);
}

// Funcionalidad del formulario de contacto
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const nombre = formData.get('nombre') || e.target[0].value;
    const email = formData.get('email') || e.target[1].value;
    const asunto = formData.get('asunto') || e.target[2].value;
    const mensaje = formData.get('mensaje') || e.target[3].value;
    
    // Simular envío (aquí puedes integrar con tu backend o servicio de email)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular tiempo de envío
    setTimeout(() => {
        submitBtn.textContent = '¡Enviado!';
        submitBtn.style.background = '#4ade80';
        
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
        
        // Resetear formulario
        contactForm.reset();
        
        // Restaurar botón después de unos segundos
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Colores según el tipo
    const colors = {
        success: '#4ade80',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efecto parallax suave para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .hero-image');
    const speed = 0.5;
    
    parallaxElements.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Efecto de partículas en el fondo (opcional)
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    Object.assign(particle.style, {
        position: 'fixed',
        width: '4px',
        height: '4px',
        background: 'rgba(100, 255, 218, 0.3)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '1',
        left: Math.random() * window.innerWidth + 'px',
        top: window.innerHeight + 'px',
        opacity: '0'
    });
    
    document.body.appendChild(particle);
    
    // Animar partícula
    const animation = particle.animate([
        { 
            transform: 'translateY(0) translateX(0)', 
            opacity: 0 
        },
        { 
            transform: `translateY(-${window.innerHeight + 100}px) translateX(${(Math.random() - 0.5) * 200}px)`, 
            opacity: 1 
        },
        { 
            transform: `translateY(-${window.innerHeight + 200}px) translateX(${(Math.random() - 0.5) * 400}px)`, 
            opacity: 0 
        }
    ], {
        duration: 8000 + Math.random() * 4000,
        easing: 'linear'
    });
    
    animation.onfinish = () => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    };
}

// Crear partículas ocasionalmente
setInterval(createParticle, 3000);

// Efecto de hover en las tarjetas de proyecto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efecto de loading inicial
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Iniciar animaciones de entrada
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'slideInLeft 1s ease-out';
        }, 200);
    }
});

// Smooth scrolling para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Detectar si el usuario prefiere motion reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar animaciones complejas para usuarios que prefieren menos movimiento
    document.documentElement.style.setProperty('--transition-fast', '0.1s');
    document.documentElement.style.setProperty('--transition-medium', '0.2s');
    document.documentElement.style.setProperty('--transition-slow', '0.3s');
}

// Función para copiar email al clipboard
function copyEmail() {
    const email = 'pon-aqui-tu-email@example.com'; // Cambiar por tu email real
    navigator.clipboard.writeText(email).then(() => {
        showNotification('¡Email copiado al portapapeles!', 'success');
    }).catch(() => {
        showNotification('No se pudo copiar el email', 'error');
    });
}

// Agregar funcionalidad de copia al hacer click en el email
const emailElement = document.querySelector('.contact-text p');
if (emailElement && emailElement.textContent.includes('@')) {
    emailElement.style.cursor = 'pointer';
    emailElement.addEventListener('click', copyEmail);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > 10) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activado
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('¡Easter egg activado! 🎉', 'success');
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        
        konamiCode = [];
    }
});

// Funcionalidad de tema (por si quieres agregar un toggle light/dark)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Performance optimization: Lazy loading para imágenes
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
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

console.log('🚀 Portfolio cargado correctamente!');
console.log('💡 Tip: Presiona la secuencia Konami para una sorpresa!');
