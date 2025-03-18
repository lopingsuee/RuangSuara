import PostStoryPresenter from "../../presenters/story-presenter";

export default class PostStoryPage {
  async render() {
    return `<div id="post-story-container"></div>`;
  }

  async afterRender() {
    const container = document.getElementById("post-story-container");
    const presenter = new PostStoryPresenter({ container });
    await presenter.init();
  }
}
