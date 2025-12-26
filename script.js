// script.js - Основной функционал BuildCraft
document.addEventListener('DOMContentLoaded', function() {
    console.log('BuildCraft main JS initialized');
    
    // ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
    const cart = JSON.parse(localStorage.getItem('buildpro_cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('buildpro_favorites')) || [];
    
    // Используем базу данных товаров из ProductsDB
    const productsDB = window.ProductsDB || new ProductsDatabase();
    
    // ========== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ==========
    function init() {
        console.log('Initializing BuildCraft...');
        
        // Инициализация компонентов
        initCart();
        initCatalog();
        initProductCards();
        initForms();
        initScrollToTop();
        initHeaderScroll();
        initPriceSlider();
        initHeartIcons(); // <-- Добавлена инициализация иконок сердца
        
        // Страничные инициализации
        if (document.querySelector('.contact-content')) initContactPage();
        if (document.querySelector('.about-content')) initAboutPage();
        if (document.querySelector('.services-grid')) initServicesPage();
        if (document.getElementById('productDetail')) initProductDetailPage();
        
        console.log('BuildCraft initialized successfully');
    }
    
    // ========== ИНИЦИАЛИЗАЦИЯ ИКОНОК СЕРДЦА (ДОБАВЛЕНА) ==========
    function initHeartIcons() {
        console.log('Initializing heart icons...');
        
        // Восстанавливаем состояние избранного из localStorage
        document.querySelectorAll('.product-wishlist').forEach(icon => {
            const productId = icon.getAttribute('data-id') || icon.getAttribute('data-product-id');
            if (productId) {
                const isFavorite = localStorage.getItem(`favorite_${productId}`) === 'true';
                if (isFavorite) {
                    icon.classList.add('active');
                    const heartIcon = icon.querySelector('i');
                    if (heartIcon) {
                        heartIcon.className = 'fas fa-heart';
                    }
                }
            }
        });
        
        // Обработчик кликов по иконкам сердца
        document.addEventListener('click', function(e) {
            const wishlistBtn = e.target.closest('.product-wishlist');
            if (wishlistBtn) {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = wishlistBtn.getAttribute('data-id') || wishlistBtn.getAttribute('data-product-id');
                const isActive = wishlistBtn.classList.toggle('active');
                const heartIcon = wishlistBtn.querySelector('i');
                
                // Обновляем иконку
                if (heartIcon) {
                    heartIcon.className = isActive ? 'fas fa-heart' : 'far fa-heart';
                }
                
                // Сохраняем состояние в localStorage
                if (productId) {
                    localStorage.setItem(`favorite_${productId}`, isActive);
                    
                    // Показываем уведомление
                    if (isActive) {
                        showNotification('Товар добавлен в избранное ❤️', 'success');
                    } else {
                        showNotification('Товар удален из избранного', 'info');
                    }
                }
                
                // Анимация
                wishlistBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    wishlistBtn.style.transform = '';
                }, 300);
                
                // Вибрация на мобильных
                if ('vibrate' in navigator) {
                    navigator.vibrate(20);
                }
            }
        });
    }
    
    // ========== КОРЗИНА ==========
    function initCart() {
        updateCartCount();
        
        // Обработка кликов по корзине
        document.querySelectorAll('.cart-link').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === 'cart.html') {
                    e.preventDefault();
                    window.location.href = 'cart.html';
                }
            });
        });
        
        // Инициализация страницы корзины
        if (document.getElementById('cartPageItems')) {
            renderCartPage();
            updateCartTotal();
        }
        
        // Инициализация кнопок "В корзину"
        initAddToCartButtons();
    }
    
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    function initAddToCartButtons() {
        document.addEventListener('click', function(e) {
            const addToCartBtn = e.target.closest('.add-to-cart');
            if (addToCartBtn) {
                e.preventDefault();
                
                const productId = addToCartBtn.getAttribute('data-id');
                if (productId) {
                    addToCart(productId);
                }
            }
        });
    }
    
    function addToCart(productId, quantity = 1) {
        const product = productsDB.getProductById(productId);
        
        if (!product) {
            showNotification('Товар не найден', 'error');
            return;
        }
        
        // Проверяем наличие
        const availability = productsDB.checkAvailability(productId, quantity);
        if (!availability.available) {
            showNotification(availability.reason, 'error');
            return;
        }
        
        // Добавляем в корзину
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit,
                image: product.image,
                quantity: quantity,
                maxStock: product.stockCount
            });
        }
        
        localStorage.setItem('buildpro_cart', JSON.stringify(cart));
        updateCartCount();
        
        // Анимация кнопки
        const addToCartBtn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        if (addToCartBtn) {
            const originalText = addToCartBtn.innerHTML;
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Добавлено!';
            addToCartBtn.classList.add('added');
            
            setTimeout(() => {
                addToCartBtn.innerHTML = originalText;
                addToCartBtn.classList.remove('added');
            }, 2000);
        }
        
        // Анимация иконки корзины
        const cartLink = document.querySelector('.cart-link');
        if (cartLink) {
            cartLink.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartLink.style.transform = '';
            }, 300);
        }
        
        // Показываем уведомление
        showMiniCartNotification(product);
    }
    
    function showMiniCartNotification(product) {
        showNotification(`Товар "${product.name}" добавлен в корзину`, 'success');
    }
    
    function renderCartPage() {
        const cartPageItems = document.getElementById('cartPageItems');
        if (!cartPageItems) return;
        
        if (cart.length === 0) {
            cartPageItems.innerHTML = `
                <div class="empty-cart-page">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Ваша корзина пуста</h3>
                    <p>Добавьте товары из каталога, чтобы сделать заказ</p>
                    <a href="catalog.html" class="btn btn-primary">
                        <i class="fas fa-shopping-basket"></i> Перейти в каталог
                    </a>
                </div>
            `;
            
            const cartTotal = document.getElementById('cartTotal');
            if (cartTotal) cartTotal.style.display = 'none';
        } else {
            let html = '<div class="cart-items-list">';
            
            cart.forEach(item => {
                const product = productsDB.getProductById(item.id) || item;
                const totalPrice = item.price * item.quantity;
                
                html += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <div class="cart-item-emoji">${product.image || '📦'}</div>
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">${item.price} ₽/${item.unit || 'шт'}</p>
                            ${product.brand ? `<p class="cart-item-brand">Бренд: ${product.brand}</p>` : ''}
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn plus" ${item.quantity >= (item.maxStock || 999) ? 'disabled' : ''}>+</button>
                        </div>
                        <div class="cart-item-total">
                            <strong>${totalPrice} ₽</strong>
                        </div>
                        <button class="cart-item-remove" title="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });
            
            html += '</div>';
            cartPageItems.innerHTML = html;
            
            initCartItemHandlers();
            updateCartTotal();
        }
    }
    
    function updateCartTotal() {
        const totalElement = document.getElementById('cartTotalValue');
        const countElement = document.getElementById('cartItemsCount');
        
        if (totalElement && countElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            countElement.textContent = totalItems;
            totalElement.textContent = `${totalPrice} ₽`;
            
            document.getElementById('cartTotal').style.display = 'block';
        }
    }
    
    function initCartItemHandlers() {
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-id');
                const quantitySpan = cartItem.querySelector('.quantity-value');
                const isPlus = this.classList.contains('plus');
                
                let item = cart.find(i => i.id === itemId);
                if (item) {
                    if (isPlus) {
                        const availability = productsDB.checkAvailability(itemId, item.quantity + 1);
                        if (availability.available) {
                            item.quantity += 1;
                        } else {
                            showNotification(availability.reason, 'warning');
                            return;
                        }
                    } else {
                        item.quantity = Math.max(1, item.quantity - 1);
                    }
                    
                    localStorage.setItem('buildpro_cart', JSON.stringify(cart));
                    quantitySpan.textContent = item.quantity;
                    
                    const totalElement = cartItem.querySelector('.cart-item-total strong');
                    if (totalElement) {
                        totalElement.textContent = `${item.price * item.quantity} ₽`;
                    }
                    
                    const minusBtn = cartItem.querySelector('.quantity-btn.minus');
                    const plusBtn = cartItem.querySelector('.quantity-btn.plus');
                    
                    if (minusBtn) minusBtn.disabled = item.quantity <= 1;
                    
                    const availability = productsDB.checkAvailability(itemId, item.quantity + 1);
                    if (plusBtn) plusBtn.disabled = !availability.available;
                    
                    updateCartCount();
                    updateCartTotal();
                }
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-id');
                
                if (confirm('Удалить товар из корзины?')) {
                    const index = cart.findIndex(i => i.id === itemId);
                    if (index > -1) {
                        cart.splice(index, 1);
                        localStorage.setItem('buildpro_cart', JSON.stringify(cart));
                        cartItem.style.opacity = '0';
                        cartItem.style.transform = 'translateX(100px)';
                        
                        setTimeout(() => {
                            cartItem.remove();
                            updateCartCount();
                            updateCartTotal();
                            
                            if (cart.length === 0) {
                                renderCartPage();
                            }
                        }, 300);
                    }
                }
            });
        });
        
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cart.length === 0) {
                    showNotification('Корзина пуста. Добавьте товары для оформления заказа.', 'warning');
                    return;
                }
                
                showNotification('Функция оформления заказа в разработке. Спасибо за интерес!', 'info');
            });
        }
    }
    
    // ========== КАТАЛОГ ==========
    function initCatalog() {
        const catalogContainer = document.querySelector('.catalog-items');
        if (!catalogContainer) return;
        
        // Генерируем товары при загрузке страницы
        generateCatalogItems();
        
        // Обработка фильтров по категориям
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterCatalogItems(filter);
                updateProductCount();
            });
        });
        
        // Обработка поиска
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                filterCatalogItems('all', searchTerm);
                updateProductCount();
            });
        }
        
        // Обработка сортировки
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                sortCatalogItems(this.value);
            });
        }
        
        // Обработка сброса фильтров
        const clearFiltersBtn = document.querySelector('.clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                resetFilters();
            });
        }
        
        // Кнопка "Показать еще"
        const loadMoreBtn = document.querySelector('.load-more button');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                showNotification('Загружены дополнительные товары', 'info');
                this.textContent = 'Все товары загружены';
                this.disabled = true;
            });
        }
        
        // Инициализация фильтров по брендам
        initBrandFilters();
    }
    
    function generateCatalogItems() {
        const catalogContainer = document.querySelector('.catalog-items');
        if (!catalogContainer) return;
        
        const products = productsDB.getAllProducts();
        let html = '';
        
        products.forEach(product => {
            // Проверяем состояние избранного для каждого товара
            const isFavorite = localStorage.getItem(`favorite_${product.id}`) === 'true';
            html += productsDB.generateProductCardHTML(product, isFavorite);
        });
        
        catalogContainer.innerHTML = html;
        updateProductCount();
    }
    
    function filterCatalogItems(filter = 'all', searchTerm = '') {
        const catalogContainer = document.querySelector('.catalog-items');
        if (!catalogContainer) return 0;
        
        const priceSlider = document.querySelector('.price-slider');
        const maxPrice = priceSlider ? parseInt(priceSlider.value) : 100000;
        
        let filteredProducts;
        
        if (searchTerm) {
            filteredProducts = productsDB.searchProducts(searchTerm);
        } else {
            filteredProducts = productsDB.getProductsByCategory(filter);
        }
        
        // Фильтрация по цене
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        
        // Обновляем отображение
        let html = '';
        filteredProducts.forEach(product => {
            // Проверяем состояние избранного для каждого товара
            const isFavorite = localStorage.getItem(`favorite_${product.id}`) === 'true';
            html += productsDB.generateProductCardHTML(product, isFavorite);
        });
        
        catalogContainer.innerHTML = html;
        
        // Показываем сообщение если ничего не найдено
        showNoResultsMessage(filteredProducts.length === 0);
        
        return filteredProducts.length;
    }
    
    function sortCatalogItems(sortType) {
        const catalogContainer = document.querySelector('.catalog-items');
        if (!catalogContainer) return;
        
        const items = Array.from(catalogContainer.querySelectorAll('.catalog-item'));
        const products = items.map(item => {
            return {
                element: item,
                price: parseInt(item.getAttribute('data-price')),
                rating: parseFloat(item.querySelector('.product-rating span')?.textContent || 0),
                name: item.querySelector('.product-title')?.textContent || ''
            };
        });
        
        let sortedItems;
        
        switch(sortType) {
            case 'price-low':
                sortedItems = products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedItems = products.sort((a, b) => b.price - a.price);
                break;
            case 'rating-high':
                sortedItems = products.sort((a, b) => b.rating - a.rating);
                break;
            default:
                return;
        }
        
        // Переставляем элементы
        sortedItems.forEach(item => catalogContainer.appendChild(item.element));
    }
    
    function updateProductCount() {
        const productCountElement = document.getElementById('productCount');
        if (!productCountElement) return;
        
        const visibleCount = filterCatalogItems();
        productCountElement.textContent = visibleCount;
    }
    
    function showNoResultsMessage(show) {
        const catalogContainer = document.querySelector('.catalog-items');
        if (!catalogContainer) return;
        
        const existingMessage = catalogContainer.querySelector('.no-results');
        if (existingMessage) existingMessage.remove();
        
        if (show) {
            const message = document.createElement('div');
            message.className = 'no-results';
            message.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search"></i>
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтрации</p>
                    <button class="btn btn-outline clear-filters">
                        <i class="fas fa-redo"></i> Сбросить фильтры
                    </button>
                </div>
            `;
            
            catalogContainer.appendChild(message);
            
            message.querySelector('.clear-filters').addEventListener('click', function() {
                resetFilters();
            });
        }
    }
    
    function resetFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            }
        });
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) sortSelect.value = 'default';
        
        const priceSlider = document.querySelector('.price-slider');
        if (priceSlider) priceSlider.value = 50000;
        updatePriceDisplay(50000);
        
        filterCatalogItems('all');
        updateProductCount();
    }
    
    function initPriceSlider() {
        const priceSlider = document.querySelector('.price-slider');
        if (!priceSlider) return;
        
        priceSlider.addEventListener('input', function() {
            updatePriceDisplay(this.value);
            filterCatalogItems();
            updateProductCount();
        });
        
        updatePriceDisplay(priceSlider.value);
    }
    
    function updatePriceDisplay(value) {
        const priceValues = document.querySelector('.price-values');
        if (priceValues) {
            const currentPrice = document.querySelector('.current-price-display');
            
            if (!currentPrice) {
                const priceDisplay = document.createElement('div');
                priceDisplay.className = 'current-price-display';
                priceDisplay.style.cssText = `
                    font-weight: 600;
                    color: #1976D2;
                    margin: 10px 0;
                    font-size: 18px;
                `;
                priceValues.parentNode.insertBefore(priceDisplay, priceValues);
            }
            
            const displayElement = document.querySelector('.current-price-display');
            if (displayElement) {
                displayElement.textContent = `До ${formatPrice(value)} ₽`;
            }
        }
    }
    
    function initBrandFilters() {
        const brandsContainer = document.querySelector('.brand-filters');
        if (!brandsContainer) return;
        
        const brands = productsDB.getAllBrands();
        let html = '<div class="brand-filter-section"><h4>Бренды</h4><div class="brand-checkboxes">';
        
        brands.forEach(brand => {
            html += `
                <label class="brand-checkbox">
                    <input type="checkbox" value="${brand}">
                    <span>${brand}</span>
                </label>
            `;
        });
        
        html += '</div></div>';
        brandsContainer.innerHTML = html;
        
        // Обработка выбора брендов
        brandsContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                applyBrandFilters();
            });
        });
    }
    
    function applyBrandFilters() {
        const selectedBrands = Array.from(
            document.querySelectorAll('.brand-checkbox input:checked')
        ).map(cb => cb.value);
        
        // Здесь можно добавить фильтрацию по брендам
        if (selectedBrands.length > 0) {
            console.log('Selected brands:', selectedBrands);
        }
    }
    
    // ========== СТРАНИЦА ТОВАРА ==========
    function initProductDetailPage() {
        const productDetailContainer = document.getElementById('productDetail');
        if (!productDetailContainer) return;
        
        // Получаем ID товара из URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            productDetailContainer.innerHTML = '<p>Товар не найден</p>';
            return;
        }
        
        const product = productsDB.getProductById(productId);
        if (!product) {
            productDetailContainer.innerHTML = '<p>Товар не найден</p>';
            return;
        }
        
        // Проверяем состояние избранного для этого товара
        const isFavorite = localStorage.getItem(`favorite_${productId}`) === 'true';
        
        // Генерируем HTML для товара
        productDetailContainer.innerHTML = productsDB.generateProductDetailHTML(product, isFavorite);
        
        // Инициализация табов
        initProductTabs();
        
        // Инициализация обработчиков для кнопок "В корзину" на странице товара
        initAddToCartButtons();
        
        // Инициализация иконки сердца на странице товара
        initHeartIcons();
    }
    
    function initProductTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Убираем активный класс у всех кнопок и панелей
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке и панели
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // ========== ПРОДУКТЫ ==========
    function initProductCards() {
        document.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card, .catalog-item');
            if (!productCard) return;
            
            if (e.target.closest('.add-to-cart') || 
                e.target.closest('.product-wishlist') ||
                e.target.closest('.product-badge')) {
                return;
            }
            
            const productId = productCard.getAttribute('data-id');
            if (productId) {
                // В реальном приложении здесь был бы переход на страницу товара
                window.location.href = `product.html?id=${productId}`;
            }
        });
    }
    
    // ========== ФОРМЫ ==========
    function initForms() {
        const callbackForm = document.getElementById('callbackForm');
        if (callbackForm) {
            callbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const phone = this.querySelector('input[type="tel"]').value;
                const name = this.querySelector('input[type="text"]').value;
                
                if (!phone || phone.length < 10) {
                    showNotification('Введите корректный номер телефона', 'error');
                    return;
                }
                
                showNotification(`Спасибо, ${name || 'клиент'}! Мы перезвоним вам в течение 30 минут на номер ${phone}.`, 'success');
                this.reset();
            });
        }
        
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                if (!validateEmail(email)) {
                    showNotification('Введите корректный email адрес', 'error');
                    return;
                }
                
                showNotification(`Спасибо за подписку! На адрес ${email} будут приходить наши новости и спецпредложения.`, 'success');
                this.reset();
            });
        }
        
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#C62828';
                        field.style.boxShadow = '0 0 0 2px rgba(198, 40, 40, 0.1)';
                        
                        setTimeout(() => {
                            field.style.borderColor = '';
                            field.style.boxShadow = '';
                        }, 3000);
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                }
            });
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== SCROLL FUNCTIONS ==========
    function initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
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
    }
    
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (header) {
            let lastScroll = 0;
            
            window.addEventListener('scroll', function() {
                const currentScroll = window.scrollY;
                
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                    
                    if (currentScroll > lastScroll && currentScroll > 200) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                } else {
                    header.classList.remove('scrolled');
                    header.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            });
        }
    }
    
    // ========== PAGE SPECIFIC ==========
    function initContactPage() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.addEventListener('click', function() {
                window.open('https://maps.google.com/?q=Москва,+ул.+Строителей,+1', '_blank');
            });
        }
        
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', function() {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        });
    }
    
    function initAboutPage() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumber = entry.target;
                        const target = parseInt(statNumber.textContent.replace(/\s/g, ''));
                        let current = 0;
                        const increment = target / 50;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            statNumber.textContent = Math.round(current).toLocaleString();
                        }, 30);
                        
                        observer.unobserve(statNumber);
                    }
                });
            }, { threshold: 0.5 });
            
            statNumbers.forEach(number => observer.observe(number));
        }
    }
    
    function initServicesPage() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.service-link') && !e.target.closest('a')) {
                    const serviceId = this.getAttribute('data-id') || this.querySelector('h3')?.textContent;
                    showNotification(`Переход к услуге: ${serviceId}`, 'info');
                }
            });
        });
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2E7D32' : 
                         type === 'error' ? '#C62828' : 
                         type === 'warning' ? '#F57C00' : 
                         type === 'info' ? '#1976D2' : '#546E7A'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type] || 'fa-info-circle'}" style="font-size: 20px;"></i>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 3px;">
                    ${type === 'success' ? 'Успешно!' : 
                      type === 'error' ? 'Ошибка!' : 
                      type === 'warning' ? 'Внимание!' : 'Информация'}
                </div>
                <div style="font-size: 14px;">${message}</div>
            </div>
            <button class="notification-close" style="background: none; border: none; color: white; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        const autoClose = setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        notification.addEventListener('mouseenter', () => clearTimeout(autoClose));
        notification.addEventListener('mouseleave', () => {
            setTimeout(() => {
                notification.style.transform = 'translateX(150%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        });
    }
    
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // ========== INIT ==========
    init();
    
    // ========== GLOBAL HELPERS ==========
    window.BuildCraft = {
        updateCartCount: updateCartCount,
        showNotification: showNotification,
        initHeartIcons: initHeartIcons, // <-- Добавлена функция
        getCart: () => cart,
        getFavorites: () => favorites,
        getProducts: () => productsDB.getAllProducts(),
        getProductById: (id) => productsDB.getProductById(id),
        addToCart: (productId, quantity = 1) => addToCart(productId, quantity),
        removeFromCart: (productId) => {
            const index = cart.findIndex(item => item.id === productId);
            if (index > -1) {
                cart.splice(index, 1);
                localStorage.setItem('buildpro_cart', JSON.stringify(cart));
                updateCartCount();
                return true;
            }
            return false;
        },
        getProductsByCategory: (category) => productsDB.getProductsByCategory(category),
        searchProducts: (query) => productsDB.searchProducts(query),
        filterProducts: (filters) => productsDB.filterProducts(filters),
        sortProducts: (products, sortType) => productsDB.sortProducts(products, sortType),
        getProductsStats: () => productsDB.getProductsStats(),
        getSimilarProducts: (productId, limit) => productsDB.getSimilarProducts(productId, limit),
        getDiscountedProducts: () => productsDB.getDiscountedProducts(),
        getNewProducts: (limit) => productsDB.getNewProducts(limit),
        getPopularProducts: (limit) => productsDB.getPopularProducts(limit),
        checkAvailability: (productId, quantity) => productsDB.checkAvailability(productId, quantity),
        getDeliveryInfo: (productId) => productsDB.getDeliveryInfo(productId),
        generateProductCardHTML: (product, isFavorite) => productsDB.generateProductCardHTML(product, isFavorite),
        generateProductDetailHTML: (product, isFavorite) => productsDB.generateProductDetailHTML(product, isFavorite)
    };
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mainNav = document.querySelector('.main-nav');
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                
                const menuBtn = document.getElementById('mobileMenuBtn');
                if (menuBtn) {
                    menuBtn.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
                
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) overlay.classList.remove('active');
            }
        }
        
        if (document.querySelector('.catalog-items')) {
            updateProductCount();
        }
    });
    
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('buildpro_cart', JSON.stringify(cart));
        localStorage.setItem('buildpro_favorites', JSON.stringify(favorites));
    });
    
    console.log('BuildCraft ready with ProductsDB integration');
});

// Полифиллы
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Глобальные стили для анимаций
if (!document.querySelector('#buildcraft-animations')) {
    const style = document.createElement('style');
    style.id = 'buildcraft-animations';
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        .catalog-item {
            animation: fadeIn 0.3s ease;
        }
        
        .cart-item {
            transition: all 0.3s ease;
        }
        
        .notification {
            animation: slideIn 0.3s ease;
        }
        
        .product-card {
            transition: all 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .tab-pane {
            display: none;
        }
        
        .tab-pane.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        
        .similar-products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .similar-product {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .similar-product:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .similar-product-image {
            font-size: 40px;
            margin-bottom: 10px;
        }
        
        .specifications-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .specifications-table th,
        .specifications-table td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
            text-align: left;
        }
        
        .specifications-table th {
            background-color: #f5f5f5;
            font-weight: 600;
            width: 40%;
        }
        
        .features-list {
            list-style-type: none;
            padding: 0;
        }
        
        .features-list li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .features-list li:before {
            content: "✓";
            color: #2E7D32;
            margin-right: 10px;
            font-weight: bold;
        }
        
        /* Стили для иконок сердца */
        .product-wishlist.active i {
            color: #e53935 !important;
        }
        
        .product-wishlist i {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}
