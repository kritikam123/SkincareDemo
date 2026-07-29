document.getElementById("logout-btn").addEventListener("click", function(e) {
    e.preventDefault(); // stop a href from jumping to top

    const confirmLogout = confirm("Are you sure you want to log out?");

    if(confirmLogout){
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("cart");

        window.location.href = "/pages/auth/login/login.html";
    }
});