import DOMHandler from "../dom_handler.js";
import { deleteCategory } from "../services/categories-service.js";
import STORE from "../store.js";

function calcTotal(transactions) {
  // console.log(transactions);
  // let total = 0;
  // transactions.forEach((transaction) => {
  //   total += transaction.amount;
  // });
  // return total;
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}
function listenDelete() {
  const ul = document.querySelector(".js-category-list");
  ul.addEventListener("click", async (event) => {
    try {
      event.preventDefault();
      const deleteLink = event.target.closest("[data-id]");
      if (!deleteLink) return;

      const id = deleteLink.dataset.id;
      console.log(id);
      // llamado de la API
      await deleteCategory(id);
      // Eliminar de nuestro STORE
      STORE.deleteCategory(id);
      // Reload
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
    }
  });
}
function renderCategory(category) {
  return `
  <li class="flex gap-4 justify-between" style="border: 1px solid black">
    <p>${category.name}</p>
    <p>${calcTotal(category.transactions)}</p>
    <a href="#" data-id=${category.id}>Delete</a>
  </li>
`;
}
function render() {
  const categories = STORE.currentCategories();
  return `
  <h2>${STORE.currentTab === "expense" ? "Expenses" : "Incomes"}</h2>
    <ul class="js-category-list">
    ${categories.map(renderCategory).join("")}
    </ul>
    `;
}
const Expenses = {
  toString() {
    return render();
  },
  addListeners() {
    listenDelete();
  },
};
export default Expenses;
