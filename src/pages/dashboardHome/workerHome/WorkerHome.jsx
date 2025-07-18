import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";

const WorkerHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: total = {}, isLoading } = useQuery({
    queryKey: ["total", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/countableSubmissions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  if (isLoading || loading) {
    return <SnipPetLoading />;
  }

  const { total_submissions, totalPending, approvedSubmissions = [], rejectedSubmissions } = total;

  // ✅ Calculate total earnings
  const totalEarnings = approvedSubmissions.reduce((sum, item) => sum + (item.payable_amount || 0), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* ✅ Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-200 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl max-md:text-lg font-semibold">Total Submissions</h3>
          <p className="text-3xl max-md:text-2xl font-bold text-primary">{total_submissions}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl max-md:text-lg font-semibold">Pending Submissions</h3>
          <p className="text-3xl max-md:text-2xl font-bold text-error">{totalPending}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl max-md:text-lg font-semibold">Total Earnings</h3>
          <p className="text-3xl max-md:text-2xl font-bold text-success">${totalEarnings}</p>
        </div>
      </div>

      {/* ✅ Approved Submissions Table */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl max-md:text-xl font-bold mb-4 text-blue-500">Approved Submissions</h2>
        {approvedSubmissions.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Task ID</th>
                <th>Buyer Email</th>
                <th>Details</th>
                <th>Payable ($)</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions.map((submission, index) => (
                <tr key={submission._id}>
                  <td>{index + 1}</td>
                  <td>{submission.taskId}</td>
                  <td>{submission.buyer_email}</td>
                  <td>{submission.submission_details}</td>
                  <td>${submission.payable_amount}</td>
                  <td>{new Date(submission.submission_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No approved submissions found.</p>
        )}
      </div>

      {/* Rejected Submissions Table */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl max-md:text-xl font-bold mb-4 text-red-500">Rejected Submissions</h2>
        {rejectedSubmissions.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Task ID</th>
                <th>Buyer Email</th>
                <th>Details</th>
                <th>Payable ($)</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {rejectedSubmissions.map((submission, index) => (
                <tr key={submission._id}>
                  <td>{index + 1}</td>
                  <td>{submission.taskId}</td>
                  <td>{submission.buyer_email}</td>
                  <td>{submission.submission_details}</td>
                  <td>${submission.payable_amount}</td>
                  <td>{new Date(submission.submission_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No rejected submissions found.</p>
        )}
      </div>

      <div></div>
    </div>
  );
};

export default WorkerHome;
