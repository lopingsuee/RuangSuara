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
  }

  async init() {
    this.view.render(this.container);
    this.loadMoreButton = this.view.getLoadMoreButton();
    this.storiesContainer = this.view.getStoriesContainer();

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
        location: 0,
        token: this.token,
      });

      if (!stories.length) {
        this.view.hideLoadMoreButton();
        return;
      }

      stories.forEach((story) => {
        this.view.appendStory(createInstagramCard(story));
      });

      if (stories.length < this.pageSize) {
        this.view.hideLoadMoreButton();
      }
    } catch (error) {
      this.view.showErrorMessage("Gagal memuat cerita. Silakan coba lagi.");
    }
  }
}

export default HomePresenter;
