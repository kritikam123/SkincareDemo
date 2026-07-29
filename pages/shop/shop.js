const shopCategories = [
    {
        id: 1,
        category: "Bath & Body",
        link: "/pages/skincare/skin-care.html",
        image: "/assets/products/product0.jpg"
    },

    {
        id: 2,
        category: "Skin",
        link: "/pages/skincare/skin-care.html",
        image: "/assets/products/product1.jpg"
    },

    {
        id: 3,
        category: "Hair",
        link: "/pages/haircare/hair-care.html",
        image: "/assets/products/product2.png"
    },

    {
        id: 4,
        category: "Best Sellers",
        link: "/pages/best-sellers/best-sellers.html",
        image: "/assets/products/product4.jpg"
    },

    {
        id: 5,
        category: "New Launches",
        link: "/pages/new-launches/new-launches.html",
        image: "/assets/products/product8.png"
    },

    {
        id: 6,
        category: "All Products",
        link: "/pages/all-products/all-products.html",
        image: "/assets/products/product9.png"
    }
];

const container = document.getElementById("shop-layout");

for (let i = 0; i < shopCategories.length; i++) {

    container.innerHTML += `
        <a class="card" href="${shopCategories[i].link}" data-id="${shopCategories[i].id}">

            <img src="${shopCategories[i].image}">

            <p>${shopCategories[i].category}</p>

        </a>
    `;

}