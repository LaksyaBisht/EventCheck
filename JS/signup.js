document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const formTitle = document.getElementById("formTitle");
  const usernameField = document.getElementById("usernameField");
  const roleField = document.getElementById("roleField");
  const clubField = document.getElementById("clubField");
  const submitButton = document.getElementById("submitButton");
  const switchMessage = document.getElementById("switchMessage");
  const toggleLink = document.getElementById("toggleLink");

  let isLogin = true; 

  function updatelogSign() {
    if (isLogin) {
      form.action = "/login";
      formTitle.textContent = "Login";
      email.value = "";
      password.value = "";
      usernameField.style.display = "none";
      roleField.style.display = "none";
      clubField.style.display = "none";
      submitButton.textContent = "Login";
      switchMessage.innerHTML = `Don't have an account? <a href="" id="toggleLink">Sign Up</a>`;
    } else {
      form.action = "/register";
      formTitle.textContent = "Sign Up";
      usernameField.style.display = "block";
      email.value = "";
      password.value = "";
      roleField.style.display = "block";
      submitButton.textContent = "Sign Up";
      switchMessage.innerHTML = `Already have an account? <a href="" id="toggleLink">Login</a>`;
      if (roleField.value === "club_admin") {
        clubField.style.display = "block"; // Show club field when role is club_admin
      } else {
        clubField.style.display = "none"; // Hide club field otherwise
      }
    } // Add event listener to toggle login/signup
    document.getElementById("toggleLink").addEventListener("click", (e) => {
      e.preventDefault();
      isLogin = !isLogin;
      updatelogSign();
    });
  }

  // Initial setup
  updatelogSign(); // Set the initial mode (Login by default)

  document.getElementById("role").addEventListener("change", () => {
    const roleField = document.getElementById("role");
    const clubField = document.getElementById("clubField");

    if (roleField.value === "club_admin") {
      clubField.style.display = "block"; // Show club field when role is club_admin
    } else {
      clubField.style.display = "none"; // Hide club field otherwise
    }
  });

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Define the body for the request based on whether it's login or sign up
    let body;

    if (isLogin) {
      body = JSON.stringify({ email, password });
      fetch("https://event-check-omega.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json();
            alert(data.message || "Error during login");
          }
          return response.json();
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwt_token", data.token);
            window.location.href = `${window.location.origin}/index.html`;
          }
        })
        .catch((error) => {
          alert("You are not registered");
        });
    } else {
      const username = document.getElementById("username").value;
      const roleField = document.getElementById("role").value;
      const role = roleField == "club_admin" ? "admin" : "user";
      console.log(role);
      let clubName;
      if (role == "user") clubName = null;
      else clubName = document.getElementById("club").value;
      console.log(clubName);
      let body = JSON.stringify({ username, email, password, role, clubName });
      fetch("https://event-check-omega.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message); // Handle sign-up success or error

          isLogin = true;
          updatelogSign();
        })
        .catch((error) => {
          alert("An error occurred");
        });
    }
  });
});
