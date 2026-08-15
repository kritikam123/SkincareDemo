document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const matchedUser = registeredUsers.find(
    (user) =>
      user.email.trim().toLowerCase() === email &&
      user.password.trim() === password,
  );

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    window.location.href = "/pages/user/user.html";
  } else {
    emailInput.classList.add("input-error");
    passwordInput.classList.add("input-error");
    document.getElementById("loginError").textContent = "Invalid email or password";
  }
});

document.getElementById("loginEmail").addEventListener("input", function () {
  this.classList.remove("input-error");
  document.getElementById("loginError").textContent = "";
});

document.getElementById("loginPassword").addEventListener("input", function () {
  this.classList.remove("input-error");
  document.getElementById("loginError").textContent = "";
});