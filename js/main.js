// ============================================
// HERO - ROTACIÓN DE VIDEOS DE FONDO
// ============================================

function initHeroVideos() {
    const videos = document.querySelectorAll('.hero-video');
    if (videos.length === 0) return;

    function switchToVideo(index) {
        videos.forEach(function(video, i) {
            if (i === index) {
                video.classList.add('active');
                video.currentTime = 0;
                video.play().catch(function() {});
            } else {
                video.classList.remove('active');
                video.pause();
            }
        });
    }

    videos.forEach(function(video, index) {
        video.addEventListener('ended', function() {
            switchToVideo((index + 1) % videos.length);
        });
    });

    switchToVideo(0);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroVideos);
} else {
    initHeroVideos();
}

// ============================================
// NAVEGACIÓN Y MENÚ MÓVIL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Throttle function para optimizar scroll
    function throttle(func, wait) {
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

    // Navbar scroll effect (optimizado con throttle)
    let lastScroll = 0;
    const handleScroll = throttle(function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Activar link activo según scroll
        updateActiveNavLink();
        
        // Mostrar/ocultar botón volver arriba
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            if (currentScroll > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
        
        lastScroll = currentScroll;
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Actualizar link activo en navegación
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Smooth scroll para links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// CARGAR LOGOS DE MARCAS - CAROUSEL
// ============================================

function loadBrands() {
    const brandsCarousel = document.getElementById('brandsCarousel');
    if (!brandsCarousel) {
        console.error('❌ brandsCarousel no encontrado');
        return;
    }

    console.log('✅ Iniciando carga de logos...');
    console.log('📍 Contenedor encontrado:', brandsCarousel);

    // Limpiar carousel antes de cargar
    brandsCarousel.innerHTML = '';

    // Generar números de logos (1-45)
    const logoNumbers = [];
    for (let i = 1; i <= 45; i++) {
        logoNumbers.push(i);
    }

    let loadedCount = 0;
    let errorCount = 0;

    // Crear elementos de marca (duplicar para efecto infinito)
    const createBrandItems = (numbers) => {
        numbers.forEach(num => {
            const brandItem = document.createElement('div');
            brandItem.className = 'brand-item';
            
            // Estilos inline para forzar visibilidad
            brandItem.style.cssText = 'opacity: 0.9 !important; visibility: visible !important; display: flex !important; background-color: transparent; padding: 1rem; align-items: center; justify-content: center; height: 120px; min-width: 150px; max-width: 200px; border: 1px solid rgba(255, 255, 255, 0.1); flex-shrink: 0;';
            
            const img = document.createElement('img');
            img.src = `marcas/logo${num}.png`;
            img.alt = `Cliente ${num}`;
            img.loading = 'lazy';
            
            // Estilos inline para forzar visibilidad de la imagen
            img.style.cssText = 'max-width: 100% !important; max-height: 80px !important; width: auto !important; height: auto !important; object-fit: contain !important; filter: brightness(0) invert(1) !important; display: block !important; visibility: visible !important; opacity: 1 !important;';
            
            // Manejar errores de carga
            img.onerror = function() {
                errorCount++;
                console.warn(`⚠️ Error cargando logo${num}.png`);
                brandItem.style.display = 'none';
            };
            
            // Confirmar carga exitosa
            img.onload = function() {
                loadedCount++;
                console.log(`✅ Logo ${num} cargado correctamente`);
            };
            
            brandItem.appendChild(img);
            brandsCarousel.appendChild(brandItem);
        });
    };

    // Crear dos sets para efecto infinito
    createBrandItems(logoNumbers);
    createBrandItems(logoNumbers);
    
    console.log(`📊 Total items creados: ${brandsCarousel.children.length}`);
    
    // Log después de un breve delay para ver resultados
    setTimeout(() => {
        console.log(`✅ Logos cargados: ${loadedCount}, ❌ Errores: ${errorCount}, 📦 Total items en DOM: ${brandsCarousel.children.length}`);
        if (brandsCarousel.children.length === 0) {
            console.error('❌ CRÍTICO: No se crearon elementos en el carousel');
        }
    }, 2000);
}

// Cargar marcas cuando el DOM esté listo
function initBrands() {
    // Intentar múltiples veces para asegurar que el DOM esté listo
    if (document.getElementById('brandsCarousel')) {
        loadBrands();
    } else {
        // Si no está listo, esperar un poco más
        setTimeout(initBrands, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrands);
} else {
    // DOM ya está listo
    initBrands();
}

// También intentar después de que la ventana cargue completamente
window.addEventListener('load', function() {
    if (document.getElementById('brandsCarousel') && document.getElementById('brandsCarousel').children.length === 0) {
        loadBrands();
    }
});

// ============================================
// FORMULARIO DE CONTACTO (MEJORADO)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Deshabilitar botón durante el envío
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
            }

            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            
            // Mostrar mensaje de carga
            formMessage.textContent = 'Enviando mensaje...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';

            // Enviar formulario
            fetch('php/contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    formMessage.textContent = '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                    
                    // Scroll suave al mensaje
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    formMessage.textContent = data.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
                    formMessage.className = 'form-message error';
                }
            })
            .catch(error => {
                formMessage.textContent = 'Error de conexión. Por favor, intenta nuevamente más tarde.';
                formMessage.className = 'form-message error';
                console.error('Error:', error);
            })
            .finally(() => {
                // Rehabilitar botón
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensaje';
                }
            });
        });
    }
});

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.area-card, .professional-card, .philosophy-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// EFECTOS ADICIONALES
// ============================================

// Parallax suave en hero
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
});

// ============================================
// BOTÓN VOLVER ARRIBA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ============================================
// LAZY LOADING OPTIMIZADO
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    // Lazy loading nativo ya está implementado en las imágenes
    // Solo necesitamos asegurarnos de que todas las imágenes lo usen
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        // No aplicar lazy loading al logo principal
        if (!img.classList.contains('logo-img')) {
            img.loading = 'lazy';
        }
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// MEJORAS DE RENDIMIENTO
// ============================================

// Intersection Observer ya está definido arriba en la sección de animaciones
// Los elementos ya se observan en la sección de animaciones al scroll

