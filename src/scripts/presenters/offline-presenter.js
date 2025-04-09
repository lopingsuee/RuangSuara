import OfflineView from "../views/offline-view.js";
import { getAllSavedStories, deleteStoryById } from "../db.js";

class OfflinePresenter {
  constructor({ container }) {
    this.view = new OfflineView();
    this.container = container;
  }

  async init() {
    this.view.render(this.container);

    const stories = await getAllSavedStories();

    if (!stories.length) {
      this.view.showEmptyMessage();
      return;
    }

    stories.forEach((story) => {
      const storyHTML = this.createStoryHTML(story);
      this.view.appendStory(storyHTML);
    });

    this.addDeleteListeners();
  }

  createStoryHTML(story) {
    return `
    <section class="w-full max-w-md">
      <div class="mb-6 overflow-hidden">
        
        <div class="flex justify-between items-center p-3">
          <div class="flex items-center">
            <a href="#" class="font-semibold text-sm text-black dark:text-black">
              ${story.name ?? "Anonim"}
            </a>
            <span class="mx-1 text-black dark:text-gray-400 text-sm">•</span>
            <span class="text-sm text-black dark:text-gray-400">
              ${new Date(story.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div class="w-full">
          ${
            story.photoUrl
              ? `
            <img class="w-full object-cover rounded" src="${story.photoUrl}" alt="Story image">
          `
              : ""
          }
        </div>

        <div class="px-3 mb-2">
          <p class="text-sm text-black dark:text-black">
            <a href="#" class="font-semibold mr-1">${story.name ?? "Anonim"}</a>
            ${story.description}
          </p>
        </div>

        ${
          story.lat && story.lon
            ? `
            <div class="flex flex-col p-3 border-t border-gray-200 dark:border-gray-700">
              <span class="text-sm text-black dark:text-gray-400">Latitude: ${story.lat}</span>
              <span class="text-sm text-black dark:text-gray-400">Longitude: ${story.lon}</span>
            </div>
          `
            : ""
        }

        <div class="p-3 flex justify-end">
          <button class="delete-btn text-red-600 text-sm" data-id="${story.id}">
            Hapus
          </button>
        </div>
      </div>
    </section>
  `;
  }

  addDeleteListeners() {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.dataset.id;
        await deleteStoryById(id);

        location.reload();
      });
    });
  }
}

export default OfflinePresenter;
