const CACHE_PREFIX = 'roteiro-liturgico-release-';
const STATE_CACHE = 'roteiro-liturgico-state';
const ASSETS = [
  './index.html', './styles.css', './app.js',
  './programacao.js', './leituras.js', './antifonas.js', './manifest.json',
  './sw.js', './icone.png', './icone.svg', './Selo Auxiliadora 60 anos_Ano 3.png',
  './RITO DE ENTREGA DO CREIO.pdf'
];
const clientVersions = new Map();
let preparing;

async function readState(key) {
  const cache = await caches.open(STATE_CACHE);
  const response = await cache.match(new URL(key, self.registration.scope));
  return response ? response.json() : null;
}

async function writeState(key, value) {
  const cache = await caches.open(STATE_CACHE);
  await cache.put(new URL(key, self.registration.scope), new Response(JSON.stringify(value)));
}

async function digest(response) {
  const hash = await crypto.subtle.digest('SHA-256', await response.clone().arrayBuffer());
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function cleanOldCaches() {
  const active = await readState('active');
  const previous = await readState('previous');
  const prepared = await readState('prepared');
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  const versions = await Promise.all(clients.map((client) => readState(`client-${client.id}`)));
  const keep = new Set([active?.version, previous?.version, prepared?.version, ...versions]
    .filter(Boolean).map((version) => CACHE_PREFIX + version));
  for (const name of await caches.keys()) {
    if (name.startsWith(CACHE_PREFIX) && !keep.has(name)) await caches.delete(name);
  }
  const state = await caches.open(STATE_CACHE);
  const clientKeys = new Set(clients.map((client) => new URL(`client-${client.id}`, self.registration.scope).href));
  for (const key of await state.keys()) {
    if (new URL(key.url).pathname.split('/').pop().startsWith('client-') &&
        !clientKeys.has(key.url)) await state.delete(key);
  }
}

async function download(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
    if (!response.ok || response.redirected) throw new Error('Download incompleto');
    // Consome o corpo dentro do prazo, inclusive em conexões interrompidas.
    return new Response(await response.arrayBuffer(), {
      status: response.status, headers: response.headers
    });
  } finally {
    clearTimeout(timer);
  }
}

async function prepareUpdate() {
  if (preparing) return preparing;
  preparing = (async () => {
    const response = await download(new URL('./version.json', self.registration.scope));
    const metadata = await response.json();
    if (!/^[a-f0-9]{64}$/.test(metadata.version) ||
        !metadata.files || ASSETS.some((asset) => !/^[a-f0-9]{64}$/.test(metadata.files[asset]))) {
      throw new Error('Metadados inválidos');
    }
    const name = CACHE_PREFIX + metadata.version;
    await cleanOldCaches();
    const existing = await caches.open(name);
    if (await existing.match(new URL('./version.json', self.registration.scope))) {
      await writeState('prepared', metadata);
      return metadata;
    }
    try {
      // Só marca a versão como completa depois de validar todos os arquivos.
      for (const asset of ASSETS) {
        const url = new URL(asset, self.registration.scope);
        const file = await download(url);
        if (await digest(file) !== metadata.files[asset]) throw new Error('Integridade inválida');
        await existing.put(url, file);
      }
      await existing.put(new URL('./', self.registration.scope),
        await existing.match(new URL('./index.html', self.registration.scope)));
      await existing.put(new URL('./version.json', self.registration.scope),
        new Response(JSON.stringify(metadata), { headers: { 'Content-Type': 'application/json' } }));
      await writeState('prepared', metadata);
      return metadata;
    } catch (error) {
      await caches.delete(name);
      throw error;
    }
  })();
  try {
    return await preparing;
  } finally {
    preparing = null;
  }
}

