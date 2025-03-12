import API from "../../data/api";

const RegisterPage = {
  async render() {
    return `
      <section class="register-page">
        <h2>Register</h2>
        <form id="register-form">
          <label for="name">Name:</label>
          <input type="text" id="name" required>
          
          <label for="email">Email:</label>
          <input type="email" id="email" required>
          
          <label for="password">Password:</label>
          <input type="password" id="password" required>
          
          <button type="submit">Register button</button>
        </form>
        <p id="register-message"></p>
      </section>
    `;
  },

  async afterRender() {
    const form = document.querySelector("#register-form");
    const message = document.querySelector("#register-message");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      const response = await API.registerUser(name, email, password);

      if (response.error) {
        message.textContent = `Error: ${response.message}`;
      } else {
        message.textContent = "Registration successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "#/login"; // Redirect ke login page
        }, 2000);
      }
    });
  },
};

export default RegisterPage;
