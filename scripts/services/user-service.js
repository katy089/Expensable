import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

async function createUser(
  newUser = {
    email,
    password,
    first_name,
    last_name,
    phone,
  }
) {
  const { token, ...user } = await apiFetch("/signup", { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}
async function updateUser(
  data = {
    email,
    first_name,
    last_name,
    phone,
  }
) {
  const user = await apiFetch("/profile", { body: data, method: "PATCH" });
  return user;
}
