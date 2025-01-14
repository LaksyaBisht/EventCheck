import { fetchJSON } from "./utils.js";

//function to load the main event details
export function loadEventDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const event_name = urlParams.get("event_name");

  if (event_name) {
    fetchJSON(`https://event-check-omega.vercel.app/event/event-details/${event_name}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
      .then((event) => {
        document.getElementById("event-name").innerText = event.event_name;
        document.getElementById("club-name").innerText = event.club_name;
        document.getElementById("event-date").innerText = new Date(
          event.event_date
        ).toDateString();
        document.getElementById("event-description").innerText =
          event.event_description;
        document.getElementById("created-by").innerText = event.created_by;
        document.getElementById("venue").innerText = event.venue;
        document.getElementById(
          "team-size"
        ).innerText = `Team Size: ${event.team_size}`;
        document.getElementById(
          "organizer-email"
        ).innerText = `Contact: ${event.organizer_email}`;
        document.getElementById(
          "rewards"
        ).innerText = `Rewards: ${event.rewards}`;

        const button = document.createElement("button");
        button.type = "submit";
        button.innerText = "Register";
        document.getElementById("event-details").append(button);
      })
      .catch(() => {
        document.getElementById("event-name").innerText = "No event";
      });
  }
}
