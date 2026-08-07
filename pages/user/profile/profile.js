let nameEl = document.getElementById("user-name");
let emailEl = document.getElementById("user-email");
let phoneEl = document.getElementById("user-phone");
let addressTextEl = document.getElementById("address-text");

let emptyAddressView = document.getElementById("empty-address-view");
let addressDisplay = document.getElementById("address-display");

function loadUserData() {
    let savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {
        let user = JSON.parse(savedUser);

        nameEl.textContent = user.name || "Unnamed User";
        emailEl.textContent = user.email || "-";
        phoneEl.textContent = user.phone || "-";

        let userAddress = user.address || (user.addresses && user.addresses[0]);

        if (userAddress) {
            addressTextEl.textContent = userAddress;
            emptyAddressView.style.display = "none";
            addressDisplay.style.display = "block";
        } else {
            emptyAddressView.style.display = "flex";
            addressDisplay.style.display = "none";
        }
    } else {
        nameEl.textContent = "Guest User";
        emailEl.textContent = "Not signed in";
        phoneEl.textContent = "Not signed in";
        
        emptyAddressView.style.display = "flex";
        addressDisplay.style.display = "none";
    }
}

loadUserData();