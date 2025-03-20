import LoginView from "../../views/login-view.js";
import LoginPresenter from "../../presenters/login-presenter.js";

export default class LoginPage {
  constructor() {
    this.view = new LoginView();
    this.presenter = new LoginPresenter(this.view);
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    await this.view.afterRender(this.presenter);
  }
}
