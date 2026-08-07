document.addEventListener("productsLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));
  const product = products.find((p) => p.id === productId);

  const container = document.getElementById("details-body");

  if (!product) {
    console.error("Product not found for id:", productId);
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }
  renderProductsDetails(product);
});

function renderProductsDetails(product) {
  const container = document.getElementById("details-body");

  container.innerHTML = `
    <div class="details-body">
      <div class="details-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="details-content">
        <h2>${product.name}</h2>
        <p>${product.subtitle}</p>
        <p>${product.fullDescription}</p>

        <div class="details-price">
          <span class="price" id="price">रु.${product.price}</span>
        </div>
        <p class="tax-note">(incl. of all taxes)</p>

        <div class="action-area" id="action-area-${product.id}">
          <button id="qty-minus">−</button>
          <span id="qty-value">1</span>
          <button id="qty-plus">+</button>
          <button class="add-btn" id="add-btn" data-id="${product.id}">Add to Cart</button>
        </div>
        <p class="cart-msg" id="cart-msg"></p>

        <div class="accordion-item">
          <button class="accordion-header">
            Ideal For
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-body">
            <p><strong>Skin type:</strong> ${product.idealFor.skinType}</p>
            <p><strong>Concerns:</strong> ${product.idealFor.concerns}</p>
            <p><strong>Suitable for:</strong> ${product.idealFor.suitableFor}</p>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-header">
            How to Use
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-body">
            <p>${product.howToUse.steps}</p>
            <p><strong>When to use:</strong> ${product.howToUse.frequency}</p>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-header">
            Ingredients
            <span class="accordion-icon">+</span>
          </button>
          <div class="accordion-body">
            <p>${product.ingredients}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  attachDetailsListeners(product);
}

function attachDetailsListeners(product) {
  const container = document.getElementById("details-body");
  const minusButton = document.getElementById("qty-minus");
  const plusButton = document.getElementById("qty-plus");
  const qtyDisplay = document.getElementById("qty-value");

  minusButton.addEventListener("click", (event) => {
    event.preventDefault();
    const currentValue = Number(qtyDisplay.textContent) || 1;
    qtyDisplay.textContent = Math.max(1, currentValue - 1);
  });

  plusButton.addEventListener("click", (event) => {
    event.preventDefault();
    const currentValue = Number(qtyDisplay.textContent) || 1;
    qtyDisplay.textContent = currentValue + 1;
  });

  container.querySelectorAll(".accordion-item").forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const icon = item.querySelector(".accordion-icon");

    header.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      icon.textContent = isOpen ? ">" : "+";
    });
  });

  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-btn") && !e.target.disabled) {
      const id = Number(e.target.dataset.id);
      const qtyDisplay = document.getElementById("qty-value");
      const qty = Number(qtyDisplay.textContent) || 1;

      if (typeof setCartQuantity === "function") {
        setCartQuantity(id, qty);
      }
    }
  });
}
