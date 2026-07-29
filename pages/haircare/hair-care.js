document.addEventListener("productsLoaded", function(){
const container = document.getElementById("products-container");
const hairProducts = products.filter(product => product.category === "Hair");

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

    initProductFilters({
        baseProducts: hairProducts,
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