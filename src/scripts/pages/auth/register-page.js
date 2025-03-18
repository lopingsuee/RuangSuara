import RegisterView from "../../views/register-view.js";
import RegisterPresenter from "../../presenters/register-presenter.js";

export default class RegisterPage {
  async render() {
    this.view = new RegisterView();
    return this.view.render();
  }

  async afterRender() {
    this.presenter = new RegisterPresenter(this.view);
  }
}
