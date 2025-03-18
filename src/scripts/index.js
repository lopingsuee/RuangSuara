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
      localStorage.removeItem("token"); 
      alert("Logout berhasil!");
      updateAuthUI(); 
      window.location.hash = "#/login"; 
    }
  });
});
