document.addEventListener("productsLoaded", function () {
    const container = document.getElementById("products-container");
    const bestSellers = products.filter(product => product.category === "Best Sellers");

    function renderCard(product) {
        const outOfStock = !product.inStock;

        return `
            <div class="card ${outOfStock ? "out-of-stock" : ""}" data-id="${product.id}">
                <img src="${product.image}">
                <h3>${product.name}</h3>
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
        baseProducts: bestSellers,
        container: container,
        renderCard: renderCard
    });

    container.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-btn") && !e.target.disabled) {
            const id = Number(e.target.dataset.id);
            if (typeof addToCart === "function") addToCart(id);
        }
    });
});