import { fetchJSON } from "./utils.js";

//function to create an event
export function initializeEventCreation() {
  const newEvent = {
    event_name: document.getElementById("event-name").value,
    event_date: document.getElementById("event-date").value,
    event_description: document.getElementById("event-description").value,
    club_name: document.getElementById("club-name").value,
    created_by: document.getElementById("event-creator").value,
    venue: document.getElementById("venue").value,
    team_size: document.getElementById("team-size").value,
    organizer_email: document.getElementById("contact").value,
    rewards: document.getElementById("rewards").value,
  };

  fetchJSON("https://event-check-omega.vercel.app/event/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
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
