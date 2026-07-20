const products = [
    {
        id: 1,
        name: "Vitamin C 10% Face Serum",
        description: "Dullness, Spots & Loss of Elasticity",
        price: 299,
        image: "/src/assets/products/product0.jpg"
    },

    {
        id: 2,
        name: "Salicylic Acid + LHA Cleanser",
        description: "Acne, Breakouts & Oiiness",
        price: 270,
        image: "/src/assets/products/product1.jpg"
    },

    {
        id: 3,
        name: "SPF 50 Sunscreen",
        description: "Sun protection, UV exposure / damage",
        price: 360,
        image: "/src/assets/products/product2.png"
    },

    {
        id: 4,
        name: "Vitamin B5 Moisturizer",
        description: "Damaged Barrier, Oily & Dehydrated",
        price: 375,
        image: "/src/assets/products/product3.jpg"
    },

    {
        id: 5,
        name: "Niacinamide 10% Face Serum",
        description: "Acne Marks, Acne Prone & Oily Skin",
        price: 540,
        image: "/src/assets/products/product4.jpg"
    }

];

const container = document.getElementById("products-container");

for(let i = 0; i < products.length; i++){

    container.innerHTML += `
        <div class="card">

            <img src="${products[i].image}">

            <h3>${products[i].name}</h3>

            <p>${products[i].description}</p>

            <div class="icons">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            
            </div>
            
            <h4>रु.${products[i].price}</h4>

            <button> Add to cart </button>

        </div>
    `;

}