document.addEventListener("productsLoaded", function () {
  const container = document.getElementById("products-container");
  const skinProducts = products.filter(
    (product) => product.category === "Skin",
  );

  function renderCard(product) {
    const outOfStock = !product.inStock;

    return `
            <div class="card ${outOfStock ? "out-of-stock" : ""}" data-id="${product.id}">
                <img src="${product.image}">
                <h3 class="product-info-details" data-id="${product.id}">${product.name}</h3>
                <p>${product.description}</p>
                <h4>रु.${product.price}</h4>
                <div class="action-area" id="action-area-${product.id}">
                    <button 
                        class="add-btn" 
                        data-id="${product.id}"
                        ${outOfStock ? "disabled" : ""}
                    >
                        ${outOfStock ? "Out of stock" : "Add to cart"}
                    </button>
                </div>
            </div>
        `;
  }

  // Hands control over to the shared filter/sort logic in filters.js
  initProductFilters({
    baseProducts: skinProducts,
    container: container,
    renderCard: renderCard,
  });

  paginate(container, document.getElementById("pagination"));

  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-btn") && !e.target.disabled) {
      const id = Number(e.target.dataset.id);
      if (typeof addToCart === "function") addToCart(id);
      return;
    }
  });
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("product-info-details")) {
      const id = e.target.dataset.id;
      window.location.href = `/pages/details/product-details.html?id=${id}`;
    }
  });
});
