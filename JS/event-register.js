const urlParams = new URLSearchParams(window.location.search);
const event_name = urlParams.get("event_name");

if (!event_name) {
  alert("Invalid event name. Please check the URL.");
  throw new Error("Event name is missing in the URL");
}

document.querySelector("h1").textContent = `Register for ${event_name}`;

// Handle form submission
document.getElementById("registration-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const token = localStorage.getItem('jwt_token');
  if (!token) {
    alert("Unauthorized: Please log in first.");
    return;
  }

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const registrationNum = document.getElementById("registration-num").value;
  const phone = document.getElementById("phone").value;
  const teamDetails = document.getElementById("team-details").value;

  fetch(`http://localhost:3000/register-event/${event_name}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, email, registrationNum, phone, teamDetails }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.message || "Registration failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message || "Registration Successful!");
      window.location.href = `${window.location.origin}/HTML/event-details.html?event_name=${event_name}`;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
      console.error("Error during registration:", error);
    });
});
