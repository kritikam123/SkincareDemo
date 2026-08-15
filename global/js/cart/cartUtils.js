function getAllCarts() {
  let data = localStorage.getItem("carts");
  if (data === null) {
    return {};
  }
  return JSON.parse(data);
}

function getUserCart(email) {
  let allCarts = getAllCarts();
  if (allCarts[email] === undefined) {
    return [];
  }
  return allCarts[email];
}

function saveUserCart(email, cartArray) {
  let allCarts = getAllCarts();
  allCarts[email] = cartArray;
  localStorage.setItem("carts", JSON.stringify(allCarts));
}
