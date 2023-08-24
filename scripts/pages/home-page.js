import Expenses from "../components/expenses.js";
import Profile from "../components/profile.js";
import DOMHandler from "../dom_handler.js";
import STORE from "../store.js";

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
</main>
  `;
}
const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenNavigation();
    Expenses.addListeners();
  },
};
export default HomePage;
