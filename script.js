// script.js - Упрощенная версия без preloader
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация данных для каталога
    const catalogItems = [
        { id: 1, name: "Цемент М500 Д0", description: "Мешок 50 кг, высокое качество, для любых строительных работ", price: "450", category: "materials", image: "cement" },
        { id: 2, name: "Песок строительный", description: "Речной песок, фракция 1.5-2 мм, мытый, без примесей", price: "1200", category: "materials", image: "sand" },
        { id: 3, name: "Кирпич красный", description: "Облицовочный кирпич, 250x120x65 мм, полнотелый", price: "25", category: "materials", image: "bricks" },
        { id: 4, name: "Гипсокартон влагостойкий", description: "ГКЛВ 12.5 мм, размер 1200x2500 мм", price: "350", category: "materials", image: "drywall" },
        { id: 5, name: "Перфоратор SDS-MAX", description: "Мощный перфоратор с 3 режимами, 1500 Вт", price: "8900", category: "tools", image: "perforator" },
        { id: 6, name: "Дрель-шуруповерт", description: "Аккумуляторная, 18В, 2 аккумулятора, кейс в комплекте", price: "5500", category: "tools", image: "drill" },
        { id: 7, name: "Болгарка 125 мм", description: "Угловая шлифмашина 125 мм, 1100 Вт, защитный кожух", price: "4200", category: "tools", image: "grinder" },
        { id: 8, name: "Краска интерьерная", description: "Водоэмульсионная, белая, 10 кг, моющаяся", price: "2800", category: "finishing", image: "paint" },
        { id: 9, name: "Обои флизелиновые", description: "Под покраску, плотность 110 г/м², ширина 1.06 м", price: "850", category: "finishing", image: "wallpaper" },
        { id: 10, name: "Плитка керамическая", description: "Для ванной комнаты, 30x30 см, влагостойкая", price: "750", category: "finishing", image: "tiles" },
        { id: 11, name: "Ламинат 33 класс", description: "Класс износостойкости 33, толщина 12 мм, влагостойкий", price: "650", category: "finishing", image: "laminate" },
        { id: 12, name: "Шпатлевка финишная", description: "Для выравнивания стен, 20 кг, готовая к применению", price: "480", category: "materials", image: "putty" },
        { id: 13, name: "Смеситель для ванной", description: "Однорычажный, с душем, хром", price: "3200", category: "plumbing", image: "mixer" },
        { id: 14, name: "Раковина из искусственного камня", description: "С тумбой, ширина 60 см, белый мат", price: "8500", category: "plumbing", image: "sink" },
        { id: 15, name: "Кабель ВВГнг 3x2.5", description: "Кабель силовой, медный, негорючий, 100 м", price: "4800", category: "electrical", image: "cable" },
        { id: 16, name: "Розетка с заземлением", description: "Евростандарт, белая, механизм с защитными шторками", price: "120", category: "electrical", image: "socket" }
    ];
    
    // Корзина
    let cart = JSON.parse(localStorage.getItem('buildpro_cart')) || [];
    
    // Переменные для элементов DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navList = document.querySelector('.nav-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogContainer = document.querySelector('.catalog-items');
    const searchInput = document.getElementById('searchInput');
    const serviceRequestForm = document.getElementById('serviceRequestForm');
    const callbackForm = document.getElementById('callbackForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const cartCount = document.getElementById('cartCount');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartPageItems = document.getElementById('cartPageItems');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const addToCatalogCartButtons = document.querySelectorAll('.add-to-catalog-cart');
    
    // Инициализация шапки
    function initHeader() {
        // Обработка мобильного меню
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                if (navList) {
                    navList.classList.toggle('active');
                    this.innerHTML = navList.classList.contains('active') 
                        ? '<i class="fas fa-times"></i>' 
                        : '<i class="fas fa-bars"></i>';
                    
                    // На мобильных добавляем вибрацию
                    if (window.innerWidth <= 768 && 'vibrate' in navigator) {
                        navigator.vibrate(10);
                    }
                }
            });
        }
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (navList && !e.target.closest('.main-nav') && 
                !e.target.closest('.mobile-menu-btn') && 
                navList.classList.contains('active')) {
                navList.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
        
        // Изменение шапки при прокрутке
        const header = document.querySelector('.header');
        const scrollThreshold = 100;
        
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > scrollThreshold) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }
    
    // Инициализация корзины
    function initCart() {
        updateCartCount();
        renderCartItems();
        
        // Обработка всех ссылок корзины
        const cartLinks = document.querySelectorAll('.cart-link');
        cartLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Всегда переходим на страницу корзины
                window.location.href = 'cart.html';
            });
        });
        
        // Если на странице корзины, делаем ссылку активной
        if (window.location.pathname.includes('cart.html')) {
            cartLinks.forEach(link => {
                link.classList.add('active');
            });
        }
        
        // Закрытие корзины (сайдбар)
        if (closeCart) {
            closeCart.addEventListener('click', function() {
                if (cartSidebar) {
                    cartSidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Закрытие корзины при клике вне ее
        document.addEventListener('click', function(e) {
            if (cartSidebar && !e.target.closest('.cart-sidebar') && 
                cartSidebar.classList.contains('active')) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Обработка добавления в корзину
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const productCard = this.closest('.product-card');
                const name = productCard?.querySelector('h3')?.textContent || 'Товар';
                const priceText = productCard?.querySelector('.current-price')?.textContent || '0';
                const price = parseFloat(priceText.replace(/[^\d]/g, ''));
                
                addToCart(id, name, price);
                this.textContent = 'Добавлено!';
                this.classList.add('added');
                
                setTimeout(() => {
                    this.textContent = 'В корзину';
                    this.classList.remove('added');
                }, 2000);
            });
        });
        
        // Обработка добавления в корзину из каталога
        addToCatalogCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                
                addToCart(id, name, price);
                this.textContent = 'Добавлено!';
                this.classList.add('added');
                
                setTimeout(() => {
                    this.textContent = 'В корзину';
                    this.classList.remove('added');
                }, 2000);
            });
        });
        
        // Обработка кнопки оформления заказа в сайдбаре
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Корзина пуста!');
                    return;
                }
                
                alert(`Заказ оформлен! Сумма заказа: ${getCartTotal()} ₽. Наш менеджер свяжется с вами для подтверждения.`);
                cart = [];
                localStorage.setItem('buildpro_cart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
                if (cartSidebar) {
                    cartSidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Обработка кнопки оформления заказа на странице корзины
        const checkoutPageBtn = document.querySelector('.checkout-page-btn');
        if (checkoutPageBtn) {
            checkoutPageBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    alert('Корзина пуста!');
                    return;
                }
                
                alert(`Заказ оформлен! Сумма заказа: ${getCartTotal()} ₽. Наш менеджер свяжется с вами для подтверждения.`);
                cart = [];
                localStorage.setItem('buildpro_cart', JSON.stringify(cart));
                updateCartCount();
                renderCartItems();
            });
        }
    }
    
    // Добавление товара в корзину
    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        localStorage.setItem('buildpro_cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
        
        // Анимация иконки корзины
        const cartLink = document.querySelector('.cart-link');
        if (cartLink) {
            cartLink.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartLink.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Обновление счетчика корзины
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }
    
    // Получение общей суммы корзины
    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Отрисовка товаров в корзине
    function renderCartItems() {
        const total = getCartTotal();
        
        // Обновление общей суммы в сайдбаре
        if (cartTotal) {
            cartTotal.textContent = `${total} ₽`;
        }
        
        // Отрисовка в сайдбаре
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-basket"></i>
                        <p>Ваша корзина пуста</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${item.price} ₽ × ${item.quantity} = ${item.price * item.quantity} ₽</div>
                        </div>
                        <div class="cart-item-actions">
                            <button class="cart-item-decrease" data-id="${item.id}">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="cart-item-increase" data-id="${item.id}">+</button>
                            <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('');
                
                // Добавление обработчиков для кнопок корзины
                document.querySelectorAll('.cart-item-decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        updateCartItemQuantity(id, -1);
                    });
                });
                
                document.querySelectorAll('.cart-item-increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        updateCartItemQuantity(id, 1);
                    });
                });
                
                document.querySelectorAll('.cart-item-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        removeCartItem(id);
                    });
                });
            }
        }
        
        // Отрисовка на странице корзины
        if (cartPageItems) {
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
                cartPageItems.innerHTML = cart.map(item => `
                    <div class="cart-page-item" data-id="${item.id}">
                        <div class="cart-page-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-page-item-price">${item.price} ₽</div>
                        </div>
                        <div class="cart-page-item-actions">
                            <button class="cart-item-decrease" data-id="${item.id}">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="cart-item-increase" data-id="${item.id}">+</button>
                            <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        </div>
                        <div class="cart-page-item-total">${item.price * item.quantity} ₽</div>
                    </div>
                `).join('');
                
                // Итоговая сумма
                cartPageItems.innerHTML += `
                    <div class="cart-page-total">
                        <div class="cart-page-total-label">Итого:</div>
                        <div class="cart-page-total-price">${total} ₽</div>
                    </div>
                    <div class="cart-page-actions">
                        <a href="catalog.html" class="btn btn-secondary">Продолжить покупки</a>
                        <button class="btn btn-primary checkout-page-btn">Оформить заказ</button>
                    </div>
                `;
                
                // Обработчики для страницы корзины
                document.querySelectorAll('.cart-page-item .cart-item-decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        updateCartItemQuantity(id, -1);
                    });
                });
                
                document.querySelectorAll('.cart-page-item .cart-item-increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        updateCartItemQuantity(id, 1);
                    });
                });
                
                document.querySelectorAll('.cart-page-item .cart-item-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        removeCartItem(id);
                    });
                });
            }
        }
    }
    
    // Обновление количества товара в корзине
    function updateCartItemQuantity(id, change) {
        const item = cart.find(item => item.id == id);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                cart = cart.filter(item => item.id != id);
            }
            
            localStorage.setItem('buildpro_cart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        }
    }
    
    // Удаление товара из корзины
    function removeCartItem(id) {
        cart = cart.filter(item => item.id != id);
        localStorage.setItem('buildpro_cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
    
    // Инициализация каталога
    function initCatalog() {
        // Отобразить все товары при загрузке
        renderCatalogItems('all');
        
        // Добавить обработчики для кнопок фильтра
        if (filterButtons) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Удалить активный класс со всех кнопок
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Добавить активный класс к текущей кнопке
                    this.classList.add('active');
                    
                    // Отфильтровать товары
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
                
                // Если есть поисковый запрос, показать все товары и отфильтровать по поиску
                if (searchTerm) {
                    renderCatalogItems('all', searchTerm);
                } else {
                    // Иначе показать товары по активному фильтру
                    renderCatalogItems(activeFilter);
                }
            });
        }
    }
    
    // Рендер товаров каталога
    function renderCatalogItems(filter, searchTerm = '') {
        // Очистить контейнер
        if (catalogContainer) {
            catalogContainer.innerHTML = '';
        }
        
        // Фильтрация товаров
        let filteredItems = catalogItems;
        
        if (filter !== 'all') {
            filteredItems = catalogItems.filter(item => item.category === filter);
        }
        
        // Поиск товаров
        if (searchTerm) {
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Сообщение, если товаров не найдено
        if (filteredItems.length === 0) {
            if (catalogContainer) {
                catalogContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>Товары не найдены</h3>
                        <p>Попробуйте изменить параметры поиска или фильтрации</p>
                    </div>
                `;
            }
            return;
        }
        
        // Создание элементов товаров
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'catalog-item';
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">${item.price} ₽</div>
                <button class="btn btn-outline add-to-catalog-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">В корзину</button>
            `;
            
            if (catalogContainer) {
                catalogContainer.appendChild(itemElement);
            }
        });
        
        // Добавить обработчики для кнопок заказа
        document.querySelectorAll('.add-to-catalog-cart').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const name = this.getAttribute('data-name');
                const price = parseFloat(this.getAttribute('data-price'));
                
                addToCart(id, name, price);
                this.textContent = 'Добавлено!';
                this.classList.add('added');
                
                setTimeout(() => {
                    this.textContent = 'В корзину';
                    this.classList.remove('added');
                }, 2000);
            });
        });
    }
    
    // Обработка формы заявки на услугу
    if (serviceRequestForm) {
        serviceRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
    
    // Обработка формы обратного звонка
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за заявку! Мы перезвоним вам в течение 30 минут.');
            this.reset();
        });
    }
    
    // Обработка формы подписки на рассылку
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Спасибо за подписку! На адрес ${email} будут приходить наши новости и акции.`);
            this.reset();
        });
    }
    
    // Кнопка "Наверх"
    const scrollToTop = document.getElementById('scrollToTop');
    if (scrollToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });
        
        scrollToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Инициализация при загрузке
    initHeader();
    initCart();
    
    // Если есть каталог, инициализировать его
    if (document.querySelector('.catalog-items')) {
        initCatalog();
    }
});