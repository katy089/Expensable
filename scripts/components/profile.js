import DOMHandler from "../dom_handler.js";
import { updateUser } from "../services/user-service.js";
import STORE from "../store.js";
import Expenses from "./expenses.js";
import { input } from "./input.js";

function listenSubmitForm() {
  const form = document.querySelector(".js-profile-form");
  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      const { email, first_name, last_name, phone } = event.target;
      const data = {
        email: email.value,
        first_name: first_name.value,
        last_name: last_name.value,
        phone: phone,
      };
      //updateUser
      const user = await updateUser(data);
      //actualizar los datos del STORE
      STORE.user = user;
      //Reload
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
      Profile.state.formError = error.message;
      DOMHandler.reload();
    }
  });
}
function render() {
  const { email, first_name, last_name, phone } = STORE.user;
  const { formError } = Profile.state;

  return `
  <form class="flex flex-column gap-4 mb-4 js-profile-form">
    ${input({
      label: "email",
      id: "email",
      placeholder: "john@example.com",
      type: "email",
      required: true,
      value: email,
    })}
    ${input({
      label: "First Name",
      id: "first_name",
      value: first_name,
    })}
    ${input({
      label: "Last name",
      id: "last_name",
      value: last_name,
    })}
    ${input({
      label: "Phone",
      id: "phone",
      value: phone,
    })}
    
    ${formError ? `<p class="text-center error-300">${formError}</p>` : ""}
    <button class="button button--primary">Update</button>
  </form>
  `;
}
const Profile = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmitForm();
  },
  state: {
    formError: false,
  },
};

export default Profile;
