const menu = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navRight = document.querySelector(".nav-right");
const icon = menu.querySelector("i");

menu.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    navRight.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});