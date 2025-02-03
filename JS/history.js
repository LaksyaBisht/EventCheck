async function fetchUserHistory(){
    try{
        const response = await fetch('http://localhost:3000/history', {
            method:'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(data.success) {
            displayEventHistory(data.events);
        }
        else {
            console.error("Failed to fetch event history");
        }
    } catch (error) {
        console.error("Error fetching user event history:", error);
    }
}

function displayEventHistory(events)
{
    const tableBody = document.getElementById('history-table-body');
    tableBody.innerHTML = '';

    events.forEach(event=>{
        const row = `
            <tr>
                <td>${event.event_name}</td>
                <td>${event.teamDetails}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', fetchUserHistory());