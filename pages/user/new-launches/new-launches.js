document.addEventListener("productsLoaded", function () {
  const container = document.getElementById("products-container");
  const newLaunches = products.filter(
    (product) => product.category === "New Launches",
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
    class="add-btn ${outOfStock ? "out-of-stock" : "available"}"
    data-id="${product.id}"
    ${outOfStock ? "disabled" : ""}
>
    ${outOfStock ? "Out of stock" : "Add to cart"}
</button>
                </div>
            </div>
        `;
  }

  initProductFilters({
    baseProducts: newLaunches,
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
      window.location.href = `/pages/user/details/product-details.html?id=${id}`;
    }
  });
});
