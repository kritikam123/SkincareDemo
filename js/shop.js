const products = [
    {
        id: 1,
        category: "Bath & Body",
        link: "/views/skinCarePage.html",
        image: "/src/assets/products/product0.jpg"
    },

    {
        id: 2,
        category: "Skin",
        link: "/views/skinCarePage.html",
        image: "/src/assets/products/product1.jpg"
    },

    {
        id: 3,
        category: "Hair",
        link: "/views/hairCarePage.html",
        image: "/src/assets/products/product2.png"
    },

    {
        id: 4,
        category: "Best Sellers",
        link: "/views/collectionPage.html",
        image: "/src/assets/products/product4.jpg"
    },

    {
        id: 5,
        category: "New Launches",
        link: "/views/newLaunches.html",
        image: "/src/assets/products/product8.png"
    },

    {
        id: 6,
        category: "All Products",
        link: "/views/allProducts.html",
        image: "/src/assets/products/product9.png"   
    }
];

const container = document.getElementById("shop-layout");

for(let i = 0; i < products.length; i++){

    container.innerHTML += `
        <a class="card" href="${products[i].link}" data-id="${products[i].id}">

            <img src="${products[i].image}">

            <p>${products[i].category}</p>

        </a>
    `;

}
