document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const stored = JSON.parse(localStorage.getItem('registeredUser'));

    if(stored && stored.email === email && stored.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(stored)); // saves loggied user
        window.location.href = "/pages/user/user.html";
    }
    else{
        alert("Invalid email or password");
    }
});