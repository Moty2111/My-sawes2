// mobile.js - Исправленная версия для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile JS loaded');
    
    // Проверка мобильного устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        optimizeForMobile();
    }
    
    function optimizeForMobile() {
        console.log('Optimizing for mobile devices');
        
        // Инициализация мобильного меню
        initMobileMenu();
        
        // Улучшение тач-интерфейса
        improveTouchInterface();
        
        // Исправление ссылок корзины
        fixCartLinks();
        
        // Предотвращение масштабирования при фокусе
        preventZoomOnFocus();
        
        // Исправление футера для мобильных
        fixFooterForMobile();
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
            e.stopPropagation();
            e.preventDefault();
            
            // Переключение класса active у меню
            mainNav.classList.toggle('active');
            
            // Анимация кнопки меню
            if (mainNav.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = ''; // Разблокируем прокрутку
            }
            
            // Вибрация если поддерживается
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav') && 
                !e.target.closest('.mobile-menu-btn') && 
                mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при свайпе вправо
        let touchStartX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            
            // Если свайп вправо больше 50px и меню открыто - закрываем
            if (swipeDistance > 50 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    }
    
    function improveTouchInterface() {
        // Увеличиваем область касания для важных элементов
        const touchElements = document.querySelectorAll('.btn, .nav-link, .filter-btn, .add-to-cart');
        
        touchElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
        });
        
        // Улучшаем input для мобильных
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Прокручиваем к input при фокусе
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'nearest' 
                    });
                }, 300);
            });
        });
    }
    
    function fixCartLinks() {
        const cartLinks = document.querySelectorAll('.cart-link');
        
        cartLinks.forEach(link => {
            // Удаляем старые обработчики
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Добавляем новый обработчик
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'cart.html';
            });
        });
    }
    
    function preventZoomOnFocus() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        let originalContent = viewportMeta.getAttribute('content');
        
        document.addEventListener('focusin', function(e) {
            if (e.target.matches('input, select, textarea')) {
                viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        document.addEventListener('focusout', function() {
            viewportMeta.setAttribute('content', originalContent);
        });
    }
    
    function fixFooterForMobile() {
        // Убеждаемся, что футер всегда внизу
        const mainContent = document.querySelector('.main-content');
        const footer = document.querySelector('.footer');
        
        if (mainContent && footer) {
            // Минимальная высота для контента
            mainContent.style.minHeight = 'calc(100vh - 140px)';
            
            // Убедимся, что футер виден
            footer.style.display = 'block';
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
            
            // Прокручиваем к верху страницы при загрузке
            window.scrollTo(0, 0);
        }
        
        // Исправление для iOS Safari
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.style.WebkitOverflowScrolling = 'touch';
            
            // Дополнительные отступы для фиксированных элементов
            const header = document.querySelector('.header');
            if (header) {
                header.style.paddingTop = 'env(safe-area-inset-top)';
            }
            
            if (footer) {
                footer.style.paddingBottom = 'env(safe-area-inset-bottom)';
            }
        }
    }
    
    // Адаптация к изменению ориентации
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Пересчитываем высоту элементов
            fixFooterForMobile();
            
            // Перерисовываем страницу
            window.dispatchEvent(new Event('resize'));
        }, 300);
    });
});

// Исправление для медленных сетей
if ('connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection.saveData === true || connection.effectiveType.includes('2g')) {
        console.log('Data saving mode enabled');
        
        // Отключаем тяжелые анимации
        const heavyAnimations = document.querySelectorAll('.floating-icon, [data-animate]');
        heavyAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// Исправление для Chrome на Android
if (/Android/.test(navigator.userAgent) && /Chrome/.test(navigator.userAgent)) {
    document.body.style.WebkitTapHighlightColor = 'transparent';
}