async function clientsAreSafe() {
  const clients = (await self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
    .filter((client) => client.url.startsWith(self.registration.scope));
  return (await Promise.all(clients.map((client) => new Promise((resolve) => {
    const channel = new MessageChannel();
    const timer = setTimeout(() => { channel.port1.close(); resolve(false); }, 2000);
    channel.port1.onmessage = (event) => {
      clearTimeout(timer);
      channel.port1.close();
      resolve(event.data === true);
    };
    client.postMessage({ type: 'CHECK_UPDATE_SAFE' }, [channel.port2]);
  })))).every(Boolean);
}

async function activateVersion(metadata) {
  const cache = await caches.open(CACHE_PREFIX + metadata.version);
  if (!await cache.match(new URL('./version.json', self.registration.scope))) {
    throw new Error('Versão não validada');
  }
  const active = await readState('active');
  if (active && active.version !== metadata.version) await writeState('previous', active);
  await writeState('active', metadata);
  const clients = (await self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
    .filter((client) => client.url.startsWith(self.registration.scope));
  clients.forEach((client) => client.postMessage({ type: 'VERSION_ACTIVATED', version: metadata.version }));
}

self.addEventListener('install', (event) => {
  event.waitUntil(prepareUpdate());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const metadata = await readState('prepared');
    if (metadata) await activateVersion(metadata);
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  const reply = (value) => event.ports[0] && event.ports[0].postMessage(value);
  event.waitUntil((async () => {
    try {
      if (event.data.type === 'CLIENT_VERSION' && event.source) {
        const version = event.data.version;
        if (/^[a-f0-9]{64}$/.test(version)) {
          clientVersions.set(event.source.id, version);
          await writeState(`client-${event.source.id}`, version);
        }
      } else if (event.data.type === 'PREPARE_UPDATE') {
        reply({ metadata: await prepareUpdate() });
      } else if (event.data.type === 'ACTIVATE_UPDATE') {
        const metadata = await readState('prepared');
        if (!metadata || metadata.version !== event.data.version) throw new Error('Versão não preparada');
        if (!await clientsAreSafe()) { reply({ deferred: true }); return; }
        if (event.data.waiting) {
          await self.skipWaiting();
          reply({ activating: true });
        } else {
          await activateVersion(metadata);
          reply({ activated: true });
        }
      }
    } catch (error) {
      reply({ error: error.message });
    }
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      !url.href.startsWith(self.registration.scope)) return;
  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(download(url));
    return;
  }
  event.respondWith((async () => {
    const active = await readState('active');
    if (!active) return fetch(request);
    const navigation = request.mode === 'navigate' && (
      url.pathname === new URL('./', self.registration.scope).pathname ||
      url.pathname === new URL('./index.html', self.registration.scope).pathname
    );
    const version = navigation ? active.version : (clientVersions.get(event.clientId) ||
      await readState(`client-${event.clientId}`) || active.version);
    if (navigation && event.resultingClientId) {
      clientVersions.set(event.resultingClientId, version);
      await writeState(`client-${event.resultingClientId}`, version);
    }
    const cache = await caches.open(CACHE_PREFIX + version);
    const metadataResponse = await cache.match(new URL('./version.json', self.registration.scope));
    const metadata = metadataResponse ? await metadataResponse.json() : active;
    const asset = navigation ? './index.html' : ASSETS.find((item) =>
      new URL(item, self.registration.scope).pathname === url.pathname);
    const cacheUrl = asset ? new URL(asset, self.registration.scope) : url;
    const cached = await cache.match(cacheUrl);
    const isCode = navigation || /\.(html|js|css|json)$/.test(url.pathname);
    if (!isCode && cached) return cached;
    try {
      const response = await download(navigation ? cacheUrl : url);
      if (asset && await digest(response) !== metadata.files[asset]) {
        throw new Error('Publicação diferente da versão em uso');
      }
      return response;
    } catch (error) {
      // Nunca devolve HTML para uma requisição de JavaScript, CSS ou JSON.
      return cached || new Response('Recurso indisponível offline', {
        status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});
