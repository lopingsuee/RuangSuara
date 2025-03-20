import StoryAPI from "../model/story-api.js";
import createInstagramCard from "../../components/instagram-card.js";
import HomeView from "../views/home-view.js";

class HomePresenter {
  constructor({ container }) {
    this.view = new HomeView();
    this.container = container;
    this.currentPage = 1;
    this.pageSize = 10;
    this.token = localStorage.getItem("token");
    this.map = null; 
    this.markers = []; 
  }

  async init() {
    this.view.render(this.container);
    this.loadMoreButton = this.view.getLoadMoreButton();
    this.storiesContainer = this.view.getStoriesContainer();
    this.mapContainer = this.view.getMapContainer();

    this.setupMap(); 
    await this.loadStories(); 

    this.loadMoreButton.addEventListener("click", async () => {
      this.currentPage++;
      await this.loadStories();
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

      if (stories.length < this.pageSize) {
        this.view.hideLoadMoreButton();
      }
    } catch (error) {
      this.view.showErrorMessage("Gagal memuat cerita. Silakan coba lagi.");
    }
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
}

export default HomePresenter;
