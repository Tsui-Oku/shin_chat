const CACHE = 'shin-chat-v12';
const FILES = [
  '/shin_chat/',
  '/shin_chat/index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  // APIリクエストはキャッシュせずそのまま通す
  if(e.request.url.includes('api.anthropic.com')){
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
