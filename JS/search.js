import { fetchJSON } from "./utils.js";
export function searchEvent() {
  const query = document.getElementById("search-input").value.trim();

  fetchJSON(`https://event-check-omega.vercel.app/search?q=${encodeURIComponent(query)}`)
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      document.getElementById("event-container").innerHTML =
        "<p>Error fetching results</p>";
    });
}
function displayResults(results) {
  const searchResults = document.getElementById("event-container");
  searchResults.innerHTML = "";

  if (results.length == 0) {
    searchResults.innerHTML =
      "<p>None of the event name matches your search</p>";
    return;
  }

  results.forEach((result) => {
    const card = document.createElement("div");
    card.className = "card-event";
    card.innerHTML = `
                <h3>${result.event_name}</h3>
                <p>${result.club_name}</p>
                <p>${new Date(result.event_date).toDateString()}</p>
            `;
    card.onclick = () => handleCardClick(result.event_id); // Redirect to event details on card click
    searchResults.append(card);
  });
}
