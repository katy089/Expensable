import { tokenKey } from "./scripts/config.js";
import DOMHandler from "./scripts/dom_handler.js";
import HomePage from "./scripts/pages/home-page.js";
import LoginPage from "./scripts/pages/login-page.js";
import { login } from "./scripts/services/sessions-service.js";
import { getUser } from "./scripts/services/user-service.js";

async function init() {
  try {
    const token = sessionStorage.getItem(tokenKey);

    if (!token) return DOMHandler.load(LoginPage);

    const user = await getUser();
    console.log(user);
    //HomePage
    DOMHandler.load(HomePage);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}
// login({ email: "test3@mail.com", password: "123456" });
init();
