import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";
import Swal from "sweetalert2";

const BuyerHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const {
    data: total = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["taskTotal", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyerHome?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { taskCount, totalWorkersPending, totalCoin, submission = [] } = total;

  const handleStatusChange = async (submissionId, worker_email, taskId, amount, status) => {
    try {
      const res = await axiosSecure.patch(`/submissionStatusUpdate/${submissionId}`, {
        status,
        worker_email,
        amount,
        taskId,
      });

      if (res.data.success) {
        Swal.fire("Success", `Submission ${status}`, "success");
        refetch();
      } else {
        Swal.fire("Error", res.data.message || "Failed to update status", "error");
      }
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    document.getElementById("submission_modal").showModal();
  };

  if (loading || isLoading) {
    return <SnipPetLoading />;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">📊 Dashboard</h2>

      {/* ✅ Summary Cards */}
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

      {/* ✅ Submission Table */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">📝 Submissions</h3>
        {submission.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Worker</th>
                <th>Email</th>
                <th>Payable ($)</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submission.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.task_title}</td>
                  <td>{item.worker_name}</td>
                  <td>{item.worker_email}</td>
                  <td>${item.payable_amount}</td>
                  <td>{new Date(item.submission_at).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "approved"
                          ? "badge-success"
                          : item.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="space-x-2 min-w-72 border">
                    <button className="btn btn-sm btn-info" onClick={() => openModal(item)}>
                      View Details
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() =>
                        handleStatusChange(item._id, item.worker_email, item.taskId, item.payable_amount, "approved")
                      }
                      disabled={item.status !== "pending"}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() =>
                        handleStatusChange(item._id, item.worker_email, item.taskId, item.payable_amount, "rejected")
                      }
                      disabled={item.status !== "pending"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No submissions found.</p>
        )}
      </div>

      {/* ✅ Modal for Submission Details */}
      <dialog id="submission_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Submission Details</h3>
          <p className="py-4 whitespace-pre-wrap">
            {selectedSubmission?.submission_details || "No details available."}
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default BuyerHome;
