import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "New Notification";
  const options = {
    body: data.message || "You have a new notification!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-96x96.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

registerRoute(
  ({ url }) =>
    url.origin === "https://story-api.dicoding.dev" &&
    url.pathname.startsWith("/images/stories/"),
  new CacheFirst({
    cacheName: "story-api-images",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
