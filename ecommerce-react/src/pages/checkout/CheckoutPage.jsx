import dayjs from "dayjs";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
export function CheckoutPage({ cart }) {
  function formatMoney(cents){
    return(cents/100).toFixed(2);
  }
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const getCheckoutData = async () => {
      const deliveryResponse = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(deliveryResponse.data);

      const paymentResponse = await axios.get("/api/payment-summary");
      setPaymentSummary(paymentResponse.data);
    };

    getCheckoutData();
  }, []);
  return (
    <>
      <title>Checkout</title>
      <link
        rel="icon"
        type="image/svg+xml"
        href="images/favicons/cart-favicon.png"
      />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <CheckoutHeader />
        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>
          <PaymentSummary paymentSummary={paymentSummary} formatMoney={formatMoney}/>
        </div>
      </div>
    </>
  );
}
