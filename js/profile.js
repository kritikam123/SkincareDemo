// ---------- Load the logged-in user's data ----------
const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));

if (!currentUser) {
    // Nobody's logged in — send back to login page
    window.location.href = "/views/loginPage.html";
}

// Fill in the header next to the profile picture
document.querySelector('.profile-name h4').textContent = currentUser.name;
document.querySelector('.profile-name p').textContent = currentUser.email;

// Pre-fill the form inputs with their saved info
document.getElementById('username').value = currentUser.name;
document.getElementById('userEmail').value = currentUser.email;
document.getElementById('userPhone').value = currentUser.phone;
document.getElementById('userLocation').value = currentUser.location || ""; // not collected at signup, starts empty

// ---------- Save changes when the form is submitted ----------
document.getElementById('user-info').addEventListener('submit', function (e) {
    e.preventDefault();

    const updatedUser = {
        ...currentUser, // keeps password untouched
        name: document.getElementById('username').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        location: document.getElementById('userLocation').value
    };

    // Update both: the active session AND the permanent account record
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    localStorage.setItem('registeredUser', JSON.stringify(updatedUser));

    // Refresh the header immediately to reflect any changes
    document.querySelector('.profile-name h4').textContent = updatedUser.name;
    document.querySelector('.profile-name p').textContent = updatedUser.email;

    alert("Profile updated successfully!");
});