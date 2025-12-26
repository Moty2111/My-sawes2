// products.js - База данных товаров BuildCraft
class ProductsDatabase {
    constructor() {
        this.products = [];
        this.categories = {};
        this.init();
    }

    init() {
        this.products = [
            // СТРОЙМАТЕРИАЛЫ
            {
                id: "mat_001",
                name: "Кирпич керамический М-150",
                category: "materials",
                subcategory: "Кирпич и блоки",
                price: 28,
                oldPrice: 32,
                unit: "шт",
                brand: "Кирпичный завод №1",
                rating: 4.5,
                reviews: 24,
                inStock: true,
                stockCount: 25000,
                description: "Полнотелый строительный кирпич для несущих стен и фундаментов. Высокая морозостойкость и прочность.",
                features: ["Марка прочности: М150", "Размер: 250x120x65 мм", "Морозостойкость: F50", "Водопоглощение: 8%"],
                specifications: {
                    "Вес": "3.5 кг",
                    "Плотность": "1600 кг/м³",
                    "Теплопроводность": "0.6 Вт/м°C",
                    "Стандарт": "ГОСТ 530-2012"
                },
                image: "🧱",
                tags: ["кирпич", "стена", "фундамент", "строительство"],
                delivery: {
                    available: true,
                    minDays: 1,
                    maxDays: 3,
                    cost: 500
                }
            },
            {
                id: "mat_002",
                name: "Цемент М500 Д0",
                category: "materials",
                subcategory: "Сухие смеси",
                price: 450,
                oldPrice: 490,
                unit: "мешок 50кг",
                brand: "ЕВРОЦЕМЕНТ",
                rating: 4.7,
                reviews: 42,
                inStock: true,
                stockCount: 800,
                description: "Портландцемент без добавок для высокопрочных конструкций, фундаментов и ЖБИ.",
                features: ["Прочность: 500 кгс/см²", "Срок схватывания: 45 мин", "Насыпная плотность: 1100 кг/м³", "Активность: 98%"],
                specifications: {
                    "Марка": "М500",
                    "Начало схватывания": "45 минут",
                    "Конец схватывания": "10 часов",
                    "Стандарт": "ГОСТ 31108-2016"
                },
                image: "🏗️",
                tags: ["цемент", "бетон", "фундамент", "ремонт"],
                delivery: {
                    available: true,
                    minDays: 1,
                    maxDays: 2,
                    cost: 300
                }
            },
            {
                id: "mat_003",
                name: "Профнастил С-8 оцинкованный",
                category: "materials",
                subcategory: "Металлопрокат",
                price: 890,
                unit: "м²",
                brand: "СтальПрофиль",
                rating: 4.6,
                reviews: 31,
                inStock: true,
                stockCount: 1500,
                description: "Оцинкованный профилированный лист для кровли, заборов и облицовки стен.",
                features: ["Толщина: 0.45 мм", "Ширина: 1150 мм", "Покрытие: цинк 140 г/м²", "Вес: 4.5 кг/м²"],
                specifications: {
                    "Высота профиля": "8 мм",
                    "Рабочая ширина": "1150 мм",
                    "Длина": "от 0.5 до 12 м",
                    "Стандарт": "ГОСТ 24045-2016"
                },
                image: "📏",
                tags: ["профнастил", "кровля", "забор", "металл"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 5,
                    cost: 800
                }
            },
            {
                id: "mat_004",
                name: "Газобетонный блок D500",
                category: "materials",
                subcategory: "Кирпич и блоки",
                price: 4200,
                unit: "м³",
                brand: "YTONG",
                rating: 4.8,
                reviews: 56,
                inStock: true,
                stockCount: 120,
                description: "Автоклавный газобетонный блок для несущих стен и перегородок. Отличная теплоизоляция.",
                features: ["Плотность: D500", "Размер: 600x300x200", "Теплопроводность: 0.12 Вт/м°C", "Морозостойкость: F100"],
                specifications: {
                    "Класс прочности": "В2.5",
                    "Толщина": "200/300/400 мм",
                    "Упаковка": "1.92 м³ (паллет)",
                    "Стандарт": "ГОСТ 31359-2007"
                },
                image: "🧱",
                tags: ["газобетон", "блок", "стена", "теплоизоляция"],
                delivery: {
                    available: true,
                    minDays: 3,
                    maxDays: 7,
                    cost: 1500
                }
            },
            {
                id: "mat_005",
                name: "Доска обрезная 50x150x6000",
                category: "materials",
                subcategory: "Пиломатериалы",
                price: 320,
                unit: "шт",
                brand: "ЛесПром",
                rating: 4.3,
                reviews: 18,
                inStock: true,
                stockCount: 5000,
                description: "Сосновая обрезная доска естественной влажности для каркаса, обрешетки и опалубки.",
                features: ["Сорт: 2-3", "Влажность: 18-22%", "Материал: сосна", "Обработка: обрезная"],
                specifications: {
                    "Сечение": "50x150 мм",
                    "Длина": "6 метров",
                    "Объем": "0.045 м³",
                    "Стандарт": "ГОСТ 8486-86"
                },
                image: "🪵",
                tags: ["доска", "дерево", "каркас", "строительство"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 4,
                    cost: 600
                }
            },

            // ИНСТРУМЕНТЫ
            {
                id: "tool_001",
                name: "Перфоратор Makita HR2470",
                category: "tools",
                subcategory: "Электроинструменты",
                price: 12500,
                oldPrice: 13990,
                unit: "шт",
                brand: "Makita",
                rating: 4.9,
                reviews: 87,
                inStock: true,
                stockCount: 24,
                description: "Мощный перфоратор с тремя режимами работы (сверление, ударное сверление, долбление).",
                features: ["Мощность: 800 Вт", "Энергия удара: 2.7 Дж", "Режимы: 3", "Патрон: SDS-PLUS"],
                specifications: {
                    "Макс. диаметр сверления": "Бетон: 24 мм, Металл: 13 мм",
                    "Частота ударов": "0-4000 уд/мин",
                    "Вес": "4.4 кг",
                    "Гарантия": "3 года"
                },
                image: "🔨",
                tags: ["перфоратор", "электроинструмент", "ремонт", "новинка"],
                delivery: {
                    available: true,
                    minDays: 1,
                    maxDays: 3,
                    cost: 500
                }
            },
            {
                id: "tool_002",
                name: "Дрель-шуруповерт Bosch GSR 120-Li",
                category: "tools",
                subcategory: "Электроинструменты",
                price: 8900,
                unit: "шт",
                brand: "Bosch",
                rating: 4.7,
                reviews: 63,
                inStock: true,
                stockCount: 35,
                description: "Аккумуляторный шуруповерт с быстрозажимным патроном и электронной регулировкой момента.",
                features: ["Напряжение: 12 В", "Крутящий момент: 30 Нм", "Аккумулятор: 2.0 Ач", "Бесщеточный двигатель"],
                specifications: {
                    "Скорость вращения": "0-1300 об/мин",
                    "Патрон": "10 мм быстрозажимной",
                    "Вес": "1.3 кг",
                    "В комплекте": "2 аккумулятора, зарядка, кейс"
                },
                image: "🔋",
                tags: ["шуруповерт", "аккумуляторный", "дрель", "инструмент"],
                delivery: {
                    available: true,
                    minDays: 1,
                    maxDays: 3,
                    cost: 400
                }
            },

            // ОТДЕЛОЧНЫЕ МАТЕРИАЛЫ
            {
                id: "fin_001",
                name: "Краска водоэмульсионная Tikkurila Euro 7",
                category: "finishing",
                subcategory: "Лакокрасочные",
                price: 1250,
                unit: "банка 10л",
                brand: "Tikkurila",
                rating: 4.5,
                reviews: 51,
                inStock: true,
                stockCount: 120,
                description: "Водостойкая краска для внутренних работ с повышенной износостойкостью и стойкостью к мойке.",
                features: ["Расход: 1 л/10 м²", "Время высыхания: 2 часа", "Стойкость к мойке", "Без запаха"],
                specifications: {
                    "Основа": "Водно-дисперсионная",
                    "Блеск": "Матовая",
                    "Разбавление": "Водой до 10%",
                    "Хранение": "+5°C до +30°C"
                },
                image: "🎨",
                tags: ["краска", "отделка", "стена", "потолок"],
                delivery: {
                    available: true,
                    minDays: 1,
                    maxDays: 2,
                    cost: 200
                }
            },
            {
                id: "fin_002",
                name: "Ламинат 33 класса Egger Classic",
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
                description: "Влагостойкий ламинат для жилых и коммерческих помещений с замковым соединением.",
                features: ["Класс износостойкости: 33", "Толщина: 12 мм", "Влагостойкость", "Замковое соединение"],
                specifications: {
                    "Размер доски": "1292x193 мм",
                    "Толщина": "12 мм",
                    "В упаковке": "8 шт (1.996 м²)",
                    "Гарантия": "15 лет в жилых помещениях"
                },
                image: "🪵",
                tags: ["ламинат", "пол", "отделка", "спецпредложение"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 5,
                    cost: 700
                }
            },

            // САНТЕХНИКА
            {
                id: "plum_001",
                name: "Смеситель для кухни Grohe Eurosmart",
                category: "plumbing",
                subcategory: "Смесители",
                price: 6250,
                unit: "шт",
                brand: "Grohe",
                rating: 4.8,
                reviews: 46,
                inStock: true,
                stockCount: 32,
                description: "Однорычажный смеситель с выдвижным изливом и функцией переключения душ/струя.",
                features: ["Материал: латунь", "Покрытие: хром", "Длина гибкого шланга: 1.5 м", "Аэратор"],
                specifications: {
                    "Тип": "Однорычажный",
                    "Монтаж": "На раковину",
                    "Подключение": "Гибкая подводка",
                    "Гарантия": "5 лет"
                },
                image: "🚰",
                tags: ["смеситель", "кухня", "сантехника", "премиум"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 4,
                    cost: 400
                }
            },

            // ЭЛЕКТРИКА
            {
                id: "elec_001",
                name: "Кабель ВВГнг(А)-LS 3x2.5",
                category: "electrical",
                subcategory: "Кабели и провода",
                price: 95,
                unit: "метр",
                brand: "Камкабель",
                rating: 4.5,
                reviews: 71,
                inStock: true,
                stockCount: 3500,
                description: "Медный кабель с пониженным дымовыделением для стационарной прокладки в жилых зданиях.",
                features: ["Сечение: 2.5 мм²", "Количество жил: 3", "Напряжение: 660 В", "Не распространяет горение"],
                specifications: {
                    "Сечение": "2.5 мм²",
                    "Количество жил": "3",
                    "Диапазон температур": "-50°C до +70°C",
                    "Стандарт": "ГОСТ 31996-2012"
                },
                image: "🔌",
                tags: ["кабель", "электрика", "медь", "проводка"],
                delivery: {
                    available: true,
                    minDays: 1,
                    maxDays: 3,
                    cost: 150
                }
            }
        ];

        // Инициализация категорий
        this.initCategories();
    }

