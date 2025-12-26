// mobile.js - Исправленная версия с закрепленным футером и без блюра
(function() {
    'use strict';
    
    console.log('Mobile JS initializing...');
    
    // Проверка устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let isMenuOpen = false;
    
    // Флаг для предотвращения двойного срабатывания
    let isProcessingHeartClick = false;
    
    // Основная инициализация
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded, initializing mobile features...');
        
        // 1. Исправление layout для закрепления футера
        fixLayoutForStickyFooter();
        
        // 2. Инициализация мобильного меню
        initMobileMenu();
        
        // 3. Инициализация иконок сердца (ОБНОВЛЕНО - без конфликта)
        initHeartIcons();
        
        // 4. Обновление корзины
        updateCartCount();
        
        // 5. Оптимизация для touch-устройств
        if (isTouchDevice) {
            optimizeForTouch();
        }
        
        // 6. Исправления для iOS
        if (isIOS) {
            fixIOSIssues();
        }
        
        // 7. Обработка изменения размера окна
        initResizeHandler();
        
        // 8. Проверка Font Awesome
        setTimeout(checkFontAwesome, 1000);
        
        // 9. Инициализация кнопки "Наверх"
        initScrollToTop();
        
        console.log('Mobile features initialized successfully');
    });
    
    // ========== ИСПРАВЛЕНИЕ LAYOUT ДЛЯ ЗАКРЕПЛЕНИЯ ФУТЕРА ==========
    function fixLayoutForStickyFooter() {
        console.log('Fixing layout for sticky footer...');
        
        // Создаем обертку для страницы если её нет
        if (!document.querySelector('.page-wrapper')) {
            const body = document.body;
            const header = document.querySelector('.header');
            const mainContent = document.querySelector('.main-content');
            const footer = document.querySelector('.footer');
            
            if (header && mainContent && footer) {
                // Создаем обертку
                const wrapper = document.createElement('div');
                wrapper.className = 'page-wrapper';
                
                // Перемещаем элементы в обертку
                body.insertBefore(wrapper, header);
                wrapper.appendChild(header);
                wrapper.appendChild(mainContent);
                wrapper.appendChild(footer);
                
                console.log('Page wrapper created for sticky footer');
            }
        }
        
        // Убедимся, что body имеет правильную высоту
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        document.body.style.minHeight = '100vh';
        
        if (isIOS) {
            document.body.style.minHeight = '-webkit-fill-available';
        }
        
        // Проверяем и фиксируем высоту контента
        setTimeout(() => {
            const mainContent = document.querySelector('.main-content');
            const footer = document.querySelector('.footer');
            
            if (mainContent && footer) {
                // Устанавливаем минимальную высоту для контента
                const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
                const footerHeight = footer.offsetHeight;
                const windowHeight = window.innerHeight;
                
                const minContentHeight = windowHeight - headerHeight - footerHeight;
                mainContent.style.minHeight = `${minContentHeight}px`;
                
                console.log('Content min-height set:', minContentHeight);
            }
        }, 100);
    }
    
    // ========== МОБИЛЬНОЕ МЕНЮ БЕЗ БЛЮРА ==========
    function initMobileMenu() {
        console.log('Initializing mobile menu...');
        
        const menuBtn = document.getElementById('mobileMenuBtn');
        const mainNav = document.querySelector('.main-nav');
        const body = document.body;
        
        if (!menuBtn || !mainNav) {
            console.error('Mobile menu elements not found');
            return;
        }
        
        console.log('Found menu elements:', { menuBtn, mainNav });
        
        // Создаем overlay для меню (ТЕМНЫЙ БЕЗ БЛЮРА)
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                -webkit-backdrop-filter: none !important;
                backdrop-filter: none !important;
                pointer-events: none;
            `;
            document.body.appendChild(overlay);
        }
        
        // Функция открытия меню
        function openMenu() {
            if (isMenuOpen) return;
            
            // Открываем меню
            mainNav.classList.add('active');
            menuBtn.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
            isMenuOpen = true;
            
            // Меняем иконку
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times';
            }
            
            // Вибрация на мобильных
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(10);
            }
            
            // Блокируем скролл футера и контента
            document.querySelectorAll('.main-content, .footer').forEach(el => {
                el.style.overflow = 'hidden';
            });
            
            console.log('Menu opened (without blur)');
        }
        
        // Функция закрытия меню
        function closeMenu() {
            if (!isMenuOpen) return;
            
            // Закрываем меню
            mainNav.classList.remove('active');
            menuBtn.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
            
            // Меняем иконку
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
            
            // Разблокируем скролл
            document.querySelectorAll('.main-content, .footer').forEach(el => {
                el.style.overflow = '';
            });
            
            console.log('Menu closed');
        }
        
        // Функция переключения меню
        function toggleMenu() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // Обработчик кнопки меню
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Обработчик overlay
        overlay.addEventListener('click', closeMenu);
        
        // Обработчик ссылок в меню
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Если это якорная ссылка
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    // Закрываем меню
                    closeMenu();
                    
                    // Плавная прокрутка
                    if (targetElement) {
                        setTimeout(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 300);
                    }
                } else if (isMobile) {
                    // Для других ссылок на мобильных
                    setTimeout(closeMenu, 100);
                }
            });
        });
        
        // Обработчик клавиши ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Обработчик свайпа для закрытия меню
        if (isTouchDevice) {
            let touchStartX = 0;
            
            overlay.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            
            overlay.addEventListener('touchend', function(e) {
                if (!isMenuOpen) return;
                
                const touchEndX = e.changedTouches[0].clientX;
                const deltaX = touchEndX - touchStartX;
                
                // Если свайп вправо больше 50px
                if (deltaX > 50) {
                    closeMenu();
                }
            }, { passive: true });
        }
        
        // Закрытие меню при изменении ориентации
        window.addEventListener('orientationchange', function() {
            if (isMenuOpen) {
                setTimeout(closeMenu, 100);
            }
        });
        
        console.log('Mobile menu initialized (without blur)');
    }
    
    // ========== ИНИЦИАЛИЗАЦИЯ ИКОНОК СЕРДЦА (ИСПРАВЛЕНО - БЕЗ КОНФЛИКТА) ==========
    function initHeartIcons() {
        console.log('Initializing heart icons (without conflicts)...');
        
        // Восстановление состояния из localStorage при загрузке
        restoreHeartIconsState();
        
        // Обработчик клика на иконки сердца
        document.addEventListener('click', function(e) {
            const heartIcon = e.target.closest('.product-wishlist');
            if (!heartIcon) return;
            
            // Если уже обрабатывается клик, выходим
            if (isProcessingHeartClick) return;
            
            // Блокируем дальнейшую обработку
            isProcessingHeartClick = true;
            
            e.preventDefault();
            e.stopPropagation();
            
            const productId = heartIcon.getAttribute('data-id') || 
                             heartIcon.getAttribute('data-product-id');
            
            if (!productId) {
                isProcessingHeartClick = false;
                return;
            }
            
            const isActive = heartIcon.classList.toggle('active');
            const iconElement = heartIcon.querySelector('i');
            
            // Обновляем иконку Font Awesome
            if (iconElement) {
                iconElement.className = isActive ? 'fas fa-heart' : 'far fa-heart';
                if (isActive) {
                    iconElement.style.color = '#e53935'; // Красный цвет для активного состояния
                } else {
                    iconElement.style.color = ''; // Сбрасываем цвет
                }
            }
            
            // Сохраняем в localStorage
            localStorage.setItem(`favorite_${productId}`, isActive);
            
            // Показываем уведомление
            if (isActive) {
                showNotification('❤️ Добавлено в избранное', 'success');
            } else {
                showNotification('💔 Удалено из избранного', 'info');
            }
            
            // Анимация
            heartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                heartIcon.style.transform = '';
            }, 300);
            
            // Вибрация на мобильных
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(20);
            }
            
            // Разблокируем обработку через короткое время
            setTimeout(() => {
                isProcessingHeartClick = false;
            }, 50);
        });
    }
    
    // Восстановление состояния иконок из localStorage
    function restoreHeartIconsState() {
        const heartIcons = document.querySelectorAll('.product-wishlist');
        
        heartIcons.forEach(icon => {
            const productId = icon.getAttribute('data-id') || 
                             icon.getAttribute('data-product-id');
            
            if (productId) {
                const isFavorite = localStorage.getItem(`favorite_${productId}`) === 'true';
                if (isFavorite) {
                    icon.classList.add('active');
                    const heartIcon = icon.querySelector('i');
                    if (heartIcon) {
                        heartIcon.className = 'fas fa-heart';
                        heartIcon.style.color = '#e53935';
                    }
                }
            }
        });
    }
    
    // ========== ОБНОВЛЕНИЕ КОРЗИНЫ ==========
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (!cartCount) return;
        
        try {
            const cart = JSON.parse(localStorage.getItem('buildpro_cart')) || [];
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        } catch (error) {
            console.error('Error updating cart count:', error);
            cartCount.style.display = 'none';
        }
    }
    
    // ========== ОПТИМИЗАЦИЯ ДЛЯ TOUCH-УСТРОЙСТВ ==========
    function optimizeForTouch() {
        // Увеличиваем области касания
        const touchElements = document.querySelectorAll(
            '.btn, .nav-link, .filter-btn, .add-to-cart, .category-card, .product-card, .product-wishlist'
        );
        
        touchElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
        });
        
        // Предотвращение масштабирования при фокусе
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (isIOS) {
                input.style.fontSize = '16px';
            }
        });
    }
    
    // ========== ИСПРАВЛЕНИЯ ДЛЯ iOS ==========
    function fixIOSIssues() {
        // Исправление 100vh на iOS
        function setRealViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            document.body.style.minHeight = `${window.innerHeight}px`;
        }
        
        setRealViewportHeight();
        window.addEventListener('resize', setRealViewportHeight);
        window.addEventListener('orientationchange', function() {
            setTimeout(setRealViewportHeight, 100);
            setTimeout(fixLayoutForStickyFooter, 200);
        });
        
        // Исправление фиксированных элементов
        document.body.style.WebkitOverflowScrolling = 'touch';
    }
    
    // ========== ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА ==========
    function initResizeHandler() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Закрываем меню при переходе на десктоп
                if (window.innerWidth > 768 && isMenuOpen) {
                    const menuBtn = document.getElementById('mobileMenuBtn');
                    const mainNav = document.querySelector('.main-nav');
                    const overlay = document.querySelector('.mobile-menu-overlay');
                    
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (menuBtn) menuBtn.classList.remove('active');
                        if (overlay) overlay.classList.remove('active');
                        document.body.style.overflow = '';
                        isMenuOpen = false;
                        
                        const icon = menuBtn?.querySelector('i');
                        if (icon) icon.className = 'fas fa-bars';
                    }
                }
                
                // Обновляем layout для футера
                fixLayoutForStickyFooter();
                
                // Обновляем счетчик корзины
                updateCartCount();
            }, 250);
        });
    }
    
    // ========== КНОПКА "НАВЕРХ" ==========
    function initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (!scrollToTopBtn) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== ПРОВЕРКА FONT AWESOME ==========
    function checkFontAwesome() {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-check';
        testIcon.style.position = 'absolute';
        testIcon.style.visibility = 'hidden';
        testIcon.style.opacity = '0';
        document.body.appendChild(testIcon);
        
        setTimeout(() => {
            const computed = window.getComputedStyle(testIcon, '::before');
            const content = computed.content;
            
            if (!content || content === 'none' || content === 'normal') {
                console.warn('Font Awesome may not be loaded properly');
                addIconFallbacks();
            }
            
            document.body.removeChild(testIcon);
        }, 100);
    }
    
    function addIconFallbacks() {
        const iconMap = {
            'fa-shopping-cart': '🛒',
            'fa-heart': '❤️',
            'fa-bars': '☰',
            'fa-times': '✕',
            'fa-star': '★',
            'fa-check': '✓',
            'fa-phone': '📞',
            'fa-envelope': '✉️',
            'fa-map-marker': '📍',
            'fa-clock': '🕒',
            'fa-truck': '🚚',
            'fa-shield-alt': '🛡️',
            'fa-users': '👥',
            'fa-tools': '🛠️'
        };
        
        document.querySelectorAll('i[class*="fa-"]').forEach(icon => {
            const classes = icon.className.split(' ');
            const iconClass = classes.find(cls => cls.startsWith('fa-'));
            
            if (iconClass && iconMap[iconClass]) {
                icon.setAttribute('data-fallback', iconMap[iconClass]);
            }
        });
    }
    
    // ========== СИСТЕМА УВЕДОМЛЕНИЙ ==========
    function showNotification(message, type = 'info') {
        // Создаем контейнер если нет
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 90%;
            `;
            document.body.appendChild(container);
        }
        
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            background: ${type === 'success' ? '#2E7D32' : 
                         type === 'error' ? '#C62828' : 
                         type === 'warning' ? '#E6B800' : '#546E7A'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 400px;
            word-break: break-word;
        `;
        
        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                              type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" style="background: none; border: none; color: white; cursor: pointer; padding: 4px;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Закрытие по клику
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Автозакрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ========== ОБРАБОТКА ВИДИМОСТИ СТРАНИЦЫ ==========
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateCartCount();
        }
    });
    
    // ========== SERVICE WORKER ==========
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').catch(function(err) {
                console.log('ServiceWorker registration failed:', err);
            });
        });
    }
    
    // ========== DEBUG HELPER ==========
    window.debugMobileLayout = function() {
        const header = document.querySelector('.header');
        const mainContent = document.querySelector('.main-content');
        const footer = document.querySelector('.footer');
        const body = document.body;
        
        console.log('Mobile Layout Debug:');
        console.log('- Window height:', window.innerHeight);
        console.log('- Body height:', body.offsetHeight);
        console.log('- Header height:', header?.offsetHeight);
        console.log('- Main content height:', mainContent?.offsetHeight);
        console.log('- Footer height:', footer?.offsetHeight);
        console.log('- Total height:', (header?.offsetHeight || 0) + (mainContent?.offsetHeight || 0) + (footer?.offsetHeight || 0));
        console.log('- Body min-height:', body.style.minHeight);
        console.log('- isMenuOpen:', isMenuOpen);
    };
    
    // Экспортируем функцию для отладки
    if (typeof window !== 'undefined') {
        window.mobileDebug = window.debugMobileLayout;
    }
    
})();

// Полифиллы для совместимости
(function() {
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
})();

// Финальная инициализация при полной загрузке
window.addEventListener('load', function() {
    console.log('Page fully loaded, finalizing mobile setup...');
    
    // Убедимся, что меню закрыто
    const mainNav = document.querySelector('.main-nav');
    const menuBtn = document.getElementById('mobileMenuBtn');
    
    if (mainNav && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
    }
    
    if (menuBtn && menuBtn.classList.contains('active')) {
        menuBtn.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    }
    
    // Скрываем overlay
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
    }
    
    // Восстанавливаем скролл
    document.body.style.overflow = '';
    document.querySelectorAll('.main-content, .footer').forEach(el => {
        el.style.overflow = '';
    });
    
    // Финальная проверка layout
    setTimeout(() => {
        const footer = document.querySelector('.footer');
        const body = document.body;
        
        if (footer && body.offsetHeight < window.innerHeight) {
            console.log('Adjusting layout for sticky footer...');
            footer.style.marginTop = 'auto';
        }
    }, 500);
    
    console.log('Mobile setup finalized with sticky footer');
});
