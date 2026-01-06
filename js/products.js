// products.js - База данных товаров BuildCraft (Только напольные покрытия)
class ProductsDatabase {
    constructor() {
        this.products = [];
        this.categories = {};
        this.init();
    }

    init() {
        this.products = [
            // НАПОЛЬНЫЕ ПОКРЫТИЯ
            {
                id: "floor_001",
                name: "Ламинат Egger Classic Дуб светлый",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 1850,
                oldPrice: 2100,
                unit: "упаковка 2м²",
                brand: "Egger",
                rating: 4.6,
                reviews: 74,
                inStock: true,
                stockCount: 280,
                description: "Влагостойкий ламинат 33 класса для жилых и коммерческих помещений с замковым соединением Click.",
                features: ["Класс износостойкости: 33", "Толщина: 12 мм", "Влагостойкость", "Замок Click"],
                specifications: {
                    "Размер доски": "1292x193 мм",
                    "Толщина": "12 мм",
                    "В упаковке": "8 шт (1.996 м²)",
                    "Класс": "33 AC5",
                    "Гарантия": "15 лет в жилых помещениях"
                },
                image: "🪵",
                tags: ["ламинат", "пол", "отделка", "дуб", "спецпредложение"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 5,
                    cost: 700
                }
            },
            {
                id: "floor_002",
                name: "Паркетная доска Barlinek Дуб натуральный",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 4250,
                unit: "м²",
                brand: "Barlinek",
                rating: 4.8,
                reviews: 89,
                inStock: true,
                stockCount: 120,
                description: "Трехслойная паркетная доска из натурального дуба с покрытием из матового лака.",
                features: ["Толщина: 14 мм", "Дуб натуральный", "Покрытие: матовый лак", "Замковое соединение"],
                specifications: {
                    "Размер доски": "2400x200 мм",
                    "Толщина": "14 мм",
                    "Покрытие": "7 слоев матового лака",
                    "Срок службы": "25+ лет"
                },
                image: "🪚",
                tags: ["паркет", "доска", "дуб", "натуральное", "премиум"],
                delivery: {
                    available: true,
                    minDays: 3,
                    maxDays: 7,
                    cost: 1000
                }
            },
            {
                id: "floor_003",
                name: "Плитка ПВХ Quick-Step Impressive Ultra",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 2850,
                oldPrice: 3200,
                unit: "м²",
                brand: "Quick-Step",
                rating: 4.7,
                reviews: 56,
                inStock: true,
                stockCount: 350,
                description: "Водостойкий виниловый ламинат с высокой износостойкостью для любых помещений.",
                features: ["100% водостойкость", "Толщина: 5 мм", "Класс износостойкости: 34", "Простая укладка"],
                specifications: {
                    "Размер": "1200x180 мм",
                    "Толщина": "5 мм",
                    "Подложка": "Встроенная акустическая",
                    "Укладка": "Клеевая"
                },
                image: "🧱",
                tags: ["плитка пвх", "винил", "водостойкий", "кухня", "ванная"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 5,
                    cost: 600
                }
            },
            {
                id: "floor_004",
                name: "Ковролин Tarkett Galaxy",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 950,
                unit: "м²",
                brand: "Tarkett",
                rating: 4.4,
                reviews: 42,
                inStock: true,
                stockCount: 180,
                description: "Коммерческий ковролин с высокой износостойкостью для офисов и общественных помещений.",
                features: ["Класс: 33", "Материал: полиамид", "Высота ворса: 4 мм", "Огнестойкость"],
                specifications: {
                    "Ширина рулона": "4 м",
                    "Вес": "2100 г/м²",
                    "Цветовая гамма": "12 цветов",
                    "Уход": "Влажная уборка"
                },
                image: "🧶",
                tags: ["ковролин", "офис", "коммерческий", "мягкое покрытие"],
                delivery: {
                    available: true,
                    minDays: 3,
                    maxDays: 6,
                    cost: 500
                }
            },
            {
                id: "floor_005",
                name: "Пробковое покрытие Wicanders 3D",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 3650,
                unit: "м²",
                brand: "Wicanders",
                rating: 4.5,
                reviews: 31,
                inStock: true,
                stockCount: 75,
                description: "Натуральное пробковое покрытие с 3D эффектом для создания теплого и экологичного пола.",
                features: ["Натуральная пробка", "3D текстура", "Теплоизоляция", "Антистатичность"],
                specifications: {
                    "Толщина": "10 мм",
                    "Покрытие": "УФ-лак",
                    "Экологичность": "E1 класс",
                    "Срок службы": "20+ лет"
                },
                image: "🪹",
                tags: ["пробка", "натуральное", "теплый пол", "экология"],
                delivery: {
                    available: true,
                    minDays: 4,
                    maxDays: 10,
                    cost: 800
                }
            },
            {
                id: "floor_006",
                name: "Инженерная доска Coswick Дуб беленый",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 5850,
                unit: "м²",
                brand: "Coswick",
                rating: 4.9,
                reviews: 67,
                inStock: true,
                stockCount: 45,
                description: "Многослойная инженерная доска для систем теплый пол стабильность геометрии.",
                features: ["Для теплого пола", "Толщина: 16 мм", "Слой дуба: 4 мм", "Масляное покрытие"],
                specifications: {
                    "Размер": "1800x180 мм",
                    "Толщина": "16 мм",
                    "Укладка": "Плавающая или клеевая",
                    "Гарантия": "20 лет"
                },
                image: "🪵",
                tags: ["инженерная доска", "теплый пол", "дуб", "элитное"],
                delivery: {
                    available: true,
                    minDays: 5,
                    maxDays: 14,
                    cost: 1200
                }
            },
            {
                id: "floor_007",
                name: "Линолеум Tarkett Acczent Mineral",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 1250,
                oldPrice: 1450,
                unit: "м²",
                brand: "Tarkett",
                rating: 4.3,
                reviews: 95,
                inStock: true,
                stockCount: 420,
                description: "Гомогенный коммерческий линолеum с мраморной крошкой для помещений с высокой нагрузкой.",
                features: ["Гомогенный", "Толщина: 2.5 мм", "Класс: 34", "Антибактериальное"],
                specifications: {
                    "Ширина рулона": "2 м",
                    "Толщина": "2.5 мм",
                    "Основа": "Вспененный ПВХ",
                    "Уход": "Моющее средство"
                },
                image: "📜",
                tags: ["линолеум", "коммерческий", "износостойкий", "кухня"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 4,
                    cost: 400
                }
            },
            {
                id: "floor_008",
                name: "Массивная доска Kahrs Орех американский",
                category: "finishing",
                subcategory: "Напольные покрытия",
                price: 7250,
                unit: "м²",
                brand: "Kahrs",
                rating: 4.8,
                reviews: 38,
                inStock: true,
                stockCount: 28,
                description: "Массивная деревянная доска из американского ореха с обработкой натуральным маслом.",
                features: ["Массив дерева", "Толщина: 20 мм", "Покрытие: натуральное масло", "Ручная брашировка"],
                specifications: {
                    "Размер": "2400x180 мм",
                    "Толщина": "20 мм",
                    "Порода": "Американский орех",
                    "Укладка": "Шпунтованная"
                },
                image: "🌰",
                tags: ["массив", "орех", "элитное", "натуральное", "брашировка"],
                delivery: {
                    available: true,
                    minDays: 7,
                    maxDays: 21,
                    cost: 1500
                }
            }
        ];

        // Инициализация категорий (только отделочные материалы с напольными покрытиями)
        this.initCategories();
    }

