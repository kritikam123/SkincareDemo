document.addEventListener("productsLoaded", function () {
    const container = document.getElementById("products-container");

    const bestSellers = products.filter(product => product.category === "Best Sellers");

    bestSellers.forEach(product => {
        container.innerHTML += `
            <div class="card" data-id="${product.id}">
                <img src="${product.image}">
                <h3 class="product-info-details" data-id="${product.id}">${product.name}</h3>
                <p>${product.description}</p>
                <h4>रु.${product.price}</h4>
                <div class="action-area" id="action-area-${product.id}">
                    <button class="add-btn" data-id="${product.id}">Add to cart</button>
                </div>
            </div>
        `;
    });
     if (typeof cart !== "undefined") {
        cart.forEach(item => {
            if (typeof markAsAdded === "function") markAsAdded(item.id);
        });
    }
 
    container.addEventListener("click", function (e) {
        if (e.target.classList.contains("add-btn") && !e.target.disabled) {
            const id = Number(e.target.dataset.id);
            if (typeof addToCart === "function") addToCart(id);
            return;
        }

        if (e.target.classList.contains("product-info-details")){
            const id = e.target.dataset.id;
            window.location.href = `/pages/details/product-details.html?id=${id}`;
        }
    });
});