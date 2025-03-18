import HomePage from "../pages/home/home-page.js";
import StoryPage from "../pages/story/story-page.js";
import RegisterPage from "../pages/auth/register-page.js";
import LoginPage from "../pages/auth/login-page.js";

const routes = {
  "/": new HomePage(),
  "/story": new StoryPage(),
  "/register": new RegisterPage(),
  "/login": new LoginPage(),
};


export default routes;
