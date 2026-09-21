const CACHE_VERSION = 'roteiro-liturgico-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './programacao.js',
  './leituras.js',
  './manifest.json',
  './icone.png',
  './icone.svg',
  './Selo Auxiliadora 60 anos_Ano 3.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      Promise.allSettled(
        ASSETS_TO_CACHE.map((asset) => cache.add(asset))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_VERSION).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      });
    })
  );
});
