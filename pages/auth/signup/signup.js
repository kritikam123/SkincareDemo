const form = document.getElementById("signupForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
    const terms = document.getElementById("terms").checked;

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(97|98)\d{8}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (name === "") {
        alert("Full name is required");
        return;
    }

    if (!namePattern.test(name)) {
        alert("Full name should contain only letters");
        return;
    }

    if (email === "") {
        alert("Email is required.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (phone === "") {
        alert("Phone number is required.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number must be a valid Nepali number.");
        return;
    }

    if (password === "") {
        alert("Password is required.")
        return;
    }

    if (!passwordPattern.test(password)) {
        alert("Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.");
        return;
    }

    if (confirmPassword === "") {
        alert("Please confirm your password.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (!terms) {
        alert("Please accept the Terms of Service and Privacy Policy.");
        return;
    }

    const user = {name, email, phone, password};
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Account created successfully!");

    form.reset();

    setTimeout(() => {
        window.location.href = "/pages/auth/login/login.html";
    }, 500);
});