// script.js - Полностью обновленная версия с интеграцией мобильных функций
document.addEventListener('DOMContentLoaded', function() {
    console.log('BuildCraft JS initialized');
    
    // ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Данные для каталога
    const catalogItems = [
        { id: 1, name: "Цемент М500 Д0", description: "Мешок 50 кг, высокое качество, для любых строительных работ", price: 450, category: "materials", image: "cement", isFavorite: false },
        { id: 2, name: "Песок строительный", description: "Речной песок, фракция 1.5-2 мм, мытый, без примесей", price: 1200, category: "materials", image: "sand", isFavorite: false },
        { id: 3, name: "Кирпич красный", description: "Облицовочный кирпич, 250x120x65 мм, полнотелый", price: 25, category: "materials", image: "bricks", isFavorite: false },
        { id: 4, name: "Гипсокартон влагостойкий", description: "ГКЛВ 12.5 мм, размер 1200x2500 мм", price: 350, category: "materials", image: "drywall", isFavorite: false },
        { id: 5, name: "Перфоратор SDS-MAX", description: "Мощный перфоратор с 3 режимами, 1500 Вт", price: 8900, category: "tools", image: "perforator", isFavorite: false },
        { id: 6, name: "Дрель-шуруповерт", description: "Аккумуляторная, 18В, 2 аккумулятора, кейс в комплекте", price: 5500, category: "tools", image: "drill", isFavorite: false },
        { id: 7, name: "Болгарка 125 мм", description: "Угловая шлифмашина 125 мм, 1100 Вт, защитный кожух", price: 4200, category: "tools", image: "grinder", isFavorite: false },
        { id: 8, name: "Краска интерьерная", description: "Водоэмульсионная, белая, 10 кг, моющаяся", price: 2800, category: "finishing", image: "paint", isFavorite: false },
        { id: 9, name: "Обои флизелиновые", description: "Под покраску, плотность 110 г/м², ширина 1.06 м", price: 850, category: "finishing", image: "wallpaper", isFavorite: false },
        { id: 10, name: "Плитка керамическая", description: "Для ванной комнаты, 30x30 см, влагостойкая", price: 750, category: "finishing", image: "tiles", isFavorite: false },
        { id: 11, name: "Ламинат 33 класс", description: "Класс износостойкости 33, толщина 12 мм, влагостойкий", price: 650, category: "finishing", image: "laminate", isFavorite: false },
        { id: 12, name: "Шпатлевка финишная", description: "Для выравнивания стен, 20 кг, готовая к применению", price: 480, category: "materials", image: "putty", isFavorite: false },
        { id: 13, name: "Смеситель для ванной", description: "Однорычажный, с душем, хром", price: 3200, category: "plumbing", image: "mixer", isFavorite: false },
        { id: 14, name: "Раковина из искусственного камня", description: "С тумбой, ширина 60 см, белый мат", price: 8500, category: "plumbing", image: "sink", isFavorite: false },
        { id: 15, name: "Кабель ВВГнг 3x2.5", description: "Кабель силовой, медный, негорючий, 100 м", price: 4800, category: "electrical", image: "cable", isFavorite: false },
        { id: 16, name: "Розетка с заземлением", description: "Евростандарт, белая, механизм с защитными шторками", price: 120, category: "electrical", image: "socket", isFavorite: false }
    ];
    
    // Корзина из localStorage или пустой массив
    let cart = JSON.parse(localStorage.getItem('buildpro_cart')) || [];
    
    // Избранное из localStorage
    let favorites = JSON.parse(localStorage.getItem('buildpro_favorites')) || [];
    
    // ========== DOM ЭЛЕМЕНТЫ ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');
    const cartCount = document.getElementById('cartCount');
    const cartLinks = document.querySelectorAll('.cart-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogContainer = document.querySelector('.catalog-items');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    const callbackForm = document.getElementById('callbackForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartPageItems = document.getElementById('cartPageItems');
    const checkoutPageBtn = document.querySelector('.checkout-page-btn');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // ========== ИНИЦИАЛИЗАЦИЯ ==========
    function init() {
        console.log('Initializing BuildCraft...');
        
        // Применяем оптимизации для мобильных устройств
        if (isMobile || isTouchDevice) {
            optimizeForMobile();
        }
        
        // Основные инициализации
        initHeader();
        initCart();
        initFavorites();
        
        // Специфичные инициализации для страниц
        if (document.querySelector('.catalog-items')) {
            initCatalog();
        }
        
        if (document.querySelector('.hero-buttons')) {
            initHeroButtons();
        }
        
        if (document.querySelector('.products-grid')) {
            initProductCards();
        }
        
        if (document.querySelector('.contact-content')) {
            initContactPage();
        }
        
        if (document.querySelector('.about-content')) {
            initAboutPage();
        }
        
        // Общие функции
        initForms();
        initScrollToTop();
        initNotifications();
        
        console.log('BuildCraft initialization complete');
    }
    
    // ========== ОПТИМИЗАЦИИ ДЛЯ МОБИЛЬНЫХ ==========
    function optimizeForMobile() {
        console.log('Applying mobile optimizations');
        
        // Увеличение области касания для кнопок
        const touchElements = document.querySelectorAll('.btn, .nav-link, .filter-btn, .add-to-cart, .category-card, .product-card, .product-wishlist');
        
        touchElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
            el.style.cursor = 'pointer';
            
            if (isTouchDevice) {
                // Добавляем эффект при нажатии на тач-устройствах
                el.addEventListener('touchstart', function() {
                    this.style.opacity = '0.8';
                    this.style.transform = 'scale(0.98)';
                });
                
                el.addEventListener('touchend', function() {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                });
            }
        });
        
        // Предотвращение масштабирования при фокусе на мобильных
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Прокручиваем к элементу на мобильных
                if (isMobile) {
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            });
        });
        
        // Исправление для iOS Safari
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            document.body.style.WebkitOverflowScrolling = 'touch';
            
            // Исправление для фиксированных элементов
            const fixedElements = document.querySelectorAll('.header, .footer');
            fixedElements.forEach(el => {
                el.style.WebkitTransform = 'translate3d(0,0,0)';
            });
        }
    }
    
    // ========== ШАПКА И НАВИГАЦИЯ ==========
    function initHeader() {
        console.log('Initializing header...');
        
        // Мобильное меню
        if (mobileMenuBtn && mainNav) {
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
                    if (isMobile && 'vibrate' in navigator) {
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
                link.addEventListener('click', function() {
                    // Если это якорная ссылка, прокручиваем
                    const href = this.getAttribute('href');
                    if (href && href.includes('#')) {
                        const targetId = href.split('#')[1];
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                    
                    // Закрываем меню на мобильных
                    if (window.innerWidth <= 768 && mainNav.classList.contains('active')) {
                        closeMobileMenu();
                    }
                });
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', function(e) {
                if (mainNav && !e.target.closest('.main-nav') && 
                    !e.target.closest('.mobile-menu-btn') && 
                    mainNav.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
            
            // Функция закрытия меню
            function closeMobileMenu() {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenuBtn.style.background = 'linear-gradient(135deg, #6C757D, #ADB5BD)';
                }
                document.body.style.overflow = '';
            }
            
            // Обработчик свайпа для закрытия меню на мобильных
            if (isTouchDevice) {
                let touchStartX = 0;
                
                document.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                });
                
                document.addEventListener('touchend', function(e) {
                    const touchEndX = e.changedTouches[0].screenX;
                    const deltaX = touchEndX - touchStartX;
                    
                    // Если свайп вправо и меню открыто - закрываем
                    if (deltaX > 50 && mainNav.classList.contains('active')) {
                        closeMobileMenu();
                    }
                });
            }
        }
        
        // Изменение шапки при прокрутке
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Показ кнопки "Наверх"
                if (scrollToTopBtn) {
                    if (window.scrollY > 500) {
                        scrollToTopBtn.classList.add('visible');
                    } else {
                        scrollToTopBtn.classList.remove('visible');
                    }
                }
            });
        }
        
        // Активный пункт меню на основе текущей страницы
        setActiveNavLink();
    }
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Также делаем активной ссылку на корзину, если мы на странице корзины
        if (currentPage.includes('cart.html')) {
            cartLinks.forEach(link => {
                link.classList.add('active');
            });
        }
    }
    
    // ========== КОРЗИНА ==========
    function initCart() {
        console.log('Initializing cart...');
        
        // Обновляем счетчик при загрузке
        updateCartCount();
        
        // Обработка кликов по иконке корзины
        cartLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'cart.html';
            });
        });
        
        // Инициализация страницы корзины
        if (cartPageItems) {
            renderCartPage();
        }
        
        // Инициализация кнопок "В корзину" на главной
        initAddToCartButtons();
    }
    
    function updateCartCount() {
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image
            });
        }
        
        saveCartToStorage();
        updateCartCount();
        showNotification('Товар добавлен в корзину!', 'success');
        
        // Анимация иконки корзины
        const cartLink = document.querySelector('.cart-link');
        if (cartLink) {
            cartLink.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartLink.style.transform = 'scale(1)';
            }, 300);
        }
        
        return true;
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCartToStorage();
        updateCartCount();
        
        if (cartPageItems) {
            renderCartPage();
        }
        
        showNotification('Товар удален из корзины', 'warning');
    }
    
    function updateCartItemQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                removeFromCart(productId);
                return;
            }
            
            saveCartToStorage();
            updateCartCount();
            
            if (cartPageItems) {
                renderCartPage();
            }
        }
    }
    
    function saveCartToStorage() {
        localStorage.setItem('buildpro_cart', JSON.stringify(cart));
    }
    
    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    function renderCartPage() {
        if (!cartPageItems) return;
        
        if (cart.length === 0) {
            cartPageItems.innerHTML = `
                <div class="empty-cart-page">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Ваша корзина пуста</h3>
                    <p>Добавьте товары из каталога, чтобы сделать заказ</p>
                    <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
                </div>
            `;
        } else {
            let itemsHTML = '';
            cart.forEach(item => {
                itemsHTML += `
                    <div class="cart-page-item" data-id="${item.id}">
                        <div class="cart-page-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-page-item-price">${item.price} ₽</div>
                        </div>
                        <div class="cart-page-item-actions">
                            <button class="cart-item-decrease" data-id="${item.id}">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="cart-item-increase" data-id="${item.id}">+</button>
                            <button class="cart-item-remove" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="cart-page-item-total">${item.price * item.quantity} ₽</div>
                    </div>
                `;
            });
            
            const total = getCartTotal();
            
            cartPageItems.innerHTML = itemsHTML + `
                <div class="cart-page-total">
                    <div class="cart-page-total-label">Итого:</div>
                    <div class="cart-page-total-price">${total} ₽</div>
                </div>
                <div class="cart-page-actions">
                    <a href="catalog.html" class="btn btn-secondary">Продолжить покупки</a>
                    <button class="btn btn-primary checkout-page-btn">Оформить заказ</button>
                </div>
            `;
            
            // Добавляем обработчики для кнопок
            document.querySelectorAll('.cart-item-decrease').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(id, -1);
                });
            });
            
            document.querySelectorAll('.cart-item-increase').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(id, 1);
                });
            });
            
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    removeFromCart(id);
                });
            });
            
            // Обработка кнопки оформления заказа
            const checkoutBtn = document.querySelector('.checkout-page-btn');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', function() {
                    if (cart.length === 0) {
                        showNotification('Корзина пуста!', 'error');
                        return;
                    }
                    
                    const total = getCartTotal();
                    showNotification(`Заказ оформлен! Сумма: ${total} ₽. Менеджер свяжется с вами.`, 'success');
                    
                    // Очищаем корзину
                    cart = [];
                    saveCartToStorage();
                    updateCartCount();
                    renderCartPage();
                });
            }
        }
    }
    
    function initAddToCartButtons() {
        // Обработка кнопок "В корзину" на главной странице
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = parseInt(this.getAttribute('data-id'));
                
                if (productId) {
                    const product = catalogItems.find(item => item.id === productId);
                    if (product) {
                        addToCart(product);
                        
                        // Анимация кнопки
                        this.textContent = 'Добавлено!';
                        this.classList.add('added');
                        
                        setTimeout(() => {
                            this.textContent = 'В корзину';
                            this.classList.remove('added');
                        }, 2000);
                    }
                }
            });
        });
    }
    
    // ========== ИЗБРАННОЕ (СЕРДЦЕ) ==========
    function initFavorites() {
        console.log('Initializing favorites...');
        
        // Загружаем избранное из localStorage
        favorites = JSON.parse(localStorage.getItem('buildpro_favorites')) || [];
        
        // Инициализация иконок сердца
        const heartIcons = document.querySelectorAll('.product-wishlist');
        heartIcons.forEach(icon => {
            const productId = icon.getAttribute('data-product-id') || 
                             icon.closest('.product-card')?.getAttribute('data-id');
            
            if (productId) {
                const isFavorite = favorites.includes(parseInt(productId));
                if (isFavorite) {
                    icon.classList.add('active');
                    const heartIcon = icon.querySelector('i');
                    if (heartIcon) {
                        heartIcon.classList.remove('far');
                        heartIcon.classList.add('fas');
                    }
                }
                
                // Обработчик клика
                icon.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const heartIcon = this.querySelector('i');
                    const productId = parseInt(this.getAttribute('data-product-id') || 
                                             this.closest('.product-card')?.getAttribute('data-id'));
                    
                    if (productId) {
                        toggleFavorite(productId, this, heartIcon);
                    }
                });
            }
        });
        
        // Обработчик для делегирования событий
        document.addEventListener('click', function(e) {
            if (e.target.closest('.product-wishlist')) {
                const heartButton = e.target.closest('.product-wishlist');
                const heartIcon = heartButton.querySelector('i');
                const productId = parseInt(heartButton.getAttribute('data-product-id') || 
                                         heartButton.closest('.product-card')?.getAttribute('data-id'));
                
                if (productId && (e.target.tagName === 'I' || e.target.closest('i'))) {
                    toggleFavorite(productId, heartButton, heartIcon);
                }
            }
        });
    }
    
    function toggleFavorite(productId, button, icon) {
        const index = favorites.indexOf(productId);
        
        if (index === -1) {
            // Добавляем в избранное
            favorites.push(productId);
            button.classList.add('active');
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Добавлено в избранное', 'success');
        } else {
            // Удаляем из избранного
            favorites.splice(index, 1);
            button.classList.remove('active');
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Удалено из избранного', 'warning');
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('buildpro_favorites', JSON.stringify(favorites));
        
        // Анимация
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
        
        // Вибрация на мобильных
        if (isMobile && 'vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }
    
    // ========== КАТАЛОГ ==========
    function initCatalog() {
        console.log('Initializing catalog...');
        
        // Отображаем все товары при загрузке
        renderCatalogItems('all');
        
        // Обработка кнопок фильтра
        if (filterButtons) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Удаляем активный класс со всех кнопок
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Добавляем активный класс к текущей кнопке
                    this.classList.add('active');
                    
                    // Отфильтровываем товары
                    const filter = this.getAttribute('data-filter');
                    renderCatalogItems(filter);
                });
            });
        }
        
        // Обработка поиска
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
                
                // Если есть поисковый запрос, показываем все товары и отфильтровываем по поиску
                if (searchTerm) {
                    renderCatalogItems('all', searchTerm);
                } else {
                    // Иначе показываем товары по активному фильтру
                    renderCatalogItems(activeFilter);
                }
            });
        }
        
        // Обработка сортировки
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const sortBy = this.value;
                const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                
                renderCatalogItems(activeFilter, searchTerm, sortBy);
            });
        }
    }
    
    function renderCatalogItems(filter = 'all', searchTerm = '', sortBy = 'default') {
        if (!catalogContainer) return;
        
        // Фильтрация товаров
        let filteredItems = [...catalogItems];
        
        if (filter !== 'all') {
            filteredItems = filteredItems.filter(item => item.category === filter);
        }
        
        // Поиск товаров
        if (searchTerm) {
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Сортировка товаров
        if (sortBy !== 'default') {
            filteredItems.sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'name-asc':
                        return a.name.localeCompare(b.name);
                    case 'name-desc':
                        return b.name.localeCompare(a.name);
                    default:
                        return 0;
                }
            });
        }
        
        // Сообщение, если товаров не найдено
        if (filteredItems.length === 0) {
            catalogContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтрации</p>
                </div>
            `;
            return;
        }
        
        // Создание элементов товаров
        catalogContainer.innerHTML = filteredItems.map(item => {
            const isFavorite = favorites.includes(item.id);
            
            return `
                <div class="catalog-item" data-id="${item.id}">
                    <div class="catalog-item-image ${item.image}"></div>
                    <div class="catalog-item-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="item-info">
                            <div class="item-rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </div>
                            <div class="item-price">${item.price} ₽</div>
                        </div>
                        <div class="catalog-item-actions">
                            <button class="product-wishlist ${isFavorite ? 'active' : ''}" data-product-id="${item.id}">
                                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                            <button class="btn btn-primary add-to-catalog-cart" 
                                    data-id="${item.id}" 
                                    data-name="${item.name}" 
                                    data-price="${item.price}">
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Добавляем обработчики для кнопок добавления в корзину
        document.querySelectorAll('.add-to-catalog-cart').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const name = this.getAttribute('data-name');
                const price = parseInt(this.getAttribute('data-price'));
                
                const product = catalogItems.find(item => item.id === id);
                if (product) {
                    addToCart(product);
                    
                    // Анимация кнопки
                    this.textContent = 'Добавлено!';
                    this.classList.add('added');
                    
                    setTimeout(() => {
                        this.textContent = 'В корзину';
                        this.classList.remove('added');
                    }, 2000);
                }
            });
        });
        
        // Добавляем обработчики для иконок сердца
        document.querySelectorAll('.catalog-item .product-wishlist').forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const heartIcon = this.querySelector('i');
                const productId = parseInt(this.getAttribute('data-product-id'));
                
                if (productId) {
                    toggleFavorite(productId, this, heartIcon);
                }
            });
        });
    }
    
    // ========== ГЛАВНАЯ СТРАНИЦА ==========
    function initHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.textContent.includes('каталог') || this.textContent.includes('Каталог')) {
                    window.location.href = 'catalog.html';
                } else if (this.textContent.includes('услуги') || this.textContent.includes('Услуги')) {
                    window.location.href = 'services.html';
                }
            });
        });
    }
    
    function initProductCards() {
        // Инициализация карточек товаров на главной
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const addToCartBtn = card.querySelector('.add-to-cart');
            const wishlistBtn = card.querySelector('.product-wishlist');
            const productId = parseInt(card.getAttribute('data-id'));
            
            if (addToCartBtn && productId) {
                addToCartBtn.addEventListener('click', function() {
                    const product = catalogItems.find(item => item.id === productId);
                    if (product) {
                        addToCart(product);
                        
                        // Анимация кнопки
                        this.textContent = 'Добавлено!';
                        this.classList.add('added');
                        
                        setTimeout(() => {
                            this.textContent = 'В корзину';
                            this.classList.remove('added');
                        }, 2000);
                    }
                });
            }
            
            if (wishlistBtn && productId) {
                const heartIcon = wishlistBtn.querySelector('i');
                const isFavorite = favorites.includes(productId);
                
                if (isFavorite) {
                    wishlistBtn.classList.add('active');
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                }
                
                wishlistBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    toggleFavorite(productId, this, heartIcon);
                });
            }
        });
    }
    
    // ========== СТРАНИЦА КОНТАКТОВ ==========
    function initContactPage() {
        console.log('Initializing contact page...');
        
        // Инициализация карточек контактов
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('click', function() {
                const phone = this.querySelector('p')?.textContent;
                if (phone && phone.includes('+')) {
                    window.location.href = `tel:${phone.replace(/\D/g, '')}`;
                }
            });
        });
    }
    
    // ========== СТРАНИЦА "О НАС" ==========
    function initAboutPage() {
        console.log('Initializing about page...');
        
        // Анимация статистики при прокрутке
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, { threshold: 0.5 });
            
            statCards.forEach(card => observer.observe(card));
        }
    }
    
    // ========== ФОРМЫ ==========
    function initForms() {
        // Форма заявки на услугу
        if (serviceRequestForm) {
            serviceRequestForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Простая валидация
                const name = this.querySelector('input[name="name"]').value;
                const phone = this.querySelector('input[name="phone"]').value;
                const service = this.querySelector('select[name="service"]').value;
                
                if (!name || !phone || !service) {
                    showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                    return;
                }
                
                // Симуляция отправки
                setTimeout(() => {
                    showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                    this.reset();
                }, 1000);
            });
        }
        
        // Форма обратного звонка
        if (callbackForm) {
            callbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = this.querySelector('input[name="name"]').value;
                const phone = this.querySelector('input[name="phone"]').value;
                
                if (!name || !phone) {
                    showNotification('Пожалуйста, заполните все поля', 'error');
                    return;
                }
                
                setTimeout(() => {
                    showNotification('Спасибо! Мы перезвоним вам в течение 30 минут.', 'success');
                    this.reset();
                }, 1000);
            });
        }
        
        // Форма подписки на рассылку
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = this.querySelector('input[type="email"]').value;
                
                if (!email || !isValidEmail(email)) {
                    showNotification('Пожалуйста, введите корректный email', 'error');
                    return;
                }
                
                setTimeout(() => {
                    showNotification(`Спасибо за подписку! На адрес ${email} будут приходить наши новости и акции.`, 'success');
                    this.reset();
                }, 1000);
            });
        }
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== КНОПКА "НАВЕРХ" ==========
    function initScrollToTop() {
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // ========== УВЕДОМЛЕНИЯ ==========
    function initNotifications() {
        // Создаем контейнер для уведомлений
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    function showNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                              type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Добавляем в контейнер
        const container = document.querySelector('.notification-container') || document.body;
        container.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);
        
        // Закрытие по кнопке
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.classList.remove('active');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========
    function checkFontAwesome() {
        // Проверяем загрузились ли иконки Font Awesome
        setTimeout(() => {
            const testIcon = document.createElement('i');
            testIcon.className = 'fas fa-check';
            testIcon.style.visibility = 'hidden';
            document.body.appendChild(testIcon);
            
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(testIcon, '::before');
                const content = computedStyle.content;
                
                if (!content || content === 'none' || content === 'normal') {
                    console.warn('Font Awesome not loaded properly');
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
    
    // ========== ОБРАБОТКА ИЗМЕНЕНИЯ ОРИЕНТАЦИИ И РАЗМЕРА ==========
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Обновляем счетчик корзины
            updateCartCount();
            
            // Закрываем мобильное меню при изменении размера на десктоп
            if (window.innerWidth > 768 && mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    // ========== PWA И SERVICE WORKER ==========
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
    
    // ========== ЗАПУСК ==========
    init();
    
    // Проверка Font Awesome
    checkFontAwesome();
});

// ========== ПОЛИФИЛЛЫ ДЛЯ СТАРЫХ БРАУЗЕРОВ ==========
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
