import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["submissions", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const submissions = data?.submissions || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  if (isLoading || loading) {
    return <div className="text-center py-10">Loading submissions...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500">No submissions found.</p>
      ) : (
        <>
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
                    <td>{(page - 1) * limit + index + 1}</td>
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MySubmissions;