var cartItemsList = document.getElementById("cart-items");
var subtotalEl = document.getElementById("subtotal");
var shippingCostEl = document.getElementById("shippingCost");
var totalCostEl = document.getElementById("totalCost");
var checkoutForm = document.getElementById("checkoutForm");
var continueBtn = document.getElementById("continueBtn");

var cartItems = [];

var userEmail = "";

/* ---------------- Simple message box ---------------- */

function showMessage(text, type) {
  // type: "success" or "error"
  var box = document.getElementById("message-box");

  box.textContent = text;
  box.className = "message-" + type;
  box.style.display = "block";

  setTimeout(function () {
    box.style.display = "none";
  }, 3000);
}

/* ------------------------------------------------------ */

function getLoggedInUser() {
  var userText = localStorage.getItem("loggedInUser");

  if (userText === null) {
    return null;
  }

  return JSON.parse(userText);
}

function loadCart() {
  var user = getLoggedInUser();

  userEmail = user === null ? "guest" : user.email;

  cartItems = getUserCart(userEmail);
}

function renderCart() {
  loadCart();

  cartItemsList.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    updateTotals();
    return;
  }

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.price * item.quantity;

    var listItem = document.createElement("li");
    listItem.classList.add("cart-item");
    listItem.innerHTML =
      "<img src='" +
      item.image +
      "'>" +
      "<div class='cart-item-info'>" +
      "<span class='cart-item-name'>" +
      item.name +
      "</span>" +
      "<br>" +
      "<span class='cart-item-qty'>Qty: " +
      item.quantity +
      "</span>" +
      "</div>" +
      "<span class='cart-item-price'>रु" +
      itemTotal +
      "</span>";

    cartItemsList.appendChild(listItem);
  }

  updateTotals();
}

function getSubtotal() {
  var subtotal = 0;

  for (var i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + cartItems[i].price * cartItems[i].quantity;
  }

  return subtotal;
}

function getShippingCost() {
  return 100;
}

function updateTotals() {
  var subtotal = getSubtotal();
  var shipping = getShippingCost();
  var total = subtotal + shipping;

  subtotalEl.textContent = "रु" + subtotal;
  shippingCostEl.textContent = "रु" + shipping;
  totalCostEl.textContent = "रु" + total;
}

var shippingRadios = document.querySelectorAll('input[name="shippingMethod"]');
for (var i = 0; i < shippingRadios.length; i++) {
  shippingRadios[i].addEventListener("change", updateTotals);
}

function isFormValid() {
  var requiredFields = checkoutForm.querySelectorAll("[required]");
  var allFilled = true;

  for (var i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].value.trim() === "") {
      allFilled = false;
    }
  }

  return allFilled;
}

function placeOrder() {
  if (!isFormValid()) {
    showMessage("Please fill in all required fields.", "error");
    return;
  }

  if (cartItems.length === 0) {
    showMessage("Your cart is empty.", "error");
    return;
  }

  var user = getLoggedInUser();

  var order = {
    orderId: "ORD-" + Date.now(),
    customerEmail: user.email,
    customerName: user.name,
    items: cartItems,
    subtotal: getSubtotal(),
    shipping: getShippingCost(),
    total: getSubtotal() + getShippingCost(),
    shippingAddress: {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      description: document.getElementById("description").value,
    },
    paymentMethod: document.querySelector(
      'input[name="shippingMethod"]:checked',
    ).value,
    date: new Date().toISOString(),
  };

  var savedOrders = localStorage.getItem("orders");
  var allOrders = savedOrders === null ? [] : JSON.parse(savedOrders);

  allOrders.push(order);
  localStorage.setItem("orders", JSON.stringify(allOrders));

  saveUserCart(userEmail, []);

  showMessage("Order placed!", "success");

  renderCart();
}

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();
  placeOrder();
});

continueBtn.addEventListener("click", function (event) {
  event.preventDefault();
  placeOrder();
});

renderCart();