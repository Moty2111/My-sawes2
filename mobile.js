// mobile.js - Полностью исправленная версия для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile JS initialized');
    
    // Проверка мобильного устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Всегда оптимизируем для мобильных
    optimizeForMobile();
    
    if (isMobile || isTouchDevice) {
        console.log('Touch device detected, applying touch optimizations');
        applyTouchOptimizations();
    }
    
    function optimizeForMobile() {
        console.log('Applying mobile optimizations');
        
        // 1. Инициализация мобильного меню
        initMobileMenu();
        
        // 2. Исправление корзины
        fixCartFunctionality();
        
        // 3. Исправление футера
        fixFooterPosition();
        
        // 4. Исправление прокрутки
        fixScrollIssues();
        
        // 5. Исправление форм
        fixFormIssues();
        
        // 6. Проверка загрузки Font Awesome
        checkFontAwesome();
    }
    
    function applyTouchOptimizations() {
        // Увеличение области касания
        const touchElements = document.querySelectorAll('.btn, .nav-link, .filter-btn, .add-to-cart, .category-card, .product-card');
        
        touchElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
            el.style.cursor = 'pointer';
            
            // Добавляем эффект при нажатии
            el.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
                this.style.transform = 'scale(0.98)';
            });
            
            el.addEventListener('touchend', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
        });
        
        // Предотвращение масштабирования при фокусе
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Прокручиваем к элементу
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            });
        });
    }
    
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.querySelector('.main-nav');
        
        if (!mobileMenuBtn || !mainNav) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        // Обработчик для кнопки меню
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Переключение меню
            const isActive = mainNav.classList.toggle('active');
            
            // Анимация кнопки
            if (isActive) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                this.style.background = 'linear-gradient(135deg, #495057, #6C757D)';
                document.body.style.overflow = 'hidden';
                
                // Вибрация если поддерживается
                if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                }
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                this.style.background = 'linear-gradient(135deg, #6C757D, #ADB5BD)';
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Если это якорная ссылка, прокручиваем
                const href = this.getAttribute('href');
                if (href && href.includes('#')) {
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                // Закрываем меню
                closeMobileMenu();
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && 
                !e.target.closest('.mobile-menu-btn') && 
                mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Функция закрытия меню
        function closeMobileMenu() {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.background = 'linear-gradient(135deg, #6C757D, #ADB5BD)';
            document.body.style.overflow = '';
        }
        
        // Обработчик для свайпа
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Если свайп вправо и меню открыто - закрываем
            if (deltaX > 50 && Math.abs(deltaY) < 50 && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    function fixCartFunctionality() {
        // Обработка кликов по корзине
        const cartLinks = document.querySelectorAll('.cart-link');
        cartLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'cart.html';
            });
        });
        
        // Обновление счетчика корзины при загрузке
        updateCartCount();
    }
    
    function fixFooterPosition() {
        // Убеждаемся что футер всегда внизу
        const mainContent = document.querySelector('.main-content');
        const footer = document.querySelector('.footer');
        
        if (mainContent && footer) {
            // Исправление для iOS Safari
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                // Добавляем отступы для безопасных зон
                document.body.style.paddingTop = 'env(safe-area-inset-top)';
                document.body.style.paddingBottom = 'env(safe-area-inset-bottom)';
                
                // Фиксируем высоту контента
                const contentHeight = window.innerHeight - footer.offsetHeight;
                mainContent.style.minHeight = contentHeight + 'px';
            }
        }
    }
    
    function fixScrollIssues() {
        // Исправление прокрутки на iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.style.WebkitOverflowScrolling = 'touch';
            
            // Исправление для фиксированных элементов
            const fixedElements = document.querySelectorAll('.header, .footer');
            fixedElements.forEach(el => {
                el.style.WebkitTransform = 'translate3d(0,0,0)';
            });
        }
        
        // Предотвращение прокрутки при открытом меню
        document.addEventListener('touchmove', function(e) {
            const mainNav = document.querySelector('.main-nav');
            if (mainNav && mainNav.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    function fixFormIssues() {
        // Увеличиваем размеры элементов форм для мобильных
        const formElements = document.querySelectorAll('input, select, textarea, button[type="submit"]');
        formElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.fontSize = '16px'; // Предотвращает зум в iOS
        });
        
        // Исправление датапикеров
        const dateInputs = document.querySelectorAll('input[type="date"], input[type="time"]');
        dateInputs.forEach(input => {
            // Добавляем подсказку
            const placeholder = input.getAttribute('placeholder') || 'Выберите дату';
            input.setAttribute('placeholder', placeholder);
        });
    }
    
    function checkFontAwesome() {
        // Проверяем загрузились ли иконки
        setTimeout(() => {
            const testIcon = document.createElement('i');
            testIcon.className = 'fas fa-check';
            testIcon.style.visibility = 'hidden';
            document.body.appendChild(testIcon);
            
            // Проверка через 100ms
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(testIcon, '::before');
                const content = computedStyle.content;
                
                if (!content || content === 'none' || content === 'normal') {
                    console.warn('Font Awesome not loaded properly');
                    // Добавляем fallback
                    addIconFallbacks();
                }
                
                document.body.removeChild(testIcon);
            }, 100);
        }, 1000);
    }
    
    function addIconFallbacks() {
        // Добавляем текстовые fallback для иконок
        const icons = document.querySelectorAll('.category-icon i, .feature-icon i, .service-icon i');
        icons.forEach(icon => {
            const parent = icon.parentElement;
            const iconClass = Array.from(icon.classList)
                .find(cls => cls.startsWith('fa-'))
                ?.replace('fa-', '');
            
            if (iconClass && parent) {
                parent.setAttribute('data-icon', iconClass);
                parent.classList.add('has-fallback');
            }
        });
    }
    
    function updateCartCount() {
        // Обновляем счетчик корзины
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            try {
                const cart = JSON.parse(localStorage.getItem('buildpro_cart')) || [];
                const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            } catch (e) {
                cartCount.textContent = '0';
                cartCount.style.display = 'none';
            }
        }
    }
    
    // Обработка изменения ориентации
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            fixFooterPosition();
            updateCartCount();
        }, 250);
    });
    
    // Обработка события beforeinstallprompt для PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
    
    // Исправление для медленных сетей
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.saveData === true || connection.effectiveType.includes('2g')) {
            // Отключаем тяжелые анимации
            const heavyAnimations = document.querySelectorAll('.floating-icon, [class*="animate"]');
            heavyAnimations.forEach(el => {
                el.style.animation = 'none';
            });
        }
    }
});

// Полифиллы для старых браузеров
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
