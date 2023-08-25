import Expenses from "../components/expenses.js";
import { input } from "../components/input.js";
import Profile from "../components/profile.js";
import DOMHandler from "../dom_handler.js";
import { createCategory } from "../services/categories-service.js";
import { logout } from "../services/sessions-service.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";

function listenLogout() {
  const a = document.querySelector(".js-logout");
  a.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}
function listenCreateCategory() {
  const form = document.querySelector(".js-create-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { category } = event.target;
      // console.log(category.value);
      //createCategory API
      const data = {
        name: category.value,
        transaction_type: STORE.currentTab,
      };
      const newCategory = await createCategory(data);
      //Actualizar el STORE
      STORE.addCategory(newCategory);
      //Reload
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
    }
  });
}
function listenNavigation() {
  const navigation = document.querySelector(".js-navigation");
  navigation.addEventListener("click", (event) => {
    event.preventDefault();
    const link = event.target.closest("[data-tab]");
    if (!link) return;

    STORE.currentTab = link.dataset.tab;
    DOMHandler.reload();
  });
}
function render() {
  return `
  <main class="section">
  <section class="container">
    <a href="#" class="block mb-4 js-logout">Logout</a>
    <h3 class="heading heading--lg text-center mb-2">Expensable</h3>
    <div class="flex justify-between mb-8 js-navigation">
      <a href="#" class="button button--subtle js-nav-link ${
        STORE.currentTab === "expense" ? "activeTab" : ""
      }" data-tab="expense">Expense</a>
      <a href="#" class="button button--subtle js-nav-link ${
        STORE.currentTab === "income" ? "activeTab" : ""
      }" data-tab="income">Income</a>
      <a href="#" class="button button--subtle js-nav-link ${
        STORE.currentTab === "profile" ? "activeTab" : ""
      }" data-tab="profile">Profile</a>
    </div>
    ${STORE.currentTab === "expense" ? Expenses : ""}
    ${STORE.currentTab === "income" ? Expenses : ""}
    ${STORE.currentTab === "profile" ? Profile : ""}
  </section>
  <form class="flex  flex-column gap-4 mb-4 js-create-form">
    ${input({
      id: "category",
      placeholder: "Category name...",
      required: true,
    })}
    <button class="button button--primary">Create Category</button>
  </form>
</main>
  `;
}
const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenNavigation();
    listenLogout();
    listenCreateCategory();
    if (["expense", "income"].includes(STORE.currentTab))
      Expenses.addListeners();
    if (STORE.currentTab === "profile") Profile.addListeners();
  },
};
export default HomePage;
