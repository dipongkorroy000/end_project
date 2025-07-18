import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments-buyer?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <SnipPetLoading />;
  }

  // Separate payments
  const purchasePayments = payments.filter((p) => p.purchaseCoin);
  const taskPayments = payments.filter((p) => p.coin && p.taskId);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      {/* Task Payments Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-color">Task Payments</h3>
        {taskPayments.length === 0 ? (
          <p className="text-center">No task payments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task ID</th>
                  <th>Email</th>
                  <th>Amount (Coins)</th>
                  <th>Transaction ID</th>
                  <th>Payment Method</th>
                  <th>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {taskPayments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td className="font-mono">{payment.taskId}</td>
                    <td>{payment.email}</td>
                    <td>{payment.coin}</td>
                    <td className="font-mono text-sm">{payment.transactionId}</td>
                    <td>
                      {payment.paymentMethod.map((method, i) => (
                        <span key={i} className="badge badge-info mr-1">
                          {method}
                        </span>
                      ))}
                    </td>
                    <td>
                      {new Date(payment.payment_at).toLocaleDateString()}
                      <br />
                      <span className="text-xs">{new Date(payment.payment_at).toLocaleTimeString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Purchase Payments Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-color">Coin Purchase Payments</h3>
        {purchasePayments.length === 0 ? (
          <p className="text-center">No purchase payments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Amount (Coins)</th>
                  <th>Transaction ID</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {purchasePayments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.email}</td>
                    <td>{payment.purchaseCoin}</td>
                    <td className="font-mono text-sm">{payment.transactionId}</td>
                    <td>
                      {payment.paymentMethod.map((method, i) => (
                        <span key={i} className="badge badge-info mr-1">
                          {method}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
