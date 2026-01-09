// products.js - База данных товаров BuildCraft (Напольные покрытия)
class ProductsDatabase {
    constructor() {
        this.products = [];
        this.init();
    }

    init() {
        this.products = [
            {
                id: "floor_001",
                name: "Ламинат Egger Classic Дуб светлый",
                category: "finishing",
                subcategory: "Напольные покрытия",
                type: "laminate",
                price: 1850,
                oldPrice: 2100,
                unit: "упаковка 2м²",
                rating: 4.6,
                reviews: 74,
                inStock: true,
                stockCount: 280,
                description: "Влагостойкий ламинат 33 класса для жилых и коммерческих помещений с замковым соединением Click. Идеально подходит для гостиных, спален и офисных помещений. Обладает повышенной износостойкостью и устойчивостью к влаге.",
                features: ["Класс износостойкости: 33", "Толщина: 12 мм", "Влагостойкость", "Замок Click", "Гарантия: 15 лет", "Размер доски: 1292x193 мм"],
                specifications: {
                    "Размер доски": "1292x193 мм",
                    "Толщина": "12 мм",
                    "В упаковке": "8 шт (1.996 м²)",
                    "Класс": "33 AC5",
                    "Гарантия": "15 лет в жилых помещениях",
                    "Соединение": "Click",
                    "Влагостойкость": "H2O-Resist",
                    "Фаска": "4 стороны"
                },
                image: "img/catalog/laminate_oak_light.jpg",
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
                name: "Ламинат Kronospan Premium Дуб темный",
                category: "finishing",
                subcategory: "Напольные покрытия",
                type: "laminate",
                price: 2450,
                unit: "упаковка 2.4м²",
                rating: 4.7,
                reviews: 92,
                inStock: true,
                stockCount: 150,
                description: "Премиальный ламинат 34 класса с тисненой поверхностью под натуральную древесину. Подходит для помещений с высокой проходимостью, выдерживает большие нагрузки. Поверхность с антистатическим покрытием.",
                features: ["Класс износостойкости: 34", "Толщина: 12 мм", "Тисненая поверхность", "Замок 5G", "Гарантия: 20 лет", "Размер доски: 1380x193 мм"],
                specifications: {
                    "Размер доски": "1380x193 мм",
                    "Толщина": "12 мм",
                    "В упаковке": "9 шт (2.397 м²)",
                    "Класс": "34 AC6",
                    "Гарантия": "20 лет",
                    "Соединение": "5G Click",
                    "Поверхность": "Тиснение под дерево",
                    "Фаска": "4 стороны V-образная"
                },
                image: "img/catalog/laminate_oak_dark.jpg",
                tags: ["ламинат", "премиум", "дуб", "тиснение"],
                delivery: {
                    available: true,
                    minDays: 3,
                    maxDays: 7,
                    cost: 800
                }
            },
            {
                id: "floor_003",
                name: "Кварц-винил Art Vinyl Дуб натуральный",
                category: "finishing",
                subcategory: "Напольные покрытия",
                type: "quartz-vinyl",
                price: 3250,
                unit: "м²",
                rating: 4.8,
                reviews: 67,
                inStock: true,
                stockCount: 200,
                description: "Водостойкий кварц-винил с высокой износостойкостью для любых помещений, включая ванные комнаты и кухни. Абсолютная влагостойкость и устойчивость к химическим воздействиям. Легкая укладка на клей или плавающим способом.",
                features: ["100% водостойкость", "Толщина: 5.5 мм", "Класс износостойкости: 43", "Простая укладка", "Антибактериальное покрытие", "Устойчивость к бытовой химии"],
                specifications: {
                    "Размер": "1200x180 мм",
                    "Толщина": "5.5 мм",
                    "Защитный слой": "0.7 мм",
                    "Класс": "43 T",
                    "Укладка": "Клеевая или плавающая",
                    "Влагостойкость": "100%",
                    "Теплоизоляция": "Встроенная подложка"
                },
                image: "img/catalog/quartz_vinyl_oak.jpg",
                tags: ["кварц-винил", "водостойкий", "кухня", "ванная"],
                delivery: {
                    available: true,
                    minDays: 2,
                    maxDays: 5,
                    cost: 600
                }
            },
            {
                id: "floor_004",
                name: "Кварц-винил SPC Floor Дуб серый",
                category: "finishing",
                subcategory: "Напольные покрытия",
                type: "quartz-vinyl",
                price: 2850,
                unit: "м²",
                rating: 4.5,
                reviews: 45,
                inStock: true,
                stockCount: 180,
                description: "Кварц-виниловая плитка с SPC основой для повышенной стабильности и долговечности. Идеально подходит для систем теплый пол, не деформируется при перепадах температур. Прочное каменно-полимерное ядро обеспечивает стабильность геометрии.",
                features: ["SPC основа", "Толщина: 6 мм", "Замковое соединение", "Теплоизоляция", "Для теплого пола", "Ударопрочность"],
                specifications: {
                    "Размер": "1220x180 мм",
                    "Толщина": "6 мм",
                    "Основа": "SPC каменная",
                    "Укладка": "Плавающая",
                    "Класс": "43 T",
                    "Теплый пол": "Да, водяной и электрический",
                    "Гарантия": "25 лет"
                },
                image: "img/catalog/quartz_vinyl_gray_oak.jpg",
                tags: ["кварц-винил", "spc", "стабильный", "теплый пол"],
                delivery: {
                    available: true,
                    minDays: 3,
                    maxDays: 6,
                    cost: 550
                }
            },
            {
                id: "floor_005",
                name: "SPC-ламинат StoneFloor Дуб беленый",
                category: "finishing",
                subcategory: "Напольные покрытия",
                type: "spc-laminate",
                price: 3850,
                unit: "м²",
                rating: 4.9,
                reviews: 78,
                inStock: true,
                stockCount: 95,
                description: "SPC-ламинат для систем теплый пол с максимальной стабильностью геометрии и влагостойкостью. Премиум-класс с улучшенными звукоизоляционными свойствами. Идеально подходит для коммерческих помещений с высокой проходимостью.",
                features: ["Для теплого пола", "Толщина: 8 мм", "100% водостойкий", "Прочный SPC сердечник", "Усиленная звукоизоляция", "Класс износостойкости: 43"],
                specifications: {
                    "Размер": "1800x180 мм",
                    "Толщина": "8 мм",
                    "Сердечник": "SPC каменный",
                    "Гарантия": "25 лет",
                    "Класс": "43 AC6",
                    "Теплый пол": "Да, все типы",
                    "Звукоизоляция": "Дополнительный слой 2 мм"
                },
                image: "img/catalog/spc_laminate_bleached_oak.jpg",
                tags: ["spc-ламинат", "теплый пол", "водостойкий", "элитное"],
                delivery: {
                    available: true,
                    minDays: 4,
                    maxDays: 8,
                    cost: 900
                }
            },
            {
                id: "floor_006",
                name: "SPC-ламинат AquaFloor Орех",
                category: "finishing",
                subcategory: "Напольные покрытия",
                type: "spc-laminate",
                price: 4250,
                unit: "м²",
                rating: 4.7,
                reviews: 52,
                inStock: true,
                stockCount: 65,
                description: "Водостойкий SPC-ламинат с повышенной прочностью для коммерческих помещений с высокой нагрузкой. Специальное защитное покрытие от царапин и истирания. Антистатическая поверхность, легкий уход и обслуживание.",
                features: ["Класс: 43 T", "Толщина: 10 мм", "Ударопрочный", "Антистатичный", "Защита от царапин", "Для коммерческого использования"],
                specifications: {
                    "Размер": "1220x200 мм",
                    "Толщина": "10 мм",
                    "Защитный слой": "0.8 мм",
                    "Применение": "Коммерческое",
                    "Класс": "43 AC6",
                    "Устойчивость к ударам": "IC4",
                    "Гарантия": "30 лет"
                },
                image: "img/catalog/spc_laminate_walnut.jpg",
                tags: ["spc-ламинат", "коммерческий", "прочный", "водостойкий"],
                delivery: {
                    available: true,
                    minDays: 5,
                    maxDays: 10,
                    cost: 1000
                }
            }
        ];

        this.initCategories();
    }

