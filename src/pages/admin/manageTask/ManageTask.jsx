import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allTask");
      return res.data;
    },
  });

  const handleTaskDelete = async (taskId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/taskRemove/${taskId}`);
          if (res.data.deletedCount > 0) {
            toast.success("Task deleted successfully");
            refetch();
          }
        }
      });
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <h1 className="flex justify-center text-center bg-primary mx-auto w-fit px-5 py-1 font-semibold">Loading...</h1>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center font-bold text-2xl mb-5">Total Tasks: {tasks.length}</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Workers Needed</th>
              <th>Amount</th>
              <th>Total Payable</th>
              <th>Deadline</th>
              <th>Submission Info</th>
              <th>Buyer Email</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.task_title}</td>
                <td>{task.required_workers}</td>
                <td>${task.payable_amount}</td>
                <td>${task.total_payable}</td>
                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                <td>{task.submission_info}</td>
                <td>{task.buyer_email}</td>
                <td>{new Date(task.created_at).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      task.status === "completed"
                        ? "badge-success"
                        : task.status === "in-progress"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${task.payment_status === "paid" ? "badge-success" : "badge-error"}`}>
                    {task.payment_status}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleTaskDelete(task._id)} className="btn btn-error btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
