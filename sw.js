const CACHE_VERSION = 'roteiro-liturgico-v3';
const ASSETS = [
  './', './index.html', './styles.css', './app.js',
  './programacao.js', './leituras.js', './antifonas.js', './manifest.json',
  './icone.png', './icone.svg', './Selo Auxiliadora 60 anos_Ano 3.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      Promise.allSettled(ASSETS.map((a) => cache.add(new Request(a, { cache: 'reload' }))))
    )
  );
  // Não chama skipWaiting aqui: esperamos o usuário tocar em "Atualizar"
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  const isCode = req.mode === 'navigate' || /\.(html|js|css|json)$/.test(new URL(req.url).pathname);

  if (isCode) {
    // Network-first: sempre tenta a versão mais recente
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Imagens: cache-first
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
