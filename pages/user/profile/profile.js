let nameEl = document.getElementById("user-name");
let emailEl = document.getElementById("user-email");
let phoneEl = document.getElementById("user-phone");
let addressTextEl = document.getElementById("address-text");

let savedUser = localStorage.getItem("loggedInUser");

function loadAddress(user) {
    if (user.addresses && user.addresses.length > 0) {
        addressTextEl.textContent = user.addresses[0];
        addressTextEl.classList.remove("muted");
    } else {
        addressTextEl.textContent = "No address added";
        addressTextEl.classList.add("muted");
    }
}

if (savedUser) {
    let user = JSON.parse(savedUser);

    nameEl.textContent = user.name || "Unnamed User";
    emailEl.textContent = user.email || "-";
    phoneEl.textContent = user.phone || "-";

    loadAddress(user);
} else {
    nameEl.textContent = "Guest User";
    emailEl.textContent = "Not signed in";
    phoneEl.textContent = "Not signed in";
}

// edit button
document.getElementById("edit-btn").addEventListener("click", function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

    let newName = prompt("Edit name:", user.name || "");
    let newEmail = prompt("Edit email:", user.email || "");
    let newPhone = prompt("Edit phone:", user.phone || "");

    if (newName) user.name = newName;
    if (newEmail) user.email = newEmail;
    if (newPhone) user.phone = newPhone;

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    nameEl.textContent = user.name || "Unnamed User";
    emailEl.textContent = user.email || "-";
    phoneEl.textContent = user.phone || "-";
});

// add address button
document.getElementById("add-address-btn").addEventListener("click", function () {
    let newAddress = prompt("Enter a new address");

    if (newAddress) {
        let user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
        if (!user.addresses) {
            user.addresses = [];
        }
        user.addresses.push(newAddress);
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        loadAddress(user);
    }
});