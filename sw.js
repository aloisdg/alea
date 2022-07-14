// self.importScripts("data/games.js");

const cacheName = "alea-v1";
const contentToCache = [
  "/",
  "/index.html",
  "/app.js",
  "/cloud-download.svg",
  "/crown-coin.svg",
  "/d100.svg",
  "/d10.svg",
  "/d12.svg",
  "/d20.svg",
  "/d3.svg",
  "/d4.svg",
  "/d6.svg",
  "/d8.svg",
  "/lib.js",
  "/style.css",
  "/sw.js",
  "/water.css",  
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
