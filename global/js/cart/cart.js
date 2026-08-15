document.addEventListener("productsLoaded", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userEmail = loggedInUser ? loggedInUser.email : "guest";

  let cart = getUserCart(userEmail);

  function saveCart() {
    saveUserCart(userEmail, cart);
  }

  function addToCart(productId) {
    const selectedProduct = products.find((item) => item.id === productId);
    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...selectedProduct, quantity: 1 });
    }

    markAsAdded(productId);
    saveCart();
    renderCartDrawer();
    openCart();
  }

  function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex((item) => item.id == productId);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += change;

      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
        restoreAddButton(productId); // card goes back to normal
      }
    }
    saveCart();
    renderCartDrawer();
  }

  function setCartQuantity(productId, qty) {
    const selectedProduct = products.find((item) => item.id === productId);
    const existing = cart.find((item) => item.id === productId);

    if (existing) {
      existing.quantity = qty;
    } else {
      cart.push({ ...selectedProduct, quantity: qty });
    }

    markAsAdded(productId);
    saveCart();
    renderCartDrawer();
    openCart();
  }

  // swap card button to "Added"
  function markAsAdded(productId) {
    const actionArea = document.getElementById(`action-area-${productId}`);
    if (!actionArea) return;

    const hasStepper = actionArea.querySelector("#qty-plus");

    if (hasStepper) {
      const addBtn = actionArea.querySelector(".add-btn");
      if (addBtn) {
        addBtn.textContent = "Update";
        addBtn.classList.add("update");
      }
    } else {
      actionArea.innerHTML = `
        <button class="add-btn added" data-id="${productId}">Added</button>
        `;
    }
  }

  // restore original "Add to cart" button
  function restoreAddButton(productId) {
    const actionArea = document.getElementById(`action-area-${productId}`);
    if (!actionArea) return;
    actionArea.innerHTML = `<button class="add-btn" data-id="${productId}"> Add to cart</button>
        `;
  }

  function renderCartDrawer() {
    const cartItemsEl = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const cartCountEl = document.getElementById("cart-count");

    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<p class="cart-empty-msg">Your cart is empty</p>`;
    }

    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
            <img src="${item.image}">
            <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>रु.${item.price} x ${item.quantity}</p>
            </div>
            <div class="quantity-control">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="remove">
            <button onclick="removeItem(${item.id})">
            <i class="fa-solid fa-trash-can" style="color: rgb(3, 3, 3); size="20px""></i>
            </button>
            </div>
            `;
      cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = `Total: रु.${total}`;
    cartCountEl.textContent = cart.length;
  }

  function removeItem(productId) {
    cart = cart.filter((item) => item.id != productId);
    restoreAddButton(productId);

    saveCart();
    renderCartDrawer();
  }

  // open-close
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("active");
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("active");
  }

  document.getElementById("cart-icon").addEventListener("click", function (e) {
    e.preventDefault(); // stop the a href from reloading
    openCart();
  });

  document.getElementById("close-cart").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  document
    .querySelector(".checkout-btn")
    .addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }
      // alert("Proceeding to checkout");
    });

  cart.forEach((item) => markAsAdded(item.id));
  renderCartDrawer();

  window.addToCart = addToCart;
  window.setCartQuantity = setCartQuantity;
  window.updateQuantity = updateQuantity;
  window.removeItem = removeItem;
  window.openCart = openCart;
  window.closeCart = closeCart;
});
