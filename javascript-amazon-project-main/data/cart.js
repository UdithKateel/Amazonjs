 const cart =[]
 function addtocart(productId) {
  let matchingproduct;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingproduct = item;
    }
  });
  if (matchingproduct) {
    matchingproduct.Quantity += 1;
  } else {
    cart.push({
      productId: productId,
      Quantity: 1,
    });
  }
}
let cartcontents = 0;
function updatecartquantity() {
  cart.forEach((item) => {
    cartcontents += item.Quantity;
  });
}
