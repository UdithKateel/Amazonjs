 export let cart =JSON.parse(localStorage.getItem('cart'))
 if(!cart){
    cart=[
    {
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        Quantity: 2,
        deliveryoptionId:'1'
    },
    {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        Quantity:3,
        deliveryoptionId:'2'
    }
 ]
 }
 
 function savetostorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}
 export function addtocart(productId) {
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
      deliveryoptionId:'1'
    });
  }
  savetostorage()
}

export function updatecartquantity() {
  let cartcontents = 0;
  cart.forEach((item) => {
    cartcontents += item.Quantity;
  });
  savetostorage()
  return cartcontents; // Return the total cart contents
}
export function removeFromCart(productID){
    let newCart=[]
    cart.forEach((cartitem)=>{
        if(cartitem.productId!==productID){
            newCart.push(cartitem)
        }
    })
    cart=newCart
    savetostorage()
}

