// self.importScripts("data/games.js");

const cacheName = "alea-v1";
const contentToCache = [
  "/alea/",
  "/alea/index.html",
  "/alea/app.js",
  "/alea/cloud-download.svg",
  "/alea/crown-coin.svg",
  "/alea/d100.svg",
  "/alea/d10.svg",
  "/alea/d12.svg",
  "/alea/d20.svg",
  "/alea/d3.svg",
  "/alea/d4.svg",
  "/alea/d6.svg",
  "/alea/d8.svg",
  "/alea/lib.js",
  "/alea/style.css",
  "/alea/sw.js",
  "/alea/water.css",  
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
