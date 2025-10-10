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
        // 初期状態で透明背景（常に表示）
        this.navbar.style.transform = 'translateY(0)';
        this.navbar.style.transition = 'transform 0.3s ease-in-out, background 0.3s ease-in-out';

        // スクロールイベント（throttle使用）
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 100));

        // 初回実行（ページ読み込み時のスクロール位置を確認）
        this.handleScroll();
    }

    handleScroll() {
        // モバイル対応：複数の方法でスクロール位置を取得
        const scrollTop = window.pageYOffset ||
                         document.documentElement.scrollTop ||
                         document.body.scrollTop ||
                         0;

        // 100px以上スクロールしたらすりガラス背景を表示
        // 100px未満で透明背景に戻る
        if (scrollTop > 100) {
            if (!this.navbar.classList.contains('scrolled')) {
                this.navbar.classList.add('scrolled');
            }
        } else {
            if (this.navbar.classList.contains('scrolled')) {
                this.navbar.classList.remove('scrolled');
            }
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
        this.logoTop = document.querySelector('.hero-logo-top');
        this.logoMiddle = document.querySelector('.hero-logo-middle');
        this.logoBottom = document.querySelector('.hero-logo-bottom');
        this.init();
    }

    init() {
        // デスクトップ・モバイル両方で初期化、handleScroll内で判定
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 16));
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const heroBottom = this.heroSection.offsetTop + this.heroSection.offsetHeight;

        if (scrolled <= heroBottom) {
            // ロゴのパララックス効果（速度: 0.5）
            // 上のロゴ: 左に移動
            if (this.logoTop) {
                const topSpeed = 0.5;
                const topX = -(scrolled * topSpeed);
                this.logoTop.style.transform = `translateX(calc(-50% + ${topX}px))`;
            }

            // 真ん中のロゴ: 右に移動
            if (this.logoMiddle) {
                const middleSpeed = 0.5;
                const middleX = (scrolled * middleSpeed);
                this.logoMiddle.style.transform = `translateX(calc(-50% + ${middleX}px))`;
            }

            // 下のロゴ: 左に移動
            if (this.logoBottom) {
                const bottomSpeed = 0.5;
                const bottomX = -(scrolled * bottomSpeed);
                this.logoBottom.style.transform = `translateX(calc(-50% + ${bottomX}px))`;
            }

            // 人物画像のパララックス効果
            // ピンクの人物: 左から右（速度: 0.25）
            const personPinkSpeed = 0.25;
            const personPinkX = (scrolled * personPinkSpeed);

            const personPink = document.querySelector('.hero-person-pink-image');
            if (personPink) {
                personPink.style.transform = `translateX(${personPinkX}px)`;
            }

            // 青と緑の人物: 左から右（速度: 0.125 = ピンクの半分）
            const personSlowSpeed = 0.125;
            const personSlowX = (scrolled * personSlowSpeed);

            const personBlue = document.querySelector('.hero-person-blue-image');
            if (personBlue) {
                personBlue.style.transform = `translateX(${personSlowX}px) translateY(50%)`;
            }

            const personGreen = document.querySelector('.hero-person-green-image');
            if (personGreen) {
                personGreen.style.transform = `translateX(${personSlowX}px) translateY(20%)`;
            }

            // デバイス画像のパララックス効果: 下から上に移動
            // 重要: CSSの初期値と合わせる必要がある
            // PC版CSS: translateY(-25%)
            // モバイル版CSS: translateY(-12.5%)
            const deviceSpeed = 0.3;
            const deviceY = -(scrolled * deviceSpeed);

            const deviceImage = document.querySelector('.hero-device-image');
            if (deviceImage) {
                // モバイル判定してCSSの初期値と一致させる
                const isDesktop = window.innerWidth > 768;
                const baseOffset = isDesktop ? '-25%' : '-12.5%';
                deviceImage.style.transform = `translateY(calc(${baseOffset} + ${deviceY}px))`;
            }

            // デバイス周りのアイコンのパララックス効果: 下から上に移動（デバイスの1/4の速さ）
            const iconSpeed = 0.075; // 0.3 ÷ 4 = 0.075
            const iconY = -(scrolled * iconSpeed);

            const icon1 = document.querySelector('.hero-device-icon-1');
            const icon2 = document.querySelector('.hero-device-icon-2');
            const icon3 = document.querySelector('.hero-device-icon-3');

            if (icon1) {
                icon1.style.transform = `translateY(${iconY}px)`;
            }
            if (icon2) {
                icon2.style.transform = `translateY(${iconY}px)`;
            }
            if (icon3) {
                icon3.style.transform = `translateY(${iconY}px)`;
            }
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
        mobileButton.innerHTML = `
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <line x1="6" y1="13" x2="30" y2="13" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="6" y1="23" x2="30" y2="23" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        `;
        mobileButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            padding: 0.5rem;
            line-height: 0;
        `;

        navContainer.appendChild(mobileButton);

        mobileButton.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    handleResize() {
        const mobileButton = document.querySelector('.mobile-menu-button');
        const navMenu = document.querySelector('.nav-menu');

        if (window.innerWidth <= 768) {
            mobileButton.style.display = 'block';
            // モバイル時はメニューを閉じる
            this.closeMobileMenu();
        } else {
            mobileButton.style.display = 'none';
            // デスクトップ時は元に戻す
            navMenu.style.cssText = '';
            navMenu.style.display = 'flex';
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const isOpen = navMenu.classList.contains('mobile-menu-open');

        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.add('mobile-menu-open');

        // メニューコンテナのスタイル
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'fixed';
        navMenu.style.top = '0';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.bottom = '0';
        navMenu.style.width = '100vw';
        navMenu.style.height = '100vh';
        navMenu.style.background = 'rgba(0, 0, 0, 0.95)';
        navMenu.style.zIndex = '9999';
        navMenu.style.justifyContent = 'center';
        navMenu.style.alignItems = 'flex-start';
        navMenu.style.gap = '2rem';
        navMenu.style.padding = '6rem 3rem 3rem 3rem';
        navMenu.style.opacity = '0';
        navMenu.style.transition = 'opacity 0.3s ease';

        // 閉じるボタンを作成
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-menu-close';
        closeButton.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <line x1="8" y1="8" x2="24" y2="24" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <line x1="24" y1="8" x2="8" y2="24" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        closeButton.style.cssText = `
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 10000;
        `;
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeMobileMenu();
        });
        navMenu.appendChild(closeButton);

        // 背景クリックで閉じる
        navMenu.addEventListener('click', (e) => {
            if (e.target === navMenu) {
                this.closeMobileMenu();
            }
        });

        // リンクのスタイル
        const links = navMenu.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.style.color = 'white';
            link.style.fontSize = '1.125rem';
            link.style.fontWeight = '600';
            link.style.textAlign = 'left';
            link.style.width = '100%';
            link.style.padding = '0.5rem 0';
            link.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';

            // CTAボタンのスタイル調整
            if (link.classList.contains('cta-button')) {
                link.style.background = 'white';
                link.style.color = '#1a1a1a';
                link.style.borderRadius = '2rem';
                link.style.padding = '0.75rem 2rem';
                link.style.border = 'none';
                link.style.marginTop = '1rem';
                link.style.width = 'auto';
            }

            // クリックしたら閉じる
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // フェードイン
        requestAnimationFrame(() => {
            navMenu.style.opacity = '1';
        });
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');

        // フェードアウト
        navMenu.style.opacity = '0';

        setTimeout(() => {
            navMenu.classList.remove('mobile-menu-open');
            navMenu.style.display = 'none';

            // 閉じるボタンを削除
            const closeButton = navMenu.querySelector('.mobile-menu-close');
            if (closeButton) {
                closeButton.remove();
            }

            // リンクのスタイルをリセット
            const links = navMenu.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.style.cssText = '';
            });
        }, 300);
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

        /* .navbar.scrolledのスタイルはstyles.cssで定義（すりガラス効果） */

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