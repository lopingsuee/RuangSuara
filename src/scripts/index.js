import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();
console.log("renderPage() berhasil dijalankan.");


  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(
    '[data-collapse-toggle="navbar-default"]'
  );
  const navbarMenu = document.getElementById("navbar-default");

  if (toggleButton && navbarMenu) {
    toggleButton.addEventListener("click", () => {
      navbarMenu.classList.toggle("hidden");
    });
  }
});
