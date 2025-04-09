import HomePresenter from "../../presenters/home-presenter.js";

class HomePage {
  constructor() {
    this.presenter = null;
  }

  async render() {
    return `<div id="home-container"></div>`; 
  }

  async afterRender() {
    const container = document.getElementById("home-container");
    this.presenter = new HomePresenter({ container });
    await this.presenter.init();
  }
}

export default HomePage;
