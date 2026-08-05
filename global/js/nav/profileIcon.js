document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.getElementById("user-icon");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && loggedInUser.name) {
    userIcon.setAttribute("data-username", `Hii, ${loggedInUser.name}`);
  } else {
    userIcon.setAttribute("data-username", "Please log in");
  }
});
