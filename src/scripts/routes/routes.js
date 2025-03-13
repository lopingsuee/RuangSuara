import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import StoryPage from "../pages/story/story-page.js";
import RegisterPage from "../pages/auth/register-page.js"; // Import halaman register
import LoginPage from '../pages/auth/login-page.js';

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/story": new StoryPage(),
  "/register": new RegisterPage(),
  "/login": new LoginPage(),
};


export default routes;
