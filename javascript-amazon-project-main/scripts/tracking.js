import { cart ,updatecartquantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryoption, GetDeliveryOption } from "../data/deliveryoptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


function updatetrackingCartDisplay() {
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
        const cartContents = updatecartquantity();
        cartQuantityElement.innerText = cartContents;
    }
}

updatetrackingCartDisplay();

// document.querySelectorAll()

// <a class="back-to-orders-link link-primary" href="orders.html">
//           View all orders
//         </a>

//         <div class="delivery-date">
//           Arriving on Monday, June 13
//         </div>

//         <div class="product-info">
//           Black and Gray Athletic Cotton Socks - 6 Pairs
//         </div>

//         <div class="product-info">
//           Quantity: 1
//         </div>

//         <img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg">

//         <div class="progress-labels-container">
//           <div class="progress-label">
//             Preparing
//           </div>
//           <div class="progress-label current-status">
//             Shipped
//           </div>
//           <div class="progress-label">
//             Delivered
//           </div>
//         </div>

//         <div class="progress-bar-container">
//           <div class="progress-bar"></div>
//         </div>
// tracking.js


document.addEventListener('DOMContentLoaded', () => {
  const trackingProduct = JSON.parse(localStorage.getItem('trackingProduct'));
  if (trackingProduct) {
    const matchingProduct = products.find(product => product.id === trackingProduct.productId);
    const selectedDeliveryOption = GetDeliveryOption(trackingProduct.deliveryoptionId);
    const today = dayjs(); // Using today's date as the order date
    const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    document.querySelector('.js-delivery-date').innerText = `Arriving on: ${dateString}`;
    document.querySelector('.js-product-info').innerText = matchingProduct.name;
    document.querySelector('.js-product-quantity').innerText = `Quantity: ${trackingProduct.Quantity}`;
    document.querySelector('.js-product-image').src = matchingProduct.image;

    // Calculate progress
    const totalDays = selectedDeliveryOption.deliveryDays;
    const elapsedDays = today.diff(today, 'day'); // Always zero, assuming the tracking starts from today
    const progress = Math.min((elapsedDays / totalDays) * 100, 100);
    const minProgress = 5; // Minimum progress percentage to ensure the bar is never empty

    // Update progress bar
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${Math.max(progress, minProgress)}%`;
    progressBar.style.transition = 'width 1s ease-in-out';
  }
});