const form = document.getElementById("signupForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
  const terms = document.getElementById("terms").checked;

  const namePattern = /^[A-Za-z\s]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(97|98)\d{8}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // clear all old error messages first
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("confirmPasswordError").textContent = "";

  if (name === "") {
    document.getElementById("nameError").textContent = "Full name is required";
    return;
  }

  if (!namePattern.test(name)) {
    document.getElementById("nameError").textContent = "Full name should contain only letters";
    return;
  }

  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    return;
  }

  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    return;
  }

  if (phone === "") {
    document.getElementById("phoneError").textContent = "Phone number is required.";
    return;
  }

  if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").textContent = "Phone number must be a valid Nepali number.";
    return;
  }

  if (password === "") {
    document.getElementById("passwordError").textContent = "Password is required.";
    return;
  }

  if (!passwordPattern.test(password)) {
    document.getElementById("passwordError").textContent =
      "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.";
    return;
  }

  if (confirmPassword === "") {
    document.getElementById("confirmPasswordError").textContent = "Please confirm your password.";
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
    return;
  }

  if (!terms) {
    alert("Please accept the Terms of Service and Privacy Policy.");
    return;
  }

  let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const emailExists = registeredUsers.some((user) => user.email === email);

  if (emailExists) {
    document.getElementById("emailError").textContent = "This email already has an account. Please log in instead.";
    return;
  }

  const user = { name, email, phone, address, password };

  registeredUsers.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  alert("Account created successfully!");

  form.reset();

  setTimeout(() => {
    window.location.href = "/pages/auth/login/login.html";
  }, 500);
});