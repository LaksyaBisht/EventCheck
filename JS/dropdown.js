// dropdown
export function initializeDropdown() {
  const profileDropdown = document.querySelector(".profile-dropdown");

  // Toggle the dropdown menu on click
  profileDropdown.addEventListener("click", () => {
    profileDropdown.classList.toggle("active");
  });

  // Close the dropdown menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!profileDropdown.contains(event.target)) {
      profileDropdown.classList.remove("active");
    }
  });
}
