let products = [];

fetch("/data/products.json")
.then(response => response.json())
.then(data => {
    products = data;
    //tell others that product is ready to use
    document.dispatchEvent(new Event("productsLoaded"));
})
.catch(error => {
    console.error("Failed to load products:", error);
});