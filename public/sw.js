const CACHE = 'oriente-alianza-v6'
const CORE = [
  '/',
  '/manifest.webmanifest',
  '/icon.svg',
  '/src/styles.css',
  '/src/v5-addon.css',
  '/src/app.js',
  '/src/v5-addon.js',
  '/logo-oriente-v6.b64.txt',
  '/pollo-parrilla-v6.b64.txt'
]

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).catch(() => {}))
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))))
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  const request = event.request
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone()
      caches.open(CACHE).then(cache => cache.put('/', copy)).catch(() => {})
      return response
    }).catch(() => caches.match('/')))
    return
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response && response.ok && new URL(request.url).origin === self.location.origin) {
      const copy = response.clone()
      caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {})
    }
    return response
  })))
})
