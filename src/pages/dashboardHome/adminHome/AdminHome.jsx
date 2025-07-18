import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";
import Swal from "sweetalert2";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    isLoading,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["total"],
    queryFn: async () => {
      const res = await axiosSecure.get("/totalWorkerBuyerPayments");
      return res.data;
    },
  });

  const handleApproved = async (worker_email, withdrawal_coin, _id) => {
    try {
      const res = await axiosSecure.patch(`/updateWorkerCoin?email=${worker_email}`, { withdrawal_coin });

      if (res.status === 200) {
        await axiosSecure
          .patch(`/updateWithdrawStatus/${_id}`, {
            status: "approved",
          })
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Success", "Withdrawal approved!", "success");
            }
            refetch();
          });
      } else {
        Swal.fire("Error", "Approval failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", `Server error ${error}`, "error");
    }
  };

  if (isLoading) {
    return <SnipPetLoading />;
  }

  const { workerCount, buyerCount, totalCoin, paymentCount, pendingWithdrawals = [] } = data;

  return (
    <div className="p-6 space-y-6">
      <h2 className=" font-semibold text-xl">🛠 Admin Dashboard</h2>

      {isPending && <div className="text-sm text-gray-500">Refreshing data...</div>}

      {/* ✅ Summary Cards */}
      <div className="grid border border-gray-600 rounded-xl p-2 grid-cols-1 md:grid-cols-4 gap-4">
        <div className="shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">👷‍♂️ Workers</h3>
          <p className="text-2xl max-md:text-xl font-bold text-blue-600">{workerCount ?? 0}</p>
        </div>
        <div className="shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">🧑‍💼 Buyers</h3>
          <p className="text-2xl max-md:text-xl font-bold text-green-600">{buyerCount ?? 0}</p>
        </div>
        <div className="shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">💰 Total Coins</h3>
          <p className="text-2xl max-md:text-xl font-bold text-yellow-600">{totalCoin ?? 0}</p>
        </div>
        <div className="shadow rounded p-4 text-center">
          <h3 className="text-lg font-medium">💳 Payments</h3>
          <p className="text-2xl max-md:text-xl font-bold text-purple-600">{paymentCount ?? 0}</p>
        </div>
      </div>

      {/* ✅ Pending Withdrawals Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">🕒 Pending Withdrawals</h3>
        {pendingWithdrawals.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Worker</th>
                <th>Email</th>
                <th>Coin</th>
                <th>Amount ($)</th>
                <th>Pay of</th>
                <th>Account</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingWithdrawals.map((withdrawal, index) => (
                <tr key={withdrawal._id}>
                  <td>{index + 1}</td>
                  <td>{withdrawal.worker_name}</td>
                  <td>{withdrawal.worker_email}</td>
                  <td>{withdrawal.withdrawal_coin}</td>
                  <td>${withdrawal.withdrawal_amount}</td>
                  <td>{withdrawal.payment_system}</td>
                  <td>{withdrawal.account_number}</td>
                  <td className="min-w-28">{new Date(withdrawal.withdraw_date).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${withdrawal.status === "approved" ? "badge-success" : "badge-warning"}`}>
                      {withdrawal.status}
                    </span>
                  </td>
                  <td>
                    {withdrawal.status === "pending" ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          handleApproved(withdrawal.worker_email, withdrawal.withdrawal_coin, withdrawal._id)
                        }
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No pending withdrawals found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
