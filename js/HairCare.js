document.addEventListener("productsLoaded", function(){
const container = document.getElementById("products-container");

// Only keep products where category is "Hair"
const hairProducts = products.filter(product => product.category === "Hair");

hairProducts.forEach(product => {
    container.innerHTML += `
        <div class="card" data-id="${product.id}">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <h4>रु.${product.price}</h4>
            <div class="action-area" id="action-area-${product.id}">
                <button class="add-btn">Add to cart</button>
            </div>
        </div>
    `;
});
});
