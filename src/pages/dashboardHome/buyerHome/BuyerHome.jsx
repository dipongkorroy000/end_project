import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";

const BuyerHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: total = {} } = useQuery({
    queryKey: ["taskTotal", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/summary/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading) {
    return <SnipPetLoading></SnipPetLoading>
  }

  const { taskCount, totalWorkersPending, totalCoin } = total;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">📊 Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="shadow rounded p-4">
          <h3 className="text-lg font-medium">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{taskCount ?? 0}</p>
        </div>
        <div className="shadow rounded p-4">
          <h3 className="text-lg font-medium">Pending Workers</h3>
          <p className="text-3xl font-bold text-green-600">{totalWorkersPending ?? 0}</p>
        </div>
        <div className="shadow rounded p-4">
          <h3 className="text-lg font-medium">Payment Coins</h3>
          <p className="text-3xl font-bold text-yellow-600">{totalCoin ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
