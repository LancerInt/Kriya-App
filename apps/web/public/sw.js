self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('kriya-static-v1').then((cache) => cache.addAll(['/','/products','/finder','/facilities'])));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request).then((networkRes) => {
    const clone = networkRes.clone();
    caches.open('kriya-dynamic-v1').then((cache) => cache.put(event.request, clone));
    return networkRes;
  }).catch(() => caches.match('/'))));
});
