 export const cart =[
    {
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        Quantity: 2
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        Quantity:3
    }
 ]
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
