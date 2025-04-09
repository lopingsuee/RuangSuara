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
