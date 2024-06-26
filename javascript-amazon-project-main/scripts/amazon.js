import { cart,addtocart,updatecartquantity } from "../data/cart.js";
import { products } from "../data/products.js";
function loadCartQuantity() {
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    const cartQuantity = updatecartquantity();
    cartQuantityElement.innerText = cartQuantity;
  }
}
let productsHTML = "";
products.forEach((product) => {
  productsHTML += ` 
                            <div class="product-container">
                            <div class="product-image-container">
                                <img class="product-image"
                                src=${product.image}>
                            </div>

                            <div class="product-name limit-text-to-2-lines">
                                ${product.name}
                            </div>

                            <div class="product-rating-container">
                                <img class="product-rating-stars"
                                src="images/ratings/rating-${
                                  product.rating.stars * 10
                                }.png">
                                <div class="product-rating-count link-primary">
                                ${product.rating.count}
                                </div>
                            </div>

                            <div class="product-price">
                                $${(product.priceCents / 100).toFixed(2)}
                            </div>

                            <div class="product-quantity-container">
                                <select id="js-choice-of-quantity-${product.id}">
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                </select>
                            </div>

                            <div class="product-spacer"></div>

                            <div class="added-to-cart ">
                                <img src="images/icons/checkmark.png">
                                Added
                            </div>

                            <button class="add-to-cart-button button-primary js-add-to-cart"
                            data-product-id="${product.id}">
                                Add to Cart
                            </button>
                            
                            </div>`;
});

document.querySelector(".products-grid").innerHTML = productsHTML;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // Find the corresponding .added-to-cart message for the clicked button
    let productContainer = button.closest('.product-container');
    let hidden = productContainer.querySelector('.added-to-cart');
    
    // Show the "Added to Cart" message
    hidden.style.opacity = '100';

    // Set a timeout to hide the message after 3 seconds (3000 milliseconds)
    setTimeout(function() {
      hidden.style.display = 'none';
    }, 3000); // 3000 ms = 3 seconds

    // Get the productId from the button's data attribute
    const productId = button.dataset.productId;

    // Call functions to add the product to cart and update cart quantity
    addtocart(productId);
    let cartcontents = updatecartquantity();
    
    // Update the cart quantity displayed
    document.querySelector(".js-cart-quantity").innerText = cartcontents;

    // Log the cart object to console for debugging
    console.log(cart);
  });
});
loadCartQuantity()