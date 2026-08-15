let products = [];

fetch("/data/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    document.dispatchEvent(new Event("productsLoaded"));
  })
  .catch((error) => {
    console.error("Failed to load products:", error);
  });
