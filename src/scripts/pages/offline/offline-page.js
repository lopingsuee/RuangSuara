import OfflinePresenter from "../../presenters/offline-presenter";

class OfflinePage {
  async render() {
    return `
      <section id="offline-section" class="p-4">
        <h1 class="text-xl font-bold mb-4">Offline Stories</h1>
        <div id="offline-stories-list" class="flex flex-col gap-4"></div>
      </section>
    `;
  }

  async afterRender() {
    const container = document.getElementById("offline-stories-list");

    const presenter = new OfflinePresenter({ container });
    await presenter.init(); 
  }
}

export default OfflinePage;
