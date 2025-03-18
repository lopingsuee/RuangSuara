export default class RegisterView {
  render() {
    return `
      <section id="main-content" class="bg-white text-black flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white border rounded-lg shadow sm:max-w-md p-8">
          <h2 class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
            Register
          </h2>
          <form id="register-form" name="register" class="space-y-4"> 
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-black">Name:</label>
              <input type="text" id="name" name="name" autocomplete="name" 
                class="border border-black text-black text-sm rounded-lg block w-full p-2.5" 
                placeholder="Your Name" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-black">Email:</label>
              <input type="email" id="email" name="email" autocomplete="email" 
                class="border border-black text-black text-sm rounded-lg block w-full p-2.5" 
                placeholder="name@company.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-black">Password:</label>
              <input type="password" id="password" name="password" autocomplete="new-password" 
                class="border border-black text-black text-sm rounded-lg block w-full p-2.5" 
                placeholder="••••••••" required>
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-black">Confirm password:</label>
              <input type="password" id="confirm-password" name="confirm-password" autocomplete="new-password" 
                class="border border-black text-black text-sm rounded-lg block w-full p-2.5" 
                placeholder="••••••••" required>
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



  bindRegister(handler) {
    document.addEventListener("submit", (event) => {
      if (event.target.id === "register-form") {
        event.preventDefault();
        handler();
      }
    });
  }

  showMessage(message, isError = false) {
    const messageElement = document.querySelector("#register-message");
    messageElement.textContent = message;
    messageElement.className = `text-center mt-4 text-sm ${
      isError ? "text-red-500" : "text-green-500"
    }`;
  }
}
