//main js file for index.html and event-details.html

import { initializeDropdown } from "../dropdown.js";
import { loadEvents } from "../event.js";
import { loadEventDetails } from "../event-details.js";
import { handleSignOut, handleLogIn, checkAdmin, handleProfile} from "../auth.js";
import { searchEvent } from "../search.js";
import { loadProfileDetails } from "../profile.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeDropdown();
  checkAdmin();

  if (document.getElementById("event-container")) {
    loadEvents();
  }

  // Load event details if the container exists
  if (document.getElementById("event-details")) {
    loadEventDetails();
  }

  const signOutLink = document.getElementById("sign-out-link");
  const logInLink = document.getElementById("log-in-link");
  const profileLink = document.getElementById("profile-link");

  if (signOutLink) {
    signOutLink.addEventListener("click", handleSignOut);
  }
  if (logInLink) {
    logInLink.addEventListener("click", handleLogIn);
  }
  if (profileLink) {
    profileLink.addEventListener("click", handleProfile); 
  }
  if (window.location.pathname.includes("profile.html")) {
    loadProfileDetails();
  }
  
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    let debounceTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        searchEvent(e);
      }, 300);
    });
  }
});
