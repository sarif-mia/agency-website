// Retire the previous worker without caching private API responses or old releases.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith("digital-agency-"))
          .map((name) => caches.delete(name)),
      );
      await self.registration.unregister();
      await self.clients.claim();
    })(),
  );
});
