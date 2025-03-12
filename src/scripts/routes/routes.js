import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import StoryPage from "../pages/story/story-page.js";
import RegisterPage from "../pages/register/register-page.js"; // Import halaman register

const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/story": StoryPage,
  "/register": RegisterPage, // Tambahkan route baru untuk register
};

export default routes;
