import apiFetch from "./api-fetch.js";

export function getCategories() {
  return apiFetch("/categories");
}
export function createCategory(
  newCategory = { name, transaction_type, color, icon }
) {
  newCategory.color = "green";
  newCategory.icon = "bank";
  return apiFetch("/categories", { body: newCategory });
}
export function deleteCategory(id) {
  return apiFetch(`/categories/${id}`, { method: "DELETE" });
}
