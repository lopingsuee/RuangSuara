class HomeView {
  getTemplate() {
    return `
    <section id="main-content" class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center mb-4">Story Feed</h1>
      <h1 class="text-xl font-bold text-center mb-4">Semangattt kakak reviewer🔥</h1>
      
      <div id="map" class="w-full h-80 bg-gray-200 rounded mb-6"></div>

      <div id="stories-container" class="flex flex-col items-center gap-6"></div>

      <div class="flex justify-center mt-4">
        <button id="load-more" class="px-4 py-2 bg-black text-white rounded-lg">Load More</button>
      </div>
    </section>
  `;
  }

  render(container) {
    container.innerHTML = this.getTemplate();
  }

  getMapContainer() {
    return document.getElementById("map");
  }

  getStoriesContainer() {
    return document.getElementById("stories-container");
  }

  getLoadMoreButton() {
    return document.getElementById("load-more");
  }

  appendStory(storyHTML) {
    this.getStoriesContainer().innerHTML += storyHTML;
  }

  hideLoadMoreButton() {
    this.getLoadMoreButton().style.display = "none";
  }

  showErrorMessage(message) {
    this.getStoriesContainer().innerHTML = `<p class="text-red-500">${message}</p>`;
  }
}

export default HomeView;
