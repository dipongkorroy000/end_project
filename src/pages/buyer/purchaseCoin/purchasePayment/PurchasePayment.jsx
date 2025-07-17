import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PurchasePaymentForm from "./PurchasePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_pub_key);

const PurchasePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PurchasePaymentForm></PurchasePaymentForm>
    </Elements>
  );
};

export default PurchasePayment;
