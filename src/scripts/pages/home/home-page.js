import API from "../../data/api";

const HomePage = {
  async render() {
    return `
      <section class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center mb-4">Story Feed</h1>
        <div id="stories-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Data dari API akan ditampilkan di sini -->
        </div>
      </section>
    `;
  },

  async afterRender() {
    const storiesContainer = document.getElementById("stories-container");

    try {
      const stories = await API.getAllStories();

      storiesContainer.innerHTML = stories
        .map(
          (story) => `
          <div class="bg-white p-4 shadow-md rounded-lg">
            <img src="${story.photoUrl}" alt="${story.name}" class="w-full h-48 object-cover rounded-md">
            <h2 class="font-bold mt-2">${story.name}</h2>
            <p class="text-gray-600">${story.description}</p>
          </div>
        `
        )
        .join("");
    } catch (error) {
      storiesContainer.innerHTML = `<p class="text-red-500">Gagal memuat cerita. Silakan coba lagi.</p>`;
    }
  },
};

export default HomePage;