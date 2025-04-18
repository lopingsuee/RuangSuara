import StoryAPI from "../model/story-api.js";
import createInstagramCard from "../../components/instagram-card.js";
import HomeView from "../views/home-view.js";
import { saveStory } from "../db.js";

class HomePresenter {
  constructor({ container }) {
    this.view = new HomeView();
    this.container = container;
    this.currentPage = 1;
    this.pageSize = 10;
    this.token = localStorage.getItem("authToken");
    this.map = null;
    this.markers = [];
  }

  async init() {
    this.view.render(this.container);
    this.loadMoreButton = this.view.getLoadMoreButton();
    this.storiesContainer = this.view.getStoriesContainer();
    this.mapContainer = this.view.getMapContainer();
    this.subscribeButton = document.getElementById("subscribe-btn");
    this.unsubscribeButton = document.getElementById("unsubscribe-btn");

    this.setupMap();
    await this.loadStories();
    await this.checkNotificationPermission();

    this.loadMoreButton.addEventListener("click", async () => {
      this.currentPage++;
      await this.loadStories();
    });

    this.subscribeButton.addEventListener("click", async () => {
      await this.subscribeToNotifications();
    });

    this.unsubscribeButton.addEventListener("click", async () => {
      await this.unsubscribeFromNotifications();
    });
  }

  async loadStories() {
    try {
      const stories = await StoryAPI.getAllStories({
        page: this.currentPage,
        size: this.pageSize,
        location: 1,
        token: this.token,
      });

      if (!stories.length) {
        this.view.hideLoadMoreButton();
        return;
      }

      stories.forEach((story) => {
        this.view.appendStory(createInstagramCard(story));

        if (story.lat && story.lon) {
          this.addMarkerToMap(story);
        }
      });

      this.setupSaveOfflineEvents();

      if (stories.length < this.pageSize) {
        this.view.hideLoadMoreButton();
      }
    } catch (error) {
      this.view.showErrorMessage("Gagal memuat cerita. Silakan coba lagi.");
    }
  }

  createStoryHTML(story) {
    return `
      <div class="story p-4 border rounded w-full max-w-xl">
        <p><strong>${story.user.name}</strong></p>
        <p>${story.description}</p>
        <button class="follow-btn px-4 py-2 bg-gray-500 text-white rounded" data-user-id="${story.user.id}">
          Follow
        </button>
      </div>
    `;
  }

  setupMap() {
    this.map = L.map(this.mapContainer).setView([-6.2, 106.816666], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );
  }

  addMarkerToMap(story) {
    if (!this.map) return;

    const marker = L.marker([story.lat, story.lon]).addTo(this.map);
    marker.bindPopup(`
      <div class="text-center">
        <strong>${story.name}</strong><br>
        <p>${story.description}</p>
      </div>
    `);

    this.markers.push(marker);
  }
  setupSaveOfflineEvents() {
    document.querySelectorAll(".save-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const story = {
          id: button.dataset.id,
          name: button.dataset.name,
          description: button.dataset.description,
          photoUrl: button.dataset.photo,
          lat: button.dataset.lat ? parseFloat(button.dataset.lat) : null,
          lon: button.dataset.lon ? parseFloat(button.dataset.lon) : null,
          createdAt: button.dataset.date,
        };


        try {
          await saveStory(story);
          alert("Story berhasil disimpan untuk offline!");
        } catch (err) {
          console.error("Gagal menyimpan story:", err);
        }
      });
    });
  }
}

export default HomePresenter;
