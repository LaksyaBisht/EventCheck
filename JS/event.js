// event.js
import { fetchJSON } from "./utils.js";
import { isLoggedIn } from "./auth.js";

export function loadEvents() {
  fetchJSON("http://localhost:3000/event")
    .then((events) => {
      const container = document.getElementById("event-container");
      events.forEach((event) => {
        const card = document.createElement("div");
        card.className = "card-event";
        card.innerHTML = `
                    <h3>${event.event_name}</h3>
                    <p>${event.club_name}</p>
                    <p>${new Date(event.event_date).toDateString()}</p>
                `;
        card.onclick = () => handleCardClick(event.event_name);
        container.append(card);
      });
    })
    .catch((error) => console.error("Error fetching events:", error));
}

function handleCardClick(event_name) {
  if (isLoggedIn()) {
    window.location.href = `${window.location.origin}/HTML/event-details.html?event_name=${event_name}`;
  } else {
    alert("Please log in to access full event details");
  }
}
