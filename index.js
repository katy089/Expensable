import { login, logout } from "./scripts/services/sessions-service.js";

//console.log("Happy coding!");
// login({ email: "test3@mail.com", password: "123456" })
//   .then((user) => user,)
//   .catch((error) => console.log(error));
const credentials = { email: "test3@mail.com", password: "123456" };
async function test() {
  try {
    const user = await login(credentials);
    console.log(user);
    const message = await logout();
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}
test();
