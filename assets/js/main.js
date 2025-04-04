/**
 * Backbone Agency - Script principal
 * Fonctionnalités : animations, compteur, toggle thème, texte rotatif, easter egg
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des fonctionnalités
    initFadeInElements();
    initCounters();
    initThemeToggle();
    initRotatingText();
    initEasterEgg();
    initMobileMenu();
    
    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree gère la soumission, cette fonction peut être utilisée pour validation
            console.log('Formulaire soumis');
        });
    }
});

/**
 * Animation des éléments avec fade-in au scroll
 */
function initFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
    
    // Fonction pour animer les éléments visibles
    const handleScroll = () => {
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    };
    
    // Vérifier les éléments visibles au chargement
    handleScroll();
    
    // Ajouter l'écouteur d'événement de défilement
    window.addEventListener('scroll', handleScroll);
}

/**
 * Animation des compteurs
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Vitesse d'animation (ms)
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    // Observer pour démarrer l'animation quand les compteurs sont visibles
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

/**
 * Toggle thème clair/sombre
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Vérifier si un thème est déjà enregistré
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(themeIcon, currentTheme);
    }
    
    // Fonction pour mettre à jour l'icône du thème
    function updateThemeIcon(icon, theme) {
        if (theme === 'dark') {
            icon.setAttribute('data-feather', 'sun');
        } else {
            icon.setAttribute('data-feather', 'moon');
        }
        feather.replace();
    }
    
    // Ajouter l'écouteur d'événement pour le bouton de thème
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(themeIcon, newTheme);
    });
}

/**
 * Texte rotatif pour "Projet du moment"
 */
function initRotatingText() {
    const textRotateElement = document.querySelector('.text-rotate');
    if (!textRotateElement) return;
    
    const texts = JSON.parse(textRotateElement.getAttribute('data-rotate'));
    let currentIndex = 0;
    
    // Fonction pour changer le texte avec animation
    const rotateText = () => {
        textRotateElement.style.opacity = '0';
        textRotateElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            textRotateElement.textContent = texts[currentIndex];
            currentIndex = (currentIndex + 1) % texts.length;
            
            textRotateElement.style.opacity = '1';
            textRotateElement.style.transform = 'translateY(0)';
        }, 500);
    };
    
    // Initialiser le premier texte
    textRotateElement.textContent = texts[0];
    textRotateElement.style.opacity = '1';
    textRotateElement.style.transform = 'translateY(0)';
    
    // Changer le texte toutes les 3 secondes
    setInterval(rotateText, 3000);
}

/**
 * Easter Egg (triple clic sur le logo)
 */
function initEasterEgg() {
    const logoLink = document.getElementById('logo-link');
    let clickCount = 0;
    let clickTimer;
    
    logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        clickCount++;
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 800);
        
        if (clickCount === 3) {
            triggerEasterEgg();
            clickCount = 0;
        }
    });
    
    function triggerEasterEgg() {
        // Créer un élément pour l'animation
        const easterEgg = document.createElement('div');
        easterEgg.classList.add('easter-egg');
        easterEgg.innerHTML = `
            <div class="easter-egg-content">
                <h3>BOOM !</h3>
                <p>Code : BADASS10</p>
            </div>
        `;
        
        // Ajouter des styles pour l'animation
        const style = document.createElement('style');
        style.textContent = `
            .easter-egg {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                animation: easterEggFadeIn 0.3s ease-in-out, easterEggFadeOut 0.3s ease-in-out 2.7s forwards;
            }
            
            .easter-egg-content {
                text-align: center;
                color: var(--color-accent);
                animation: easterEggPulse 0.5s ease-in-out infinite alternate;
            }
            
            .easter-egg-content h3 {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            
            .easter-egg-content p {
                font-size: 2rem;
                color: var(--color-white);
            }
            
            @keyframes easterEggFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes easterEggFadeOut {
                from { opacity: 1; }
                to { opacity: 0; visibility: hidden; }
            }
            
            @keyframes easterEggPulse {
                from { transform: scale(1); }
                to { transform: scale(1.1); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(easterEgg);
        
        // Supprimer l'élément après l'animation
        setTimeout(() => {
            document.body.removeChild(easterEgg);
        }, 3000);
    }
}

/**
 * Menu mobile
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn button');
    const nav = document.querySelector('.nav');
    
    if (!mobileMenuBtn || !nav) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Mettre à jour l'icône
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.setAttribute('data-feather', 'x');
        } else {
            icon.setAttribute('data-feather', 'menu');
        }
        feather.replace();
    });
    
    // Ajouter des styles pour le menu mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav.active {
                display: block;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: var(--color-white);
                box-shadow: var(--shadow-md);
                padding: 1rem;
                z-index: 999;
            }
            
            [data-theme="dark"] .nav.active {
                background-color: var(--color-primary);
            }
            
            .nav.active ul {
                flex-direction: column;
                gap: 1rem;
            }
            
            .nav.active a {
                display: block;
                padding: 0.5rem 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Initialisation du chatbot (placeholder pour Tawk.to)
 * Note: Remplacer l'ID par celui de votre compte Tawk.to
 */
function initChatbot() {
    // Code d'intégration Tawk.to (à remplacer par le vôtre)
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/YOUR_TAWK_ID/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
    
    // Commenté pour éviter les erreurs sans ID valide
    // Décommenter et remplacer YOUR_TAWK_ID par votre ID Tawk.to pour activer
}
