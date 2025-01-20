document.addEventListener("DOMContentLoaded", function(){
    const token = localStorage.getItem('jwt_token');

    fetch('http://localhost:3000/admin-dashboard', {
        method: 'GET',
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })
    .then((response)=>response.json())
    .then((data)=>{
        const eventsTable = document.getElementById("events-table").querySelector('tbody');

        if(data.data && data.data.length>0){
            data.data.forEach((event)=>{
                const row = eventsTable.insertRow();
                row.innerHTML = `
                    <td>${event.event_name}</td>
                    <td>${new Date(event.created_at).toLocaleString()}</td>
                    <td><button onclick="showStudentList('${event.event_name}')">View Students</button></td>
                `;
            })
        }
        else{
            eventsTable.innerHTML = `<tr><td colspan = "4">No events found</td></tr>`
        }
    })
    .catch((error)=>{
        console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again later.");
    });
});

function showStudentList(event_name){
    const token = localStorage.getItem('jwt_token');

    fetch(`http://localhost:3000/registrations/${event_name}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    .then((response)=>
        {
            if (!response.ok) {
                throw new Error("Failed to fetch student registrations");
              }
            return response.json();
        })
    .then((data)=>{
        const studentsTable = document.getElementById("students-table").querySelector('tbody');
        document.getElementById("modal-event-name").textContent = event_name;
        document.getElementById("student-list-modal").style.display = "block";

        studentsTable.innerHTML = "";

        if(data.data && data.data.length >0){
            data.data.forEach((student)=>{
                const row = studentsTable.insertRow();
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.registrationNum}</td>
                    <td>${student.phone}</td>
                    <td>${student.teamDetails}</td>
                `;
            })
        }
        else{
            studentsTable.innerHTML = `<tr><td colspan="5">No students registered</td></tr>`;
        }
    })
    .catch((error) => {
        console.error("Error fetching students:", error);
        alert("Failed to fetch student list. Please try again later.");
    });
}

function closeModal() {
    document.getElementById("student-list-modal").style.display = "none";
  }