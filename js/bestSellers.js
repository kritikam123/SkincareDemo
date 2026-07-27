document.addEventListener("productsLoaded", function () {
    const container = document.getElementById("products-container");

    const bestSellers = products.filter(product => product.category === "Best Sellers");

    bestSellers.forEach(product => {
        container.innerHTML += `
            <div class="card" data-id="${product.id}">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <h4>रु.${product.price}</h4>
                <div class="action-area" id="action-area-${product.id}">
                    <button class="add-btn" data-id="${product.id}">Add to cart</button>
                </div>
            </div>
        `;
    });
});