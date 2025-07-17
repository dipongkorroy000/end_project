import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, taskTotalCoin, loading } = useAuth();
  const { taskId } = useParams();
  const axiosUse = useAxios();
  const [errorState, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  if (loading) {
    return "...loading";
  }
  const coin = parseFloat(taskTotalCoin);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // step 1: validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    // step 2: create payment intent
    const amountInSens = await parseInt(coin * 100);
    const res = await axiosSecure.post("create-payment-intent", {
      amountInSens,
      taskId,
    });
    // step 3: confirm payment
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setError("");

        // step 4: mark parcel paid also create payment history
        const paymentData = {
          taskId,
          email: user.email,
          name: user.displayName,
          coin,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const res = await axiosUse.post("/payment", paymentData);

        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment successful",
            showConfirmButton: false,
            timer: 500,
          });

          navigate("/dashboard/myTasks");
        }
      }
    }

    if (error) {
      setError(error.message);
    } else {

      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement className="p-2 border rounded my-2"></CardElement>
        <button className="btn btn-primary w-full" type="submit" disabled={!stripe}>
          Pay
        </button>
        {errorState && <p className="text-red-500">{errorState}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
