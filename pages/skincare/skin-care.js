document.addEventListener("productsLoaded", function()
{
    const container = document.getElementById("products-container");

const skinProducts = products.filter(product => product.category === "Skin");

skinProducts.forEach(product => {
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

//show "added" right away for items already in the cart
if(typeof cart !== "undefined") {
    cart.forEach(item => {
        if (typeof markAsAdded === "function") markAsAdded(item.id);
    });
}

container.addEventListener("click", function(e){
    if(e.target.classList.contains("add-btn") && !e.target.disabled){
        const id = Number(e.target.dataset.id);
        if(typeof addToCart === "function") addToCart(id);
    }
});

});

