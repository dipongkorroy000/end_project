import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || loading) {
    return <div className="text-center py-10">Loading submissions...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Task ID</th>
                <th>Details</th>
                <th>Buyer Email</th>
                <th>Payable Amount</th>
                <th>Submitted At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{submission.taskId}</td>
                  <td>{submission.submission_details}</td>
                  <td>{submission.buyer_email}</td>
                  <td>${submission.payable_amount}</td>
                  <td>{new Date(submission.submission_at).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        submission.status === "pending"
                          ? "badge-warning"
                          : submission.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
