let qtyValue = document.getElementById("qty-value");
let qtyMinus = document.getElementById("qty-minus");
let qtyPlus = document.getElementById("qty-plus");

let quantity = 1;

qtyPlus.addEventListener("click", function(){
    quantity = quantity + 1;
    qtyValue.textContent = quantity;
});

qtyMinus.addEventListener("click", function() {
    if(quantity > 1) {
    quantity = quantity - 1;
    qtyValue.textContent = quantity;
    }
});