    initCategories() {
        this.categories = {
            "finishing": {
                name: "Напольные покрытия",
                subcategories: ["Ламинат", "Кварц-винил", "SPC-ламинат"]
            }
        };
    }

    // Основные методы
    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getProductsByCategory(category) {
        if (category === 'all') return this.products;
        return this.products.filter(product => product.category === category);
    }

    getProductsByType(type) {
        if (type === 'all') return this.products;
        return this.products.filter(product => product.type === type);
    }

    searchProducts(query) {
        if (!query || query.trim() === '') return this.products;
        
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        
        return this.products.filter(product => {
            const searchableText = `
                ${product.name.toLowerCase()}
                ${product.description.toLowerCase()}
                ${product.tags.join(' ').toLowerCase()}
                ${product.category.toLowerCase()}
                ${product.subcategory.toLowerCase()}
                ${product.type ? product.type.toLowerCase() : ''}
            `;
            
            return searchTerms.every(term => searchableText.includes(term));
        });
    }

    filterProducts(filters = {}) {
        let filteredProducts = [...this.products];

        if (filters.type && filters.type !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.type === filters.type);
        }

        if (filters.minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
        }

        if (filters.inStock !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
        }

        if (filters.minRating !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.rating >= filters.minRating);
        }

        return filteredProducts;
    }

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
                return sorted.sort((a, b) => {
                    if (a.oldPrice && !b.oldPrice) return -1;
                    if (!a.oldPrice && b.oldPrice) return 1;
                    
                    const scoreA = a.rating * 10 + (a.reviews / 100);
                    const scoreB = b.rating * 10 + (b.reviews / 100);
                    return scoreB - scoreA;
                });
        }
    }

    getAllTypes() {
        const types = new Set(this.products.map(product => product.type));
        return Array.from(types);
    }

    getSimilarProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        return this.products
            .filter(p => p.id !== productId && p.type === product.type)
            .sort((a, b) => {
                if (b.rating !== a.rating) return b.rating - a.rating;
                return a.price - b.price;
            })
            .slice(0, limit);
    }

    getTypeName(type) {
        const typeNames = {
            'laminate': 'Ламинат',
            'quartz-vinyl': 'Кварц-винил',
            'spc-laminate': 'SPC-ламинат'
        };
        return typeNames[type] || type;
    }

    generateProductCardHTML(product, isFavorite = false) {
        const discountPercent = product.oldPrice ? 
            Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        
        const isLaminate = product.type === 'laminate';
        const isQuartzVinyl = product.type === 'quartz-vinyl';
        const isSpcLaminate = product.type === 'spc-laminate';
        const isPremium = product.price > 3000;
        
        return `
            <div class="catalog-item" data-id="${product.id}" data-category="${product.category}" data-type="${product.type}" data-price="${product.price}">
                <div class="product-card">
                    <div class="product-badges">
                        ${discountPercent > 0 ? `<span class="product-badge discount">-${discountPercent}%</span>` : ''}
                        ${isLaminate ? '<span class="product-badge new">Ламинат</span>' : ''}
                        ${isQuartzVinyl ? '<span class="product-badge popular">Кварц-винил</span>' : ''}
                        ${isSpcLaminate ? '<span class="product-badge premium">SPC</span>' : ''}
                        ${isPremium ? '<span class="product-badge premium">Премиум</span>' : ''}
                        ${!product.inStock ? '<span class="product-badge out-of-stock">Нет в наличии</span>' : ''}
                    </div>
                    
                    <div class="product-image">
                        <div class="image-container">
                            <img src="${product.image}" alt="${product.name}" class="product-img" 
                                 onerror="this.onerror=null; this.src='img/catalog/default-floor.jpg';">
                        </div>
                        ${product.rating ? `
                            <div class="product-rating">
                                <i class="fas fa-star"></i>
                                <span>${product.rating}</span>
                                <span class="reviews-count">(${product.reviews})</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="product-info">
                        <div class="product-type">${this.getTypeName(product.type)}</div>
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
                                data-id="${product.id}">
                                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                            </button>
                            <button class="btn btn-outline view-details" data-id="${product.id}">
                                <i class="fas fa-eye"></i> Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateProductModalHTML(product, isFavorite = false) {
        const discountPercent = product.oldPrice ? 
            Math.round((1 - product.price / product.oldPrice) * 100) : 0;
        
        const featuresHTML = product.features.map(feature => `
            <li>
                <i class="fas fa-check" style="color: #4CAF50;"></i>
                ${feature}
            </li>
        `).join('');
        
        const specificationsHTML = Object.entries(product.specifications || {}).map(([key, value]) => `
            <tr>
                <td><strong>${key}</strong></td>
                <td>${value}</td>
            </tr>
        `).join('');
        
        const tagsHTML = product.tags.map(tag => `
            <span class="product-tag">${tag}</span>
        `).join('');
        
        const similarProducts = this.getSimilarProducts(product.id, 4);
        const similarProductsHTML = similarProducts.length > 0 ? `
            <div class="similar-products-section">
                <h3>Похожие товары</h3>
                <div class="similar-products-grid">
                    ${similarProducts.map(similar => {
                        const similarDiscountPercent = similar.oldPrice ? 
                            Math.round((1 - similar.price / similar.oldPrice) * 100) : 0;
                        return `
                        <div class="similar-product" data-id="${similar.id}">
                            ${similarDiscountPercent > 0 ? `<div class="similar-badge">-${similarDiscountPercent}%</div>` : ''}
                            <div class="similar-product-image">
                                <img src="${similar.image}" alt="${similar.name}" 
                                     onerror="this.onerror=null; this.src='img/catalog/default-floor.jpg';">
                            </div>
                            <h4>${similar.name}</h4>
                            <div class="similar-product-price">
                                ${similar.oldPrice ? `<span class="old-price">${similar.oldPrice} ₽</span>` : ''}
                                <span class="current-price">${similar.price} ₽</span>
                            </div>
                            <div class="similar-product-actions">
                                <button class="btn btn-sm btn-outline add-to-cart" data-id="${similar.id}">
                                    <i class="fas fa-cart-plus"></i> В корзину
                                </button>
                                <button class="btn btn-sm btn-outline view-details" data-id="${similar.id}">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        ` : '';
        
        return `
            <div class="product-modal-content">
                <div class="product-modal-header">
                    <h2>${product.name}</h2>
                    <div class="product-modal-meta">
                        <span><i class="fas fa-tag"></i> ${this.getTypeName(product.type)}</span>
                        <span><i class="fas fa-star"></i> ${product.rating} (${product.reviews} отзывов)</span>
                        <span><i class="fas fa-warehouse"></i> ${product.inStock ? 'В наличии' : 'Нет в наличии'}</span>
                    </div>
                </div>
                
                <div class="product-modal-body">
                    <div class="product-modal-main">
                        <div class="product-modal-image">
                            <img src="${product.image}" alt="${product.name}" 
                                 onerror="this.onerror=null; this.src='img/catalog/default-floor.jpg';">
                            ${discountPercent > 0 ? `<div class="product-discount-badge">-${discountPercent}%</div>` : ''}
                        </div>
                        
                        <div class="product-modal-info">
                            <div class="product-modal-price">
                                ${product.oldPrice ? `
                                    <div class="old-price">${product.oldPrice} ₽</div>
                                    <div class="current-price">${product.price} ₽</div>
                                    <div class="discount-text">Скидка ${discountPercent}%</div>
                                ` : `
                                    <div class="current-price">${product.price} ₽</div>
                                `}
                                <div class="price-unit">/${product.unit}</div>
                            </div>
                            
                            <div class="product-modal-availability">
                                <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}" 
                                   style="color: ${product.inStock ? '#4CAF50' : '#f44336'}"></i>
                                ${product.inStock ? 
                                    `<strong>В наличии:</strong> ${product.stockCount} ${product.unit}` : 
                                    '<strong>Нет в наличии</strong>'
                                }
                            </div>
                            
                            <div class="product-modal-actions">
                                <button class="btn btn-primary btn-lg add-to-cart-modal" data-id="${product.id}" 
                                    ${!product.inStock ? 'disabled' : ''}>
                                    <i class="fas fa-cart-plus"></i>
                                    ${!product.inStock ? 'Нет в наличии' : 'Добавить в корзину'}
                                </button>
                                <button class="btn btn-outline btn-lg product-wishlist-modal ${isFavorite ? 'active' : ''}" 
                                    data-id="${product.id}">
                                    <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i> 
                                    ${isFavorite ? 'В избранном' : 'В избранное'}
                                </button>
                            </div>
                            
                            <div class="product-modal-delivery">
                                <h4><i class="fas fa-truck"></i> Доставка</h4>
                                <p>${product.delivery ? 
                                    `Доставка за ${product.delivery.minDays}-${product.delivery.maxDays} дней, стоимость: ${product.delivery.cost} ₽` : 
                                    'Доставка не доступна'
                                }</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="product-modal-tabs">
                        <div class="product-tabs">
                            <button class="tab-btn active" data-tab="description">Описание</button>
                            <button class="tab-btn" data-tab="features">Характеристики</button>
                            <button class="tab-btn" data-tab="specifications">Технические данные</button>
                            <button class="tab-btn" data-tab="delivery">Доставка и оплата</button>
                        </div>
                        
                        <div class="tab-content">
                            <div class="tab-pane active" id="description">
                                <h4>Описание товара</h4>
                                <p>${product.description}</p>
                                <div class="product-tags">
                                    ${tagsHTML}
                                </div>
                            </div>
                            
                            <div class="tab-pane" id="features">
                                <h4>Основные характеристики</h4>
                                <ul class="product-features-list">
                                    ${featuresHTML}
                                </ul>
                            </div>
                            
                            <div class="tab-pane" id="specifications">
                                <h4>Технические характеристики</h4>
                                <table class="product-specifications">
                                    ${specificationsHTML}
                                </table>
                            </div>
                            
                            <div class="tab-pane" id="delivery">
                                <h4>Доставка и оплата</h4>
                                <div class="delivery-info">
                                    ${product.delivery ? `
                                        <div class="delivery-item">
                                            <i class="fas fa-calendar-alt"></i>
                                            <div>
                                                <h5>Сроки доставки</h5>
                                                <p>${product.delivery.minDays}-${product.delivery.maxDays} дней</p>
                                            </div>
                                        </div>
                                        <div class="delivery-item">
                                            <i class="fas fa-money-bill-wave"></i>
                                            <div>
                                                <h5>Стоимость доставки</h5>
                                                <p>${product.delivery.cost} ₽</p>
                                            </div>
                                        </div>
                                        <div class="delivery-item">
                                            <i class="fas fa-check-circle"></i>
                                            <div>
                                                <h5>Доступность</h5>
                                                <p>${product.delivery.available ? 'Доступна' : 'Недоступна'}</p>
                                            </div>
                                        </div>
                                    ` : '<p>Доставка не доступна для данного товара</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${similarProductsHTML}
                </div>
            </div>
        `;
    }
}

const ProductsDB = new ProductsDatabase();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductsDB;
} else {
    window.ProductsDB = ProductsDB;
}