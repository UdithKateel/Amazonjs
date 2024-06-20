export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}

function savetostorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addtocart(productId) {
  let matchingproduct;

  let itemquantityselect = parseInt(document.getElementById(`js-choice-of-quantity-${productId}`).value);
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingproduct = item;
    }
  });
  if (matchingproduct) {
    matchingproduct.Quantity += itemquantityselect;
  } else {
    cart.push({
      productId: productId,
      Quantity: itemquantityselect,
      deliveryoptionId: "1",
    });
  } 
  savetostorage();
}

export function updatecartquantity() {
  let cartcontents = 0;
  cart.forEach((item) => {
    cartcontents += item.Quantity;
  });
  savetostorage();
  return cartcontents; // Return the total cart contents
}
export function removeFromCart(productID) {
  let newCart = [];
  cart.forEach((cartitem) => {
    if (cartitem.productId !== productID) {
      newCart.push(cartitem);
    }
  });
  cart = newCart;
  savetostorage();
}
export function updateDeliveryOptions(productId, deliveryoptionId) {
  let matchingproduct;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingproduct = item;
    }
  });
  matchingproduct.deliveryoptionId = deliveryoptionId;
  savetostorage();
}
