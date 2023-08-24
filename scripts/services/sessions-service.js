const BASE_URI = "https://expensable-api.herokuapp.com";
const tokenKey = "expensable_key";

async function login(credentials = { email, password }) {
  const response = await fetch(`${BASE_URI}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  if (!response.ok) {
    throw new Error(data.errors);
  }

  sessionStorage.setItem(tokenKey, data.token);
  return data;
}
async function logout() {
  const token = sessionStorage.getItem(tokenKey);
  const response = await fetch(`${BASE_URI}/logout`, {
    method: "DELETE",
    headers: {
      Authorization: `Token token=${token}`,
    },
  });
  // console.log(response);
  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  if (!response.ok) {
    throw new Error(data.errors);
  }

  sessionStorage.removeItem(tokenKey);
  return data;
}
export { login, logout };
