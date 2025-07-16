import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["total"],
    queryFn: async () => {
      const res = await axiosSecure.get("/totalWorkerBuyerPayments");
      return res.data;
    },
  });

  if (isLoading) {
    return <SnipPetLoading />;
  }

  const { workerCount, buyerCount, totalCoin, paymentCount } = data;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">🛠 Admin Dashboard</h2>

      {isPending && <div className="text-sm text-gray-500">Refreshing data...</div>}

      <div className="grid border border-gray-500 rounded-xl p-2 grid-cols-1 md:grid-cols-4 gap-4">
        <div className="shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">👷‍♂️ Workers</h3>
          <p className="text-3xl font-bold text-blue-600">{workerCount ?? 0}</p>
        </div>
        <div className="shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">🧑‍💼 Buyers</h3>
          <p className="text-3xl font-bold text-green-600">{buyerCount ?? 0}</p>
        </div>
        <div className=" shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">💰 Total Coins</h3>
          <p className="text-3xl font-bold text-yellow-600">{totalCoin ?? 0}</p>
        </div>
        <div className=" shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">💳 Payments</h3>
          <p className="text-3xl font-bold text-purple-600">{paymentCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
