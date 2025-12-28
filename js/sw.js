// Service Worker для BuildCraft (Исправленная версия)
const CACHE_NAME = 'buildcraft-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/catalog.html',
  '/projects.html',
  '/services.html',
  '/contact.html',
  '/cart.html',
  '/style.css',
  '/mobile.css',
  '/script.js',
  '/mobile.js',
  '/manifest.json',
  '/products.js'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('[ServiceWorker] Cache addAll failed:', error);
      })
  );
  self.skipWaiting(); // Немедленная активация нового SW
});

// Активация
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Очистка старых кэшей
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Немедленный контроль над всеми клиентами
      self.clients.claim()
    ])
  );
});

// Стратегия кэширования: Network First, затем Cache
self.addEventListener('fetch', event => {
  // Пропускаем не-GET запросы
  if (event.request.method !== 'GET') return;
  
  // Пропускаем chrome-extension запросы
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Проверяем валидность ответа
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Клонируем ответ для кэша
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          })
          .catch(error => {
            console.error('[ServiceWorker] Cache put failed:', error);
          });

        return response;
      })
      .catch(() => {
        // Если сеть недоступна, ищем в кэше
        return caches.match(event.request)
          .then(response => {
            // Если нашли в кэше - возвращаем
            if (response) {
              return response;
            }
            
            // Для HTML-страниц возвращаем index.html
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Push-уведомления (упрощенная версия)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Новое уведомление от BuildCraft',
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-72x72.png',
    tag: 'buildcraft-notification'
  };

  event.waitUntil(
    self.registration.showNotification('BuildCraft', options)
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      // Если есть открытое окно, фокусируем его
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Иначе открываем новое окно
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// Удалите или закомментируйте эту проблемную часть:
// self.addEventListener('sync', event => {
//   if (event.tag === 'sync-cart') {
//     event.waitUntil(syncCart());
//   }
// });

// function syncCart() {
//   return new Promise((resolve, reject) => {
//     console.log('Синхронизация корзины...');
//     resolve();
//   });
// }