import AuthAPI from "../../data/auth-api.js";

class RegisterPage {
  async render() {
    return `
        <section id="main-content" class="bg-white text-black flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white border rounded-lg shadow sm:max-w-md p-8">
            <h2 class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Register
            </h2>
            <form id="register-form" name="register" class="space-y-4"> 
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-black">Name:</label>
                <input type="text" id="name" name="name" autocomplete="name" class="border border-black text-black text-sm rounded-lg block w-full p-2.5" required>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-black">Email:</label>
                <input type="email" id="email" name="email" autocomplete="email" class="border border-black text-black text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-black">Password:</label>
                <input type="password" id="password" name="password" autocomplete="new-password" class="border border-black text-black text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" required>
              </div>
              <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-black">Confirm password:</label>
                <input type="password" id="confirm-password" name="confirm-password" autocomplete="new-password" class="border border-black text-black text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" required>
              </div>
              <button type="submit" class="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Register
              </button>
            </form>
            <p class="text-sm font-light text-black">
              Already have an account? <a href="#/login" class="font-medium text-black underline">Login here</a>
            </p>
            <p id="register-message" class="text-center mt-4 text-sm"></p>
          </div>
        </section>
    `;
  }

  async afterRender() {
    const form = document.querySelector("#register-form");
    const message = document.querySelector("#register-message");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      const confirmPassword = document.querySelector("#confirm-password").value;

      message.textContent = "";
      message.className = "text-center mt-4 text-sm"; 

      if (password !== confirmPassword) {
        message.textContent = "Error: Passwords do not match!";
        message.classList.add("text-red-500");
        return;
      }

      try {
        const response = await AuthAPI.registerUser(name, email, password);

        if (response.error) {
          message.textContent = `Error: ${response.message}`;
          message.classList.add("text-red-500");
        } else {
          message.textContent = "Registration successful! Redirecting...";
          message.classList.add("text-green-500");

          setTimeout(() => {
            window.location.hash = "/login"; 
          }, 2000);
        }
      } catch (error) {
        message.textContent = `Error: ${error.message}`;
        message.classList.add("text-red-500");
      }
    });
  }
}

export default RegisterPage;
