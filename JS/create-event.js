import { fetchJSON } from "./utils.js";
import { decodeJWT } from "./auth.js"; 

//function to create an event
export function initializeEventCreation() {

  const token = localStorage.getItem('jwt_token');
  const decodedToken = token ? decodeJWT(token): null;
  const username = decodedToken?.username || 'unknown';
  const newEvent = {
    event_name: document.getElementById("event-name").value,
    event_date: document.getElementById("event-date").value,
    event_description: document.getElementById("event-description").value,
    club_name: document.getElementById("club-name").value,
    created_by: username,
    venue: document.getElementById("venue").value,
    team_size: document.getElementById("team-size").value,
    organizer_email: document.getElementById("contact").value,
    rewards: document.getElementById("rewards").value,
  };

  fetchJSON("http://localhost:3000/event/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newEvent),
  })
    .then(() => {
      window.location.href = `${window.location.origin}/index.html`;
    })
    .catch(() => {
      alert("Error creating event. Please try again");
    });
}
