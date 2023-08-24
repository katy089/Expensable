import { getCategories } from "./services/categories-service.js";

async function fetchCategories() {
  const categories = await getCategories();
  this.income = categories.filter(
    (category) => category.transaction_type === "income"
  );
  this.expense = categories.filter(
    (category) => category.transaction_type === "expense"
  );
}
function currentCategories() {
  // if(this.currentTab === "expense"){
  //   return this["expense"];
  // }else if(this.currentTab === "income"){
  //   return this["income"];
  // }
  // console.log(this);
  // console.log(this.currentTab);
  return this[this.currentTab];
}
function deleteCategory(id) {
  if (this.currentTab == "expense") {
    this.expense = this.expense.filter((category) => category.id != id);
  }
  if (this.currentTab == "income") {
    this.income = this.income.filter((category) => category.id != id);
  }
}
const STORE = {
  user: null,
  income: [],
  expense: [],
  currentTab: "expense",
  fetchCategories,
  currentCategories,
  deleteCategory,
};
export default STORE;
