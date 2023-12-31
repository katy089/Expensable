import { input } from "../components/input.js";
import DOMHandler from "../dom_handler.js";
import { login } from "../services/sessions-service.js";
import STORE from "../store.js";
import HomePage from "./home-page.js";

function render() {
  const { loginError } = LoginPage.state;
  return `
  <main class="section">
    <section class="container">
      <h3 class="heading--lg text-center mb-4">Login</h3>
    <form class="flex flex-column gap-4 js-login-form">
      ${input({
        label: "email",
        id: "email",
        type: "email",
        placeholder: "testino@mail.com",
        required: true,
        value: "test3@mail.com",
      })}
      ${input({
        label: "password",
        id: "password",
        type: "password",
        placeholder: "******",
        required: true,
      })}
      ${loginError ? `<p class="text-center error-300">${loginError}</p>` : ""}
      <button class="button button--primary">Submit</button>
    </form>
    </section>
  </main>
  `;
}
function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target;
      const credentials = {
        email: email.value,
        password: password.value,
      };
      const user = await login(credentials);
      STORE.user = user;
      STORE.fetchCategories();
      // console.log(STORE);
      DOMHandler.load(HomePage);
    } catch (error) {
      LoginPage.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}
const LoginPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmitForm();
  },
  state: {
    loginError: null,
  },
};
export default LoginPage;
