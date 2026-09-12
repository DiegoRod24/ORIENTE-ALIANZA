const CACHE = 'oriente-alianza-v5.1'
const CORE = [
  '/',
  '/manifest.webmanifest',
  '/logo-los-de-oriente.webp',
  '/pollada-oriente.webp'
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
