// Modern JavaScript for WatchMe Marketing Site

// Utility Functions
const utils = {
    // Throttle function for performance optimization
    throttle: (func, limit) => {
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
    },

    // Debounce function for scroll events
    debounce: (func, wait, immediate) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Navigation Scroll Effect
class NavigationController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 100));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            // Scrolling down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScrollController {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Animated Counter for Statistics
class AnimatedCounter {
    constructor(element, finalValue, duration = 2000) {
        this.element = element;
        this.finalValue = finalValue;
        this.duration = duration;
        this.startValue = 0;
        this.hasStarted = false;
    }

    start() {
        if (this.hasStarted) return;
        this.hasStarted = true;

        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);
            
            // Easing function (easeOutQuart)
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(this.startValue + (this.finalValue - this.startValue) * easedProgress);
            this.element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Intersection Observer for Animations
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );

        // Observe elements
        this.observeElements();
        this.setupCounters();
    }

    observeElements() {
        // Feature cards animation
        document.querySelectorAll('.feature-card, .case-card, .pricing-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(card);
        });

        // Section headers animation
        document.querySelectorAll('.section-header').forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(20px)';
            header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            this.observer.observe(header);
        });
    }

    setupCounters() {
        // Example: Add counter elements to dashboard preview
        const emotionScore = document.querySelector('.score-value');
        if (emotionScore) {
            const counter = new AnimatedCounter(emotionScore, 73);
            this.observer.observe(emotionScore.parentElement);
            
            // Store counter reference for later use
            emotionScore.parentElement.counter = counter;
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate element into view
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Start counter if it exists
                if (entry.target.counter) {
                    entry.target.counter.start();
                }
                
                // Stop observing this element
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Floating Cards Animation in Hero Section
class FloatingAnimation {
    constructor() {
        this.cards = document.querySelectorAll('.floating-card');
        this.init();
    }

    init() {
        this.cards.forEach((card, index) => {
            // Add slight delay to each card
            card.style.animationDelay = `${index * 0.5}s`;
            
            // Add mouse interaction
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        });
    }

    handleMouseEnter(e) {
        e.target.style.animationPlayState = 'paused';
        e.target.style.transform = 'translateY(-15px) scale(1.05)';
    }

    handleMouseLeave(e) {
        e.target.style.animationPlayState = 'running';
        e.target.style.transform = '';
    }
}

// Button Interaction Effects
class ButtonController {
    constructor() {
        this.init();
    }

    init() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .plan-button').forEach(button => {
            button.addEventListener('click', this.createRipple.bind(this));
        });

        // Add hover effects to CTA buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mouseenter', this.handleCTAHover.bind(this));
            button.addEventListener('mouseleave', this.handleCTALeave.bind(this));
        });
    }

    createRipple(e) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    handleCTAHover(e) {
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
    }

    handleCTALeave(e) {
        e.target.style.transform = '';
    }
}

// Parallax Effect for Hero Section
class ParallaxController {
    constructor() {
        this.heroSection = document.querySelector('.hero');
        this.parallaxElements = document.querySelectorAll('.floating-card');
        this.init();
    }

    init() {
        if (window.innerWidth > 768) { // Only enable on desktop
            window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 16));
        }
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const heroBottom = this.heroSection.offsetTop + this.heroSection.offsetHeight;
        
        if (scrolled <= heroBottom) {
            this.parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
}

// Form Handling (for future contact forms)
class FormController {
    constructor() {
        this.init();
    }

    init() {
        // Handle demo button clicks
        document.querySelectorAll('[data-action="demo"]').forEach(button => {
            button.addEventListener('click', this.handleDemoRequest.bind(this));
        });

        // Handle trial button clicks
        document.querySelectorAll('[data-action="trial"]').forEach(button => {
            button.addEventListener('click', this.handleTrialRequest.bind(this));
        });
    }

    handleDemoRequest(e) {
        e.preventDefault();
        // Placeholder for demo request
        this.showNotification('デモの予約ページに移動します', 'info');
    }

    handleTrialRequest(e) {
        e.preventDefault();
        // Placeholder for trial signup
        this.showNotification('無料トライアルページに移動します', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Mobile Menu Controller
class MobileMenuController {
    constructor() {
        this.init();
    }

    init() {
        // Create mobile menu button
        this.createMobileMenuButton();
        this.handleResize();
        
        window.addEventListener('resize', utils.debounce(this.handleResize.bind(this), 250));
    }

    createMobileMenuButton() {
        const navContainer = document.querySelector('.nav-container');
        const mobileButton = document.createElement('button');
        mobileButton.className = 'mobile-menu-button';
        mobileButton.innerHTML = '☰';
        mobileButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-primary);
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        navContainer.appendChild(mobileButton);
        
        mobileButton.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    handleResize() {
        const mobileButton = document.querySelector('.mobile-menu-button');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            mobileButton.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            mobileButton.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const isVisible = navMenu.style.display === 'flex';
        
        navMenu.style.display = isVisible ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'white';
        navMenu.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navMenu.style.padding = '1rem';
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', this.logPerformance.bind(this));
    }

    logPerformance() {
        if ('performance' in window) {
            const perf = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                'DOM Content Loaded': `${perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart}ms`,
                'Load Complete': `${perf.loadEventEnd - perf.loadEventStart}ms`,
                'Total Load Time': `${perf.loadEventEnd - perf.navigationStart}ms`
            });
        }
    }
}

// Initialize All Controllers
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all controllers
    new NavigationController();
    new SmoothScrollController();
    new AnimationController();
    new FloatingAnimation();
    new ButtonController();
    new ParallaxController();
    new FormController();
    new MobileMenuController();
    new PerformanceMonitor();

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
        }
        
        .notification {
            font-weight: 500;
            font-size: 0.875rem;
        }
    `;
    document.head.appendChild(style);

    // Add loading indicator removal
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 500);
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationController,
        SmoothScrollController,
        AnimationController,
        FloatingAnimation,
        ButtonController,
        ParallaxController,
        FormController,
        MobileMenuController,
        PerformanceMonitor,
        utils
    };
}