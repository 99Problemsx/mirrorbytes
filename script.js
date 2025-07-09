// Loading Screen Management
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initializeWebsite();
        }, 500);
    }, 2000);
});

// Initialize website after loading
function initializeWebsite() {
    initializeParticles();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeCounterAnimations();
    updateDiscordWidget(); // Lade Discord-Daten beim Start
    console.log('🎮 Mirrorbyte Studio geladen! Bereit für Pokemon Abenteuer! ⚡');
}

// Particle.js Configuration
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff6b6b', '#4ecdc4', '#ffd93d']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ff6b6b',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    bubble: {
                        distance: 200,
                        size: 8,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(255, 107, 107, 0.4)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(255, 107, 107, 0.2)';
    }
});

// Typing Effect for Hero Subtitle
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        'Pokemon Fangame Entwicklung',
        'Neue Regionen erschaffen',
        'Originale Pokemon Abenteuer',
        'Community-driven Development',
        'Epische Storylines kreieren'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetweenTexts = 2000;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            speed = pauseBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeText, speed);
    }

    typeText();
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('fangame-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }
                
                if (entry.target.classList.contains('discord-feature')) {
                    const delay = [...entry.target.parentNode.children].indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.fangame-card, .discord-feature, .stat-card, .tool, .highlight'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
}

// Counter Animations
function initializeCounterAnimations() {
    const counterElements = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Enhanced Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Fangame card hover effects
    const fangameCards = document.querySelectorAll('.fangame-card');
    fangameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect to pokemon icon
            const icon = card.querySelector('.pokemon-icon');
            if (icon) {
                icon.style.filter = 'drop-shadow(0 0 15px currentColor)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            const icon = card.querySelector('.pokemon-icon');
            if (icon) {
                icon.style.filter = 'none';
            }
        });
    });

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Circle progress animation
    const circleProgress = document.querySelector('.circle-progress');
    if (circleProgress) {
        const progressValue = parseInt(circleProgress.getAttribute('data-progress'));
        const progressCircle = circleProgress.parentElement;
        if (progressCircle && progressValue) {
            progressCircle.style.background = `conic-gradient(var(--primary-color) ${progressValue}%, var(--darker-bg) ${progressValue}%)`;
        }
    }
});

// Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const pokemonShadows = document.querySelectorAll('.pokemon-shadow');
    pokemonShadows.forEach((shadow, index) => {
        const speed = 0.5 + (index * 0.1);
        shadow.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });

    // Featured showcase parallax
    const gameScreen = document.querySelector('.mockup-screen');
    if (gameScreen) {
        const rate = scrolled * -0.3;
        gameScreen.style.transform = `rotateY(-15deg) rotateX(5deg) translateY(${rate}px)`;
    }
});

// Pokemon Battle Animation (Featured Section)
function initializeBattleAnimations() {
    const battlePokemon = document.querySelectorAll('.battle-pokemon');
    const battleEffects = document.querySelectorAll('.battle-effects > div');
    
    // Enhanced battle animations
    setInterval(() => {
        battlePokemon.forEach(pokemon => {
            pokemon.style.transform = 'translateY(-15px) scale(1.1)';
            setTimeout(() => {
                pokemon.style.transform = 'translateY(0) scale(1)';
            }, 300);
        });
    }, 4000);

    // Sparkle effects
    setInterval(() => {
        battleEffects.forEach(effect => {
            effect.style.transform = 'scale(1.5) rotate(180deg)';
            effect.style.opacity = '1';
            setTimeout(() => {
                effect.style.transform = 'scale(1) rotate(0deg)';
                effect.style.opacity = '0.7';
            }, 500);
        });
    }, 3000);
}

// Initialize battle animations when visible
const battleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initializeBattleAnimations();
            battleObserver.unobserve(entry.target);
        }
    });
});

const battleScene = document.querySelector('.pokemon-battle-scene');
if (battleScene) {
    battleObserver.observe(battleScene);
}

