import React from "react";
import { FaCoins } from "react-icons/fa";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("your-stripe-publishable-key"); // Replace with your actual key

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const handlePurchase = async (price, coins) => {
    // const stripe = await stripePromise;

    // const response = await fetch("/create-checkout-session", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ price, coins }),
    // });

    // const session = await response.json();

    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });

    // if (result.error) {
    //   console.error(result.error.message);
    // }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {coinPackages.map(({ coins, price }) => (
        <div
          key={coins}
          className="card bg-base-100 shadow-md hover:shadow-xl transition cursor-pointer border border-primary"
          onClick={() => handlePurchase(price, coins)}
        >
          <div className="card-body items-center text-center">
            <FaCoins className="text-blue-500 text-5xl mb-2" />
            <h2 className="card-title">{coins} Coins</h2>
            <p className="text-lg font-bold ">${price}</p>
            <button className="btn bg-primary mt-4">Purchase</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;
