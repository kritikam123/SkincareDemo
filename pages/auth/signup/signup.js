const form = document.getElementById("signupForm");

function showMessage(text, type) {
  var box = document.getElementById("message-box");

  box.textContent = text;
  box.className = "message-" + type;
  box.style.display = "block";

  setTimeout(function () {
    box.style.display = "none";
  }, 3000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm_password");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const address = addressInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const terms = document.getElementById("terms").checked;

  const namePattern = /^[A-Za-z\s]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(97|98)\d{8}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("phoneError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("confirmPasswordError").textContent = "";

  nameInput.classList.remove("input-error");
  emailInput.classList.remove("input-error");
  phoneInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");
  confirmPasswordInput.classList.remove("input-error");

  if (name === "") {
    document.getElementById("nameError").textContent = "Full name is required";
    nameInput.classList.add("input-error");
    return;
  }

  if (!namePattern.test(name)) {
    document.getElementById("nameError").textContent =
      "Full name should contain only letters";
    nameInput.classList.add("input-error");
    return;
  }

  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    emailInput.classList.add("input-error");
    return;
  }

  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
    emailInput.classList.add("input-error");
    return;
  }

  if (phone === "") {
    document.getElementById("phoneError").textContent =
      "Phone number is required.";
    phoneInput.classList.add("input-error");
    return;
  }

  if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").textContent =
      "Phone number must be a valid Nepali number.";
    phoneInput.classList.add("input-error");
    return;
  }

  if (password === "") {
    document.getElementById("passwordError").textContent =
      "Password is required.";
    passwordInput.classList.add("input-error");
    return;
  }

  if (!passwordPattern.test(password)) {
    document.getElementById("passwordError").textContent =
      "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long.";
    passwordInput.classList.add("input-error");
    return;
  }

  if (confirmPassword === "") {
    document.getElementById("confirmPasswordError").textContent =
      "Please confirm your password.";
    confirmPasswordInput.classList.add("input-error");
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent =
      "Passwords do not match.";
    confirmPasswordInput.classList.add("input-error");
    return;
  }

  if (!terms) {
    showMessage(
      "Please accept the Terms of Service and Privacy Policy.",
      "error",
    );
    return;
  }

  let registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const emailExists = registeredUsers.some(
    (user) => user.email.trim().toLowerCase() === email,
  );

  if (emailExists) {
    document.getElementById("emailError").textContent =
      "This email already has an account. Please log in instead.";

    emailInput.classList.add("input-error");
    return;
  }

  const user = {
    name,
    email,
    phone,
    address,
    password,
  };

  registeredUsers.push(user);

  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  showMessage("Account created successfully!", "success");

  form.reset();

  setTimeout(() => {
    window.location.href = "/pages/auth/login/login.html";
  }, 1200);
});

const inputs = ["name", "email", "phone", "password", "confirm_password"];

inputs.forEach((id) => {
  document.getElementById(id).addEventListener("input", function () {
    this.classList.remove("input-error");
  });
});
