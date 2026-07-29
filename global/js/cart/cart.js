document.addEventListener("productsLoaded", function () {

    // load saved cart from local storage, or start empty
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // saving cart to localstorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(productId) {
        const selectedProduct = products.find(item => item.id === productId);
        const existing = cart.find(item => item.id === productId);

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
        const itemIndex = cart.findIndex(item => item.id == productId);

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

    // swap card button to "Added"
    function markAsAdded(productId) {
        const actionArea = document.getElementById(`action-area-${productId}`);
        if (!actionArea) return;
        actionArea.innerHTML = `
        <button class="add-btn added" data-id="${productId}">Added</button>
        `;
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
        let totalCount = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            totalCount += item.quantity;

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
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            `;
            cartItemsEl.appendChild(li);
        });
        cartTotalEl.textContent = `Total: रु.${total}`;
        cartCountEl.textContent = totalCount;
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

    document.querySelector(".checkout-btn").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty");
            return;
        }
        alert("Proceeding to checkout");
    });

    cart.forEach(item => markAsAdded(item.id));
    renderCartDrawer();

    // Expose these on window so inline onclick="..." handlers in the HTML
    // (and in the template strings above) can actually find them.
    // Without this, every onclick call throws "addToCart is not defined".
    window.addToCart = addToCart;
    window.updateQuantity = updateQuantity;
    window.openCart = openCart;
    window.closeCart = closeCart;
});