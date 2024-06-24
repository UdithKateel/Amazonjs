import { cart, updatecartquantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryoption , GetDeliveryOption } from "../data/deliveryoptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


function updateCartDisplay() {
    const cartQuantityElement = document.querySelector('.js-cart-display-quantity');
    if (cartQuantityElement) {
        const cartContents = updatecartquantity();
        cartQuantityElement.innerText = cartContents;
    }
}

updateCartDisplay();

    let MyOrders=''
      
     cart.forEach((cartitem)=>{
        const productId = cartitem.productId;
    let matchingProduct = products.find((product) => product.id === productId);
     const deliveryoptionId = cartitem.deliveryoptionId;
    let selecteddeliveryoption = GetDeliveryOption(deliveryoptionId);
    const today = dayjs();
    const deliverydate = today.add(selecteddeliveryoption.deliveryDays, "days");
    const datestring = deliverydate.format("dddd, MMMM D");
        MyOrders+=`<div class="order-details-grid">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                 ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:  ${datestring}
              </div>
              <div class="product-quantity">
                Quantity:  ${
                      cartitem.Quantity
                    }
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>`
     })  
        
     ;


document.querySelector('.orders-grid').innerHTML=MyOrders
