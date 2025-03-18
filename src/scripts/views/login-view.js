export default class LoginView {
  render() {
    return `
<section id="main-content" class="bg-white text-black flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div class="w-full bg-white border rounded-lg shadow sm:max-w-md p-8">
    <h2 class="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
      Login
    </h2>
    <form id="login-form" name="login" class="space-y-4">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-black">Email:</label>
        <input type="email" id="email" name="email" autocomplete="email" class="border border-black text-black text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-black">Password:</label>
        <input type="password" id="password" name="password" autocomplete="current-password" class="border border-black text-black text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" required>
      </div>
      <button type="submit" class="w-full text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5">
        Login
      </button>
    </form>
    <p class="text-sm font-light text-black">
      Don't have an account? <a href="#/register" class="font-medium text-black underline">Register here</a>
    </p>
    <p id="login-message" class="text-center mt-4 text-sm"></p>
  </div>
</section>
    `;
  }

  afterRender(presenter) {
    document
      .querySelector("#login-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        presenter.handleLogin(); // Delegate logic ke presenter
      });
  }
}
