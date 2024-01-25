"use strict";

const assets = [
  "/",
  "/cycle",
  "/cycle/start",
  "/cycle/download",
  "/cycle/end-tour",
  "/cycle/load",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("others").then((cache) => {
      console.log("Caching assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "CACHE_NEW_ROUTE") {
    const urlToCache = event.data.route;
    if (urlToCache) {
      caches.open(cacheName).then((cache) => {
        cache.match(urlToCache).then((res) => {
          if (res === undefined) {
            return cache.add(urlToCache);
          }
        });
      });
    }
  }
});

self.addEventListener("message", async (event) => {
  if (event.data && event.data.action === "CACHE_NEW_ROUTE") {
    caches.open("others").then((cache) =>
      cache.match(event.source.url).then((res) => {
        if (res === undefined) {
          return cache.add(event.source.url);
        }
      })
    );
  }
});
