const CACHE_NAME = 'jukola-v1';

// Installera appen och förbered cache
self.addEventListener('install', (e) => {
  // Här kan vi i framtiden spara filer offline om vi vill
});

// Hantera nätverksförfrågningar
self.addEventListener('fetch', (e) => {
  // Låter appen ladda som vanligt över nätverket
  e.respondWith(fetch(e.request));
});