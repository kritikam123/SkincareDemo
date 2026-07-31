document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value.trim();

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const matchedUser = registeredUsers.find(
        user => user.email.trim().toLowerCase() === email && user.password.trim() === password
    );

    if (matchedUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
        window.location.href = "/pages/user/user.html";
    } else {
        alert("Invalid email or password");
    }
});