import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  async function renderWithSlideTransition() {
    if (!document.startViewTransition) {
      await app.renderPage();
      return;
    }

    document.startViewTransition(async () => {
      const content = document.querySelector("#main-content");
      if (content) {
        content.setAttribute("data-transition", "page");
      }
      await app.renderPage();
    });
  }

  await renderWithSlideTransition();
  window.addEventListener("hashchange", renderWithSlideTransition);

  const skipLink = document.querySelector('a[href="#main-content"]');
  const mainContent = document.querySelector("#main-content");

  if (!skipLink || !mainContent) {
    console.warn("Skip link or main content not found.");
    return;
  }

  skipLink.addEventListener("click", (event) => {
    event.preventDefault();
    mainContent.setAttribute("tabindex", "-1");
    mainContent.focus();
  });

  let userToken = localStorage.getItem("authToken");

  const loginMenu = document.querySelector("#menu-login");
  const registerMenu = document.querySelector("#menu-register");

  function updateAuthUI() {
    userToken = localStorage.getItem("authToken");
    if (userToken) {
      if (loginMenu) loginMenu.style.display = "none";
      if (registerMenu) {
        registerMenu.textContent = "Logout";
        registerMenu.id = "menu-logout";
        registerMenu.href = "#";
      }
    } else {
      if (loginMenu) loginMenu.style.display = "block";
      if (registerMenu) {
        registerMenu.textContent = "Register";
        registerMenu.id = "menu-register";
        registerMenu.href = "#/register";
      }
    }
  }

  updateAuthUI();

  document.addEventListener("click", (event) => {
    if (event.target.id === "menu-logout") {
      event.preventDefault();
      localStorage.removeItem("authToken");
      alert("Logout berhasil!");
      updateAuthUI();
      window.location.hash = "#/login";
    }
  });
});

window.addEventListener("load", async () => {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");

    await subscribeUserToPush(registration);
  } catch (error) {
  }
});

const VAPID_PUBLIC_KEY =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

async function subscribeUserToPush(registration) {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("🔕 Izin notifikasi ditolak.");
    return;
  }

  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  };

  const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
  const subscriptionJSON = pushSubscription.toJSON();

  delete subscriptionJSON.expirationTime;

  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      "https://story-api.dicoding.dev/v1/notifications/subscribe",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionJSON),
      }
    );

    const result = await response.json();
  } catch (error) {
  }
}


function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
