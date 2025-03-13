import StoryAPI from "../../data/story-api.js";
import createInstagramCard from "../../../components/instagram-card.js";

class HomePage {
  async render() {
    return `
      <section class="container mx-auto p-4">
        <h1 class="text-2xl font-bold text-center mb-4">Story Feed</h1>
        <div id="stories-container" class="flex flex-col items-center gap-6">
          <!-- Data dari API akan ditampilkan di sini -->
        </div>
        <div class="flex justify-center mt-4">
          <button id="load-more" class="px-4 py-2 bg-black text-white rounded-lg">Load More</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const storiesContainer = document.getElementById("stories-container");
    const loadMoreButton = document.getElementById("load-more");

    let currentPage = 1;
    const pageSize = 10;
    const token = localStorage.getItem("token"); // Ambil token dari local storage

    const loadStories = async () => {
      try {
        const stories = await StoryAPI.getAllStories({
          page: currentPage,
          size: pageSize,
          location: 0, // Tidak perlu filter lokasi
          token,
        });

        if (!stories.length) {
          loadMoreButton.style.display = "none";
          return;
        }

        // Gunakan createInstagramCard untuk setiap story
        stories.forEach((story) => {
          storiesContainer.innerHTML += createInstagramCard(story);
        });

        if (stories.length < pageSize) {
          loadMoreButton.style.display = "none"; // Sembunyikan tombol jika data habis
        }
      } catch (error) {
        storiesContainer.innerHTML = `<p class="text-red-500">Gagal memuat cerita. Silakan coba lagi.</p>`;
      }
    };

    // Load pertama kali
    await loadStories();

    // Event listener untuk tombol "Load More"
    loadMoreButton.addEventListener("click", async () => {
      currentPage++;
      await loadStories();
    });
  }
}

export default HomePage;
