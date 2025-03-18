import AuthAPI from "../model/auth-api.js";

export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
    this.view.bindRegister(this.handleRegister.bind(this));
  }

  async handleRegister() {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
      this.view.showMessage("Error: All fields are required!", true);
      return;
    }

    if (password !== confirmPassword) {
      this.view.showMessage("Error: Passwords do not match!", true);
      return;
    }

    try {
      const response = await AuthAPI.registerUser(name, email, password);

      if (response.error) {
        this.view.showMessage(`Error: ${response.message}`, true);
      } else {
        this.view.showMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          window.location.hash = "/login";
        }, 2000);
      }
    } catch (error) {
      this.view.showMessage("Failed to register. Please try again.", true);
    }
  }
}
