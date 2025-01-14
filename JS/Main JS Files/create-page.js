//main js file for create-event.html

import { initializeDropdown } from "../dropdown.js";
import { handleSignOut, handleLogIn, checkAdmin } from "../auth.js";
import { initializeEventCreation } from "../create-event.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeDropdown();
  checkAdmin();
  document
    .getElementById("sign-out-link")
    .addEventListener("click", handleSignOut);
  document.getElementById("log-in-link").addEventListener("click", handleLogIn);
  document
    .getElementById("create-event-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      initializeEventCreation();
    });
});
