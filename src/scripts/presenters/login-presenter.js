import AuthAPI from "../model/auth-api.js";

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleLogin() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#login-message");

    message.textContent = "";
    message.className = "text-center mt-4 text-sm";

    if (!email || !password) {
      message.textContent = "Error: Email and password are required!";
      message.classList.add("text-red-500");
      return;
    }

    try {
      const response = await AuthAPI.loginUser(email, password);

      if (response.error) {
        message.textContent = `Error: ${response.message}`;
        message.classList.add("text-red-500");
      } else {
        const { token } = response.loginResult;
        localStorage.setItem("authToken", token);
        message.textContent = "Login successful! Redirecting...";
        message.classList.add("text-green-500");

        setTimeout(() => {
          window.location.hash = "/";
        }, 2000);
      }
    } catch (error) {
      message.textContent = "Failed to login. Please try again.";
      message.classList.add("text-red-500");
    }
  }
}
