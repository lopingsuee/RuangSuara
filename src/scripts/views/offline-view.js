class OfflineView {
  getTemplate() {
    return `
      <section class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center mb-4">Story Tersimpan (Offline)</h1>
        <div id="offline-stories-container" class="flex flex-col gap-4 items-center"></div>
      </section>
    `;
  }

  render(container) {
    container.innerHTML = this.getTemplate();
  }

  getContainer() {
    return document.getElementById("offline-stories-container");
  }

  appendStory(storyHTML) {
    this.getContainer().innerHTML += storyHTML;
  }

  showEmptyMessage() {
    this.getContainer().innerHTML = `
      <p class="text-gray-500">Belum ada story yang disimpan offline.</p>
    `;
  }
}

export default OfflineView;