// Discord Widget Interactions
document.addEventListener('DOMContentLoaded', () => {
    const discordChannels = document.querySelectorAll('.channel');
    discordChannels.forEach(channel => {
        channel.addEventListener('click', () => {
            // Simulate channel selection
            discordChannels.forEach(c => c.style.background = 'transparent');
            channel.style.background = 'rgba(255, 255, 255, 0.1)';
            
            // Add typing indicator
            const activity = channel.querySelector('.channel-activity');
            const originalText = activity.textContent;
            activity.textContent = 'typing...';
            activity.style.color = '#57f287';
            
            setTimeout(() => {
                activity.textContent = originalText;
                activity.style.color = 'rgba(255, 255, 255, 0.6)';
                channel.style.background = 'transparent';
            }, 2000);
        });
    });

    // Discord join button effect
    const discordBtn = document.querySelector('.discord-join-btn');
    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(88, 101, 242, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            discordBtn.style.position = 'relative';
            discordBtn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                showNotification('Discord-Link wurde geöffnet! 🎮', 'discord');
            }, 600);
        });
    }
});

// Enhanced Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let backgroundColor;
    let icon;
    switch(type) {
        case 'discord':
            backgroundColor = '#5865f2';
            icon = '<i class="fab fa-discord"></i>';
            break;
        case 'success':
            backgroundColor = '#4ecdc4';
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            backgroundColor = '#ff6b6b';
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        default:
            backgroundColor = '#ffd93d';
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            ${icon}
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 0.8rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

// Add ripple effect keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        width: 100%;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Easter Egg: Konami Code
let konamiCode = [];
const konami = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konami.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    showNotification('🎉 Geheimer Pokemon-Entwickler Code aktiviert! 🎮', 'success');
    
    // Add special rainbow effect to logo
    const logo = document.querySelector('.logo-pokeball');
    if (logo) {
        logo.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            logo.style.animation = 'logo-glow 3s ease-in-out infinite';
        }, 10000);
    }
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounce scroll events for better performance
const debouncedScrollHandler = debounce((e) => {
    // Additional scroll-based effects can be added here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Auto-hide loading screen if particles.js fails to load
setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initializeWebsite();
        }, 500);
    }
}, 5000); 

// Discord Widget API Integration - Vereinfachte Version
async function updateDiscordWidget() {
    try {
        const discordInviteCode = 'TRn34MkT';
        
        // Verwende nur die Invite API für zuverlässige Daten
        const inviteApiUrl = `https://discord.com/api/v9/invites/${discordInviteCode}?with_counts=true`;
        
        const response = await fetch(inviteApiUrl);
        if (response.ok) {
            const data = await response.json();
            
            // Aktualisiere die Online-Anzeige mit echten Daten
            const onlineIndicator = document.querySelector('.online-indicator span');
            if (onlineIndicator && data.approximate_presence_count !== undefined) {
                onlineIndicator.textContent = `${data.approximate_presence_count} online`;
            }
            
            // Aktualisiere die Kanäle mit echten Server-Informationen
            const channelElements = document.querySelectorAll('.channel');
            if (channelElements.length > 0) {
                // Zeige echte Server-Informationen statt Dummy-Kanäle
                const serverInfo = [
                    {
                        name: 'allgemein',
                        activity: `${data.approximate_member_count || 0} Mitglieder`
                    },
                    {
                        name: 'entwicklung',
                        activity: `${data.approximate_presence_count || 0} online`
                    },
                    {
                        name: 'updates',
                        activity: 'Neuigkeiten'
                    }
                ];
                
                channelElements.forEach((channelEl, index) => {
                    if (serverInfo[index]) {
                        const channelName = channelEl.querySelector('span');
                        const channelActivity = channelEl.querySelector('.channel-activity');
                        
                        if (channelName) {
                            channelName.textContent = serverInfo[index].name;
                        }
                        if (channelActivity) {
                            channelActivity.textContent = serverInfo[index].activity;
                        }
                    }
                });
            }
            
            console.log(`Discord-Daten aktualisiert: ${data.approximate_presence_count} online von ${data.approximate_member_count} Mitgliedern`);
        } else {
            console.log('Discord API nicht verfügbar, verwende Standardwerte');
        }
    } catch (error) {
        console.log('Fehler beim Laden der Discord-Daten:', error);
        // Fallback zu Standardwerten bleibt bestehen
    }
}

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Initialize Discord widget when page loads
setInterval(updateDiscordWidget, 5000); 