    initCategories() {
        this.categories = {
            "finishing": {
                name: "Напольные покрытия",
                subcategories: ["Ламинат", "Паркет", "Виниловые покрытия", "Ковролин", "Пробка", "Массив"]
            }
        };
    }

    // ========== ОСНОВНЫЕ МЕТОДЫ ==========

    // Получить все товары
    getAllProducts() {
        return this.products;
    }

    // Получить товар по ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Получить товары по категории
    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(product => product.category === category);
    }

    // Получить товары по подкатегории
    getProductsBySubcategory(subcategory) {
        return this.products.filter(product => product.subcategory === subcategory);
    }

    // Поиск товаров
    searchProducts(query) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        
        return this.products.filter(product => {
            const searchableText = `
                ${product.name.toLowerCase()}
                ${product.description.toLowerCase()}
                ${product.brand.toLowerCase()}
                ${product.tags.join(' ').toLowerCase()}
                ${product.category.toLowerCase()}
                ${product.subcategory.toLowerCase()}
            `;
            
            return searchTerms.every(term => searchableText.includes(term));
        });
    }

    // Фильтрация товаров
    filterProducts(filters = {}) {
        let filteredProducts = [...this.products];

        // Фильтр по категории
        if (filters.category && filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }

        // Фильтр по цене
        if (filters.minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
        }

        // Фильтр по наличию
        if (filters.inStock !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
        }

        // Фильтр по бренду
        if (filters.brands && filters.brands.length > 0) {
            filteredProducts = filteredProducts.filter(p => filters.brands.includes(p.brand));
        }

        // Фильтр по рейтингу
        if (filters.minRating !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating);
        }

        return filteredProducts;
    }

    // Сортировка товаров как в index.html (без сложной логики)
    sortProducts(products, sortType = 'default') {
        const sorted = [...products];

        switch(sortType) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating-desc':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'popular':
                return sorted.sort((a, b) => b.reviews - a.reviews);
            default:
                // По умолчанию - как в index.html (популярные первыми)
                return sorted.sort((a, b) => {
                    // Сначала товары со скидкой
                    if (a.oldPrice && !b.oldPrice) return -1;
                    if (!a.oldPrice && b.oldPrice) return 1;
                    
                    // Затем по рейтингу и отзывам
                    const scoreA = a.rating * 10 + (a.reviews / 100);
                    const scoreB = b.rating * 10 + (b.reviews / 100);
                    return scoreB - scoreA;
                });
        }
    }

    // Получить все бренды
    getAllBrands() {
        const brands = new Set(this.products.map(product => product.brand));
        return Array.from(brands);
    }

    // Получить все подкатегории
    getAllSubcategories() {
        const subcategories = new Set(this.products.map(product => product.subcategory));
        return Array.from(subcategories);
    }

    // Получить статистику по товарам
    getProductsStats() {
        const stats = {
            totalProducts: this.products.length,
            inStock: this.products.filter(p => p.inStock).length,
            outOfStock: this.products.filter(p => !p.inStock).length,
            categories: {},
            priceRange: {
                min: Math.min(...this.products.map(p => p.price)),
                max: Math.max(...this.products.map(p => p.price)),
                avg: Math.round(this.products.reduce((sum, p) => sum + p.price, 0) / this.products.length)
            }
        };

        // Статистика по категориям
        Object.keys(this.categories).forEach(category => {
            const categoryProducts = this.getProductsByCategory(category);
            stats.categories[category] = {
                name: this.categories[category].name,
                count: categoryProducts.length,
                avgPrice: Math.round(categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length)
            };
        });

        return stats;
    }

    // Получить похожие товары
    getSimilarProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        return this.products
            .filter(p => p.id !== productId && p.category === product.category)
            .sort((a, b) => {
                // Сначала по рейтингу, потом по цене
                if (b.rating !== a.rating) return b.rating - a.rating;
                return a.price - b.price;
            })
            .slice(0, limit);
    }

    // Получить товары со скидкой
    getDiscountedProducts() {
        return this.products.filter(product => product.oldPrice && product.oldPrice > product.price);
    }

    // Получить новинки (последние добавленные товары)
    getNewProducts(limit = 6) {
        // В реальном приложении здесь была бы сортировка по дате добавления
        return this.products.slice(0, limit);
    }

    // Получить популярные товары (по рейтингу и отзывам)
    getPopularProducts(limit = 6) {
        return this.products
            .filter(p => p.rating >= 4.0)
            .sort((a, b) => {
                const scoreA = a.rating * 10 + (a.reviews / 100);
                const scoreB = b.rating * 10 + (b.reviews / 100);
                return scoreB - scoreA;
            })
            .slice(0, limit);
    }

    // Обновить количество товара на складе
    updateStock(productId, quantity) {
        const product = this.getProductById(productId);
        if (product && product.inStock) {
            product.stockCount -= quantity;
            if (product.stockCount <= 0) {
                product.stockCount = 0;
                product.inStock = false;
            }
            return true;
        }
        return false;
    }

    // Проверить наличие товара
    checkAvailability(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (!product) return { available: false, reason: 'Товар не найден' };
        if (!product.inStock) return { available: false, reason: 'Нет в наличии' };
        if (product.stockCount < quantity) return { 
            available: false, 
            reason: `Доступно только ${product.stockCount} шт.` 
        };
        return { available: true };
    }

    // Получить информацию о доставке товара
    getDeliveryInfo(productId) {
        const product = this.getProductById(productId);
        if (!product || !product.delivery) {
            return {
                available: false,
                message: 'Доставка не доступна для данного товара'
            };
        }

        return product.delivery;
    }

    // Генерация HTML для карточки товара (ОБНОВЛЕНА)
    generateProductCardHTML(product, isFavorite = false) {
        const discountPercent = product.oldPrice ? 
            Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        
        // Для напольных покрытий определим метки по типу
        const isWood = product.name.includes('доска') || product.name.includes('паркет') || product.name.includes('массив');
        const isVinyl = product.name.includes('ПВХ') || product.name.includes('винил');
        const isCarpet = product.name.includes('ковролин');
        const isPremium = product.price > 5000;
        
        return `
            <div class="catalog-item" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
                <div class="product-card">
                    <div class="product-badges">
                        ${discountPercent > 0 ? `<span class="product-badge discount">-${discountPercent}%</span>` : ''}
                        ${isWood ? '<span class="product-badge new">Натуральное</span>' : ''}
                        ${isVinyl ? '<span class="product-badge new">Водостойкий</span>' : ''}
                        ${isCarpet ? '<span class="product-badge popular">Мягкий</span>' : ''}
                        ${isPremium ? '<span class="product-badge premium">Премиум</span>' : ''}
                        ${!product.inStock ? '<span class="product-badge out-of-stock">Нет в наличии</span>' : ''}
                    </div>
                    
                    <div class="product-image">
                        <div class="product-emoji">${product.image}</div>
                        ${product.rating ? `
                            <div class="product-rating">
                                <i class="fas fa-star"></i>
                                <span>${product.rating}</span>
                                <span class="reviews-count">(${product.reviews})</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="product-info">
                        <div class="product-brand">${product.brand || 'BuildCraft'}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
                        
                        <div class="product-features">
                            ${product.features.slice(0, 2).map(feat => 
                                `<span class="feature-tag">${feat.split(':')[0]}</span>`
                            ).join('')}
                        </div>
                        
                        <div class="product-pricing">
                            ${product.oldPrice ? 
                                `<div class="price-old">${product.oldPrice} ₽</div>` : ''
                            }
                            <div class="price-current">
                                <span class="price-value">${product.price}</span>
                                <span class="price-currency"> ₽</span>
                                <span class="price-unit">/${product.unit}</span>
                            </div>
                        </div>
                        
                        <div class="product-stock">
                            <i class="fas ${product.inStock ? 'fa-check-circle in-stock' : 'fa-times-circle out-of-stock'}"></i>
                            <span>${product.inStock ? 
                                `В наличии: ${product.stockCount} ${product.unit}` : 
                                'Нет в наличии'
                            }</span>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}" 
                                ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus"></i>
                                <span>${!product.inStock ? 'Нет в наличии' : 'В корзину'}</span>
                            </button>
                            <button class="btn btn-outline product-wishlist ${isFavorite ? 'active' : ''}" 
                                data-id="${product.id}" 
                                aria-label="${isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}">
                                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Генерация HTML для детальной страницы товара (ОБНОВЛЕНА)
    generateProductDetailHTML(product, isFavorite = false) {
        const discountPercent = product.oldPrice ? 
            Math.round((1 - product.price / product.oldPrice) * 100) : 0;
            
        return `
            <div class="product-detail">
                <div class="product-detail-header">
                    <div class="product-detail-image">
                        <div class="product-detail-emoji">${product.image}</div>
                        ${discountPercent > 0 ? `<div class="detail-badge">-${discountPercent}%</div>` : ''}
                    </div>
                    <div class="product-detail-info">
                        <h1>${product.name}</h1>
                        <div class="product-detail-meta">
                            <span class="product-brand">${product.brand}</span>
                            <span class="product-rating">
                                <i class="fas fa-star"></i> ${product.rating} (${product.reviews} отзывов)
                            </span>
                            <span class="product-category">Напольное покрытие</span>
                        </div>
                        <div class="product-detail-pricing">
                            ${product.oldPrice ? `
                                <div class="old-price">${product.oldPrice} ₽</div>
                                <div class="current-price">${product.price} ₽</div>
                                <div class="discount">Скидка ${discountPercent}%</div>
                            ` : `
                                <div class="current-price">${product.price} ₽</div>
                            `}
                            <div class="price-unit">/${product.unit}</div>
                        </div>
                        <div class="product-detail-actions">
                            <button class="btn btn-primary btn-lg add-to-cart" data-id="${product.id}" 
                                ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus"></i>
                                ${!product.inStock ? 'Нет в наличии' : 'Добавить в корзину'}
                            </button>
                            <button class="btn btn-outline btn-lg product-wishlist ${isFavorite ? 'active' : ''}" 
                                data-id="${product.id}" 
                                data-product-id="${product.id}"
                                aria-label="${isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}">
                                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> В избранное
                            </button>
                        </div>
                        <div class="product-detail-delivery">
                            <h3><i class="fas fa-truck"></i> Доставка</h3>
                            <p>${product.delivery ? 
                                `Доставка за ${product.delivery.minDays}-${product.delivery.maxDays} дней, стоимость: ${product.delivery.cost} ₽` : 
                                'Доставка не доступна'
                            }</p>
                        </div>
                    </div>
                </div>
                
                <div class="product-detail-content">
                    <div class="product-tabs">
                        <button class="tab-btn active" data-tab="description">Описание</button>
                        <button class="tab-btn" data-tab="specifications">Характеристики</button>
                        <button class="tab-btn" data-tab="features">Особенности</button>
                        <button class="tab-btn" data-tab="reviews">Отзывы</button>
                    </div>
                    
                    <div class="tab-content">
                        <div class="tab-pane active" id="description">
                            <h3>Описание товара</h3>
                            <p>${product.description}</p>
                            <p>Идеально подходит для: ${product.tags.slice(1, 3).join(', ')}</p>
                        </div>
                        
                        <div class="tab-pane" id="specifications">
                            <h3>Технические характеристики</h3>
                            <table class="specifications-table">
                                ${Object.entries(product.specifications || {}).map(([key, value]) => `
                                    <tr>
                                        <th>${key}</th>
                                        <td>${value}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                        
                        <div class="tab-pane" id="features">
                            <h3>Особенности</h3>
                            <ul class="features-list">
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="tab-pane" id="reviews">
                            <h3>Отзывы покупателей</h3>
                            <p>Рейтинг: ${product.rating}/5 на основе ${product.reviews} отзывов</p>
                        </div>
                    </div>
                </div>
                
                ${this.generateSimilarProductsHTML(product.id)}
            </div>
        `;
    }

    // Генерация HTML для похожих товаров (ОБНОВЛЕНА)
    generateSimilarProductsHTML(productId) {
        const similarProducts = this.getSimilarProducts(productId, 4);
        if (similarProducts.length === 0) return '';

        return `
            <div class="similar-products">
                <h3>Похожие напольные покрытия</h3>
                <div class="similar-products-grid">
                    ${similarProducts.map(product => {
                        const isFavorite = localStorage.getItem(`favorite_${product.id}`) === 'true';
                        const discountPercent = product.oldPrice ? 
                            Math.round((1 - product.price / product.oldPrice) * 100) : 0;
                            
                        return `
                        <div class="similar-product" data-id="${product.id}">
                            ${discountPercent > 0 ? `<div class="similar-badge">-${discountPercent}%</div>` : ''}
                            <div class="similar-product-image">${product.image}</div>
                            <h4>${product.name}</h4>
                            <div class="similar-product-price">
                                ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ₽</span>` : ''}
                                <span class="current-price">${product.price} ₽</span>
                            </div>
                            <div class="similar-product-actions">
                                <button class="btn btn-sm btn-outline add-to-cart" data-id="${product.id}">
                                    <i class="fas fa-cart-plus"></i> В корзину
                                </button>
                                <button class="btn btn-sm btn-outline product-wishlist ${isFavorite ? 'active' : ''}" 
                                    data-id="${product.id}" 
                                    data-product-id="${product.id}">
                                    <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    }
}

// Создаем глобальный экземпляр базы данных товаров
const ProductsDB = new ProductsDatabase();

// Экспортируем для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsDB;
} else {
    window.ProductsDB = ProductsDB;
}