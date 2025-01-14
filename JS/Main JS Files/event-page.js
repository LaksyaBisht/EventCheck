//main js file for index.html and event-details.html

import { initializeDropdown } from "../dropdown.js";
import { loadEvents } from "../event.js";
import { loadEventDetails } from "../event-details.js";
import { handleSignOut, handleLogIn, checkAdmin } from "../auth.js";
import { searchEvent } from "../search.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeDropdown();
  checkAdmin();
  loadEvents();
  loadEventDetails();

  document
    .getElementById("sign-out-link")
    .addEventListener("click", handleSignOut);
  document.getElementById("log-in-link").addEventListener("click", handleLogIn);
  document
    .getElementById("search-input")
    .addEventListener("input", searchEvent);
});
