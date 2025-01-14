//decoding the jwt_token
export function decodeJWT(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload)); // Decode the base64-encoded payload
}

//checking user is logged in by verifying the jwt token
export function isLoggedIn() {
  const token = localStorage.getItem("jwt_token");
  console.log(token);
  if (!token) return false;

  const decoded = decodeJWT(token);
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp > now;
}

/*
  Checks if the logged-in user is an admin and adjusts the UI accordingly.
  If the user has the "admin" role, displays the "Create" tab.
  If not logged in or not an admin, hides the "Create" tab.
 */
export function checkAdmin() {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    const decodedToken = decodeJWT(token);
    if (decodedToken.role === "admin") {
      document.getElementById("create-tab").style.display = "flex";
    }
  } else {
    document.getElementById("create-tab").style.display = "none";
  }
}

//Handles the sign-out process for the user.
export function handleSignOut() {
  localStorage.removeItem("jwt_token");
  window.location.href = `${window.location.origin}/HTML/signup.html`;
}

// Handles the login process for the user.
export function handleLogIn() {
  if (localStorage.getItem("jwt_token")) {
    alert("Already signed in");
  } else {
    window.location.href = `${window.location.origin}/HTML/signup.html`;
  }
}
