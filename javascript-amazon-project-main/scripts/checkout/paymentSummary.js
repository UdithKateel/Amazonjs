import { cart } from "../../data/cart.js";
import {
  deliveryoption,
  GetDeliveryOption,
} from "../../data/deliveryoptions.js";
import { products } from "../../data/products.js";
export function renderPaymentSummary() {
  let ProductPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const Product = products.find((cartItem) => cartItem.id === productId);
    const deliverryyy = GetDeliveryOption(cartItem.deliveryoptionId);
    shippingPriceCents += deliverryyy.priceCents;
    ProductPriceCents += Product.priceCents * cartItem.Quantity;
  });
  const beforetaxx = shippingPriceCents + ProductPriceCents;
  const taxx = beforetaxx / 10;
  const totallCost = beforetaxx + taxx;
  const paymentHTML = `
                     <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(
              ProductPriceCents / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(
              shippingPriceCents / 100
            ).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(beforetaxx / 100).toFixed(
              2
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxx / 100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totallCost / 100).toFixed(
              2
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
                    `;
  document.querySelector(".js-payment-summary").innerHTML = paymentHTML;
}
