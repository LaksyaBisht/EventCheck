import { decodeJWT } from "./auth.js";

const profileDiv = document.getElementById('profile');
const editForm = document.getElementById('edit-form');
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');


export function loadProfileDetails() {
    const token = localStorage.getItem("jwt_token");
    let username='';
    if (token) {
    const decodedToken = decodeJWT(token);
    username = decodedToken.username || '';

    if (username) {
        fetch(`http://localhost:3000/profile/${username}`, {
            method: "GET",
        })
        .then(response => response.json())
        .then((profile) => {
            const username = profile.username || "N/A";
            const email = profile.email || "N/A";
            const role = profile.role || "N/A";
            const clubName = profile.clubName || "N/A";

            // Update profile display
            document.getElementById("username").value = username;
            document.getElementById("email").value = email;
            document.getElementById("role").value = role;
            document.getElementById("clubName").value = clubName;

            // Update edit form
            document.getElementById("edit-username").value = username;
            document.getElementById("edit-email").value = email;
            document.getElementById("edit-role").value = role;
            document.getElementById("edit-clubName").value = clubName;
        })
        .catch((error) => {
            console.error("Error fetching profile:", error);
            document.getElementById("profile").innerText = "Error loading profile. Please try again later.";
        });
    }
}
}// Edit button functionality
if(editButton)
{
    editButton.addEventListener('click', () => {
        profileDiv.classList.add('hidden');
        editForm.classList.remove('hidden');
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
    });
}

if(saveButton)
{
    saveButton.addEventListener('click', () => {
        const nameInput = document.getElementById('edit-username').value;
        const emailInput = document.getElementById('edit-email').value;
        const roleInput = document.getElementById('edit-role').value;
    
        // API call to update the database
        const username = document.getElementById("username").value; // Replace with dynamic username if applicable
        const updatedData = {
            username: nameInput,
            email: emailInput,
            role: roleInput
        };
    
        fetch(`http://localhost:3000/profile/${username}`, {
            method: "PUT", // Use PUT or POST based on your API design
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update profile');
            }
        })
        .then((data) => {
            // Update profile display on successful database update
            document.getElementById('username').innerText = data.username;
            document.getElementById('email').innerText = data.email;
            document.getElementById('role').innerText = data.role;
    
            // Toggle views
            profileDiv.classList.remove('hidden');
            editForm.classList.add('hidden');
            editButton.classList.remove('hidden');
            saveButton.classList.add('hidden');
        })
        .catch((error) => {
            console.error("Error updating profile:", error);
            alert("Failed to save changes. Please try again.");
        });
    });
    
}
// Save button functionality
