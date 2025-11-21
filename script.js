// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const header = document.getElementById('header');

menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('active');
    
    // Animación del botón hamburguesa
    const spans = menuToggle.querySelectorAll('span');
    if (navMobile.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer click en un enlace
const mobileLinks = navMobile.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Efecto 3D del vidrio siguiendo el mouse
const glass3d = document.getElementById('glass3d');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    glass3d.style.transform = `perspective(1000px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
});

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animación de entrada para las tarjetas de servicios
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las tarjetas de servicios
const servicioCards = document.querySelectorAll('.servicio-card');
servicioCards.forEach(card => observer.observe(card));

// Observar items de galería
const galeriaItems = document.querySelectorAll('.galeria-item');
galeriaItems.forEach(item => observer.observe(item));

// Animación de números (si quieres agregar contadores)
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animación de escritura para el título (opcional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Descomentar para activar efecto de escritura
    // setTimeout(typeWriter, 500);
}

// Prevenir comportamiento por defecto del formulario
const contactForm = document.querySelector('.contacto-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('.btn-block');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const telefono = contactForm.querySelector('input[type="tel"]').value;
        const mensaje = contactForm.querySelector('textarea').value;
        
        // Validación básica
        if (!nombre || !email || !telefono || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Crear mensaje para WhatsApp
        const whatsappMessage = `Hola! Me llamo ${nombre}.%0A%0AEmail: ${email}%0ATeléfono: ${telefono}%0A%0AMensaje: ${mensaje}`;
        const whatsappURL = `https://wa.me/598096799032?text=${whatsappMessage}`;
        
        // Abrir WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Limpiar formulario
        contactForm.querySelector('input[type="text"]').value = '';
        contactForm.querySelector('input[type="email"]').value = '';
        contactForm.querySelector('input[type="tel"]').value = '';
        contactForm.querySelector('textarea').value = '';
        
        // Mensaje de confirmación
        alert('¡Gracias! Serás redirigido a WhatsApp para enviar tu mensaje.');
    });
}

// Añadir efecto de ripple a los botones
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Añadir estilos para el ripple
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Detectar si es mobile para ajustar efectos
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Desactivar efecto 3D del vidrio en móviles para mejor rendimiento
    glass3d.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
}

console.log('Vidrieria El Reflejo - Website loaded successfully! 💎');