import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { products } from "../../data/products.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryoption } from "../../data/deliveryoptions.js";
export function renderorderSummary(){
let cartsummary = "";
cart.forEach((cartitem) => {
  const productId = cartitem.productId;
  let matchingProduct = products.find((product) => product.id === productId);

  const deliveryoptionId = cartitem.deliveryoptionId;
  let selecteddeliveryoption = deliveryoption.find((option) => option.id === deliveryoptionId);

  const today = dayjs();
  const deliverydate = today.add(selecteddeliveryoption.deliveryDays, "days");
  const datestring = deliverydate.format("dddd, MMMM D");
  cartsummary += `
      <div class="cart-item-container js-item-container-${matchingProduct.id}">
            <div class="delivery-date">
             ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryhtml(matchingProduct, cartitem)}
              </div>
            </div>
          </div>
    `;
});

function deliveryhtml(matchingProduct, cartitem) {
  let deliverysummary = "";
  deliveryoption.forEach((item) => {
    const today = dayjs();
    const deliverydate = today.add(item.deliveryDays, "days");
    const datestring = deliverydate.format("dddd, MMMM D");

    const priceString =
      item.priceCents === 0 ? "FREE" : `$${(item.priceCents / 100).toFixed(2)} - `;
    const ischecked = item.id === cartitem.deliveryoptionId;

    deliverysummary += `<div class="delivery-option js-delivery-option"
                        data-product-id="${matchingProduct.id}"
                        data-delivery-option-id="${item.id}">
                  <input type="radio"
                  ${ischecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`;
  });
  return deliverysummary;
}

document.querySelector(".js-order-summary").innerHTML = cartsummary;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(`.js-item-container-${productId}`);
    container.remove();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((prod) => {
  prod.addEventListener('click', () => {
    const productId = prod.dataset.productId;
    const deliveryoptionId = prod.dataset.deliveryOptionId;
    updateDeliveryOptions(productId, deliveryoptionId);
    renderorderSummary()
  });
});
}
