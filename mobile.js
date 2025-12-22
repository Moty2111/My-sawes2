// mobile.js - Мобильные оптимизации и жесты
document.addEventListener('DOMContentLoaded', function() {
    // Проверка мобильного устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouchDevice) {
        optimizeForMobile();
    }
    
    function optimizeForMobile() {
        console.log('Оптимизация для мобильных устройств');
        
        // Улучшение навигации
        improveMobileNavigation();
        
        // Улучшение форм
        improveMobileForms();
        
        // Улучшение галереи
        improveMobileGallery();
        
        // Оптимизация производительности
        optimizePerformance();
        
        // Улучшение корзины
        improveMobileCart();
        
        // Добавление жестов
        addGestureSupport();
        
        // Предотвращение масштабирования
        preventZoomOnFocus();
    }
    
    function improveMobileNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navList = document.querySelector('.nav-list');
        
        // Закрытие меню при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    // Анимация кнопки
                    mobileMenuBtn.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        mobileMenuBtn.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
        
        // Свайп для закрытия меню
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            // Свайп вправо для закрытия меню
            if (swipeDistance > swipeThreshold && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        // Вибрация (если поддерживается)
        if ('vibrate' in navigator) {
            mobileMenuBtn.addEventListener('touchstart', () => {
                navigator.vibrate(10);
            });
        }
    }
    
    function improveMobileForms() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Оптимизация виртуальной клавиатуры
            if (input.type === 'tel') {
                input.setAttribute('inputmode', 'tel');
                input.setAttribute('pattern', '[0-9]*');
            }
            
            if (input.type === 'email') {
                input.setAttribute('inputmode', 'email');
            }
            
            // Улучшение фокуса
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                
                // Прокрутка к полю ввода
                setTimeout(() => {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center',
                        inline: 'nearest'
                    });
                }, 300);
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
    
    function improveMobileGallery() {
        const productImages = document.querySelectorAll('.product-image');
        
        productImages.forEach(image => {
            image.style.cursor = 'pointer';
            
            image.addEventListener('click', function() {
                const productCard = this.closest('.product-card, .catalog-item');
                const productName = productCard?.querySelector('h3')?.textContent || 'Товар';
                
                // Модальное окно для изображения
                const modal = document.createElement('div');
                modal.className = 'image-modal';
                modal.innerHTML = `
                    <div class="modal-overlay"></div>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>${productName}</h4>
                            <button class="modal-close"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="modal-image" style="background-image: ${this.style.backgroundImage}"></div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Закрытие модального окна
                modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
                modal.querySelector('.modal-close').addEventListener('click', closeModal);
                
                // Закрытие по Escape
                document.addEventListener('keydown', function escHandler(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', escHandler);
                    }
                });
                
                function closeModal() {
                    modal.classList.add('closing');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
                
                // Анимация появления
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            });
        });
        
        // Добавление стилей для модального окна
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: none;
            }
            
            .image-modal.active {
                display: block;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                width: 90%;
                max-width: 500px;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .image-modal.active .modal-content {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            
            .image-modal.closing .modal-content {
                transform: translate(-50%, -50%) scale(0.9);
                opacity: 0;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: linear-gradient(135deg, #FFD700, #4CAF50);
                color: white;
            }
            
            .modal-header h4 {
                margin: 0;
                font-size: 1.2rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
            }
            
            .modal-image {
                height: 300px;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                background-color: #f5f5f5;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                }
                
                .modal-image {
                    height: 250px;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    function optimizePerformance() {
        // Ленивая загрузка изображений
        const images = document.querySelectorAll('img, .product-image');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.tagName === 'IMG' && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    function improveMobileCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartItems = document.getElementById('cartItems');
        
        if (cartSidebar) {
            // Свайп для закрытия корзины
            let cartTouchStartY = 0;
            let cartTouchEndY = 0;
            
            cartSidebar.addEventListener('touchstart', e => {
                cartTouchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            cartSidebar.addEventListener('touchend', e => {
                cartTouchEndY = e.changedTouches[0].screenY;
                handleCartSwipe();
            }, { passive: true });
            
            function handleCartSwipe() {
                const swipeThreshold = 100;
                const swipeDistance = cartTouchEndY - cartTouchStartY;
                
                // Свайп вниз для закрытия корзины
                if (swipeDistance > swipeThreshold && cartSidebar.classList.contains('active')) {
                    cartSidebar.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    if ('vibrate' in navigator) {
                        navigator.vibrate(10);
                    }
                }
            }
        }
    }
    
    function addGestureSupport() {
        // Двойное касание для увеличения
        let lastTap = 0;
        
        document.addEventListener('touchend', function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 500 && tapLength > 0) {
                handleDoubleTap(e);
            }
            
            lastTap = currentTime;
        });
        
        function handleDoubleTap(e) {
            const target = e.target;
            
            // Увеличение изображений товаров
            if (target.closest('.product-image')) {
                const productImage = target.closest('.product-image');
                if (productImage) {
                    productImage.style.transform = productImage.style.transform === 'scale(1.1)' 
                        ? 'scale(1)' 
                        : 'scale(1.1)';
                    
                    productImage.style.transition = 'transform 0.3s ease';
                    
                    setTimeout(() => {
                        productImage.style.transform = 'scale(1)';
                    }, 2000);
                }
            }
        }
    }
    
    function preventZoomOnFocus() {
        const viewport = document.querySelector('meta[name="viewport"]');
        let originalContent = viewport.getAttribute('content');
        
        document.addEventListener('focusin', function(e) {
            if (e.target.matches('input, select, textarea')) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        document.addEventListener('focusout', function() {
            viewport.setAttribute('content', originalContent);
        });
    }
});

// Адаптация к изменению ориентации
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 300);
});

// Оптимизация для медленных сетей
if ('connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection.saveData === true || connection.effectiveType.includes('2g')) {
        console.log('Режим экономии данных активирован');
        
        // Отключение тяжелых анимаций
        document.body.classList.add('save-data-mode');
        
        const heavyElements = document.querySelectorAll('.floating-icon, .feature-icon, .service-icon');
        heavyElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// Исправление для iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.body.style.WebkitOverflowScrolling = 'touch';
}