    initCategories() {
        this.categories = {
            "materials": {
                name: "Стройматериалы",
                subcategories: ["Кирпич и блоки", "Сухие смеси", "Металлопрокат", "Пиломатериалы", "Керамика"]
            },
            "tools": {
                name: "Инструменты",
                subcategories: ["Электроинструменты", "Ручные инструменты", "Измерительные"]
            },
            "finishing": {
                name: "Отделочные материалы",
                subcategories: ["Лакокрасочные", "Напольные покрытия", "Обои", "Штукатурки"]
            },
            "plumbing": {
                name: "Сантехника",
                subcategories: ["Смесители", "Санфаянс", "Трубы и фитинги"]
            },
            "electrical": {
                name: "Электрика",
                subcategories: ["Кабели и провода", "Установочные изделия", "Защитная аппаратура", "Освещение"]
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

    // Сортировка товаров
    sortProducts(products, sortType) {
        const sorted = [...products];

        switch(sortType) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating-desc':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'newest':
                // Здесь можно добавить поле createdAt для сортировки по дате добавления
                return sorted;
            case 'popular':
                return sorted.sort((a, b) => b.reviews - a.reviews);
            default:
                return sorted;
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
        
        const isNew = Math.random() > 0.7; // 30% товаров - новинки
        const isPopular = product.rating >= 4.5;

        return `
            <div class="catalog-item" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
                <div class="product-card">
                    <div class="product-badges">
                        ${discountPercent > 0 ? `<span class="product-badge discount">-${discountPercent}%</span>` : ''}
                        ${isNew ? '<span class="product-badge new">Новинка</span>' : ''}
                        ${isPopular ? '<span class="product-badge popular">Популярный</span>' : ''}
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
                                data-product-id="${product.id}"
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
        return `
            <div class="product-detail">
                <div class="product-detail-header">
                    <div class="product-detail-image">
                        <div class="product-detail-emoji">${product.image}</div>
                    </div>
                    <div class="product-detail-info">
                        <h1>${product.name}</h1>
                        <div class="product-detail-meta">
                            <span class="product-brand">${product.brand}</span>
                            <span class="product-rating">
                                <i class="fas fa-star"></i> ${product.rating} (${product.reviews} отзывов)
                            </span>
                        </div>
                        <div class="product-detail-pricing">
                            ${product.oldPrice ? `
                                <div class="old-price">${product.oldPrice} ₽</div>
                                <div class="current-price">${product.price} ₽</div>
                                <div class="discount">Скидка ${Math.round((1 - product.price / product.oldPrice) * 100)}%</div>
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
                <h3>Похожие товары</h3>
                <div class="similar-products-grid">
                    ${similarProducts.map(product => {
                        const isFavorite = localStorage.getItem(`favorite_${product.id}`) === 'true';
                        return `
                        <div class="similar-product" data-id="${product.id}">
                            <div class="similar-product-image">${product.image}</div>
                            <h4>${product.name}</h4>
                            <div class="similar-product-price">${product.price} ₽</div>
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