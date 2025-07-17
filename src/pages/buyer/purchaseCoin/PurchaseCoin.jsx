import React from "react";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router";

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const navigate = useNavigate();
  const handlePurchase = async (coins) => {
    navigate(`/dashboard/purchasePayment/${coins}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {coinPackages.map(({ coins, price }) => (
        <div
          key={coins}
          className="card bg-base-100 shadow-md hover:shadow-xl transition cursor-pointer border border-primary"
        >
          <div className="card-body items-center text-center">
            <FaCoins className="text-blue-500 text-5xl mb-2" />
            <h2 className="card-title">{coins} Coins</h2>
            <p className="text-lg font-bold ">${price}</p>
            {/* <button className="btn bg-primary mt-4">Purchase</button> */}
            <button
              onClick={() => handlePurchase(coins)}
              href="#_"
              className="inline-flex items-center w-full px-5 py-3 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
            >
              Purchase
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;
