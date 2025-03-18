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
      content.setAttribute("data-transition", "page");
      await app.renderPage();
    });
  }

  await renderWithSlideTransition();

  window.addEventListener("hashchange", renderWithSlideTransition);
});

document.addEventListener("DOMContentLoaded", () => {
  const skipLink = document.querySelector('a[href="#main-content"]');

  skipLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#main-content").setAttribute("tabindex", "-1");
    document.querySelector("#main-content").focus();
  });
});
