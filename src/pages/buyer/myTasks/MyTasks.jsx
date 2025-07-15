import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PageSpinner from "../../../components/Spinner/PageSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosUse = useAxiosSecure();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosUse(`/allTasks?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <PageSpinner></PageSpinner>;
  }

  const sortedTasks = [...tasks].sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date));

  const handleEditClick = (task) => {
    setEditingId(task._id);
    setFormData({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleUpdateSubmit = async (taskId) => {
    await axiosUse.patch(`/taskUpdate/${taskId}`, formData);
    setEditingId(null);
    setFormData({});
    refetch();
  };

  const handleDelete = async (task) => {
    const refillAmount = task.required_workers * task.payable_amount;

    if (task.status !== "completed") {
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
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          await axiosUse.patch(`/userCoinUpdate?email=${user?.email}`, {
            coin: refillAmount,
            sumOrSub: false,
          });
          await axiosUse.delete(`/taskDelete/${task._id}`);
          refetch();
        }
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <table className="table-auto w-full border border-gray-400">
        <thead className="">
          <tr>
            <th className="p-2 border border-gray-400 text-color">Image</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Title</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Detail</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Submission Info</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Workers</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Pay/Worker</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Total Pay</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Completion Date</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Status</th>
            <th className="p-2 border border-gray-400 min-w-36 text-color">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task._id}>
              <td className="p-1 border border-gray-400">
                <img src={task.task_image_url} alt="task" className="w-16 h-16 object-cover rounded" />
              </td>

              {/* Editable fields */}
              <td className="p-2 border border-gray-400">
                {editingId === task._id ? (
                  <input
                    type="text"
                    value={formData.task_title}
                    onChange={(e) => setFormData({ ...formData, task_title: e.target.value })}
                    className="w-full p-1 border-none rounded"
                  />
                ) : (
                  task.task_title
                )}
              </td>
              <td className="p-2 border border-gray-400">
                {editingId === task._id ? (
                  <textarea
                    value={formData.task_detail}
                    onChange={(e) => setFormData({ ...formData, task_detail: e.target.value })}
                    className="w-full p-1 border-none rounded"
                  />
                ) : (
                  task.task_detail
                )}
              </td>
              <td className="p-2 border border-gray-400">
                {editingId === task._id ? (
                  <textarea
                    value={formData.submission_info}
                    onChange={(e) => setFormData({ ...formData, submission_info: e.target.value })}
                    className="w-full border-none rounded"
                  />
                ) : (
                  task.submission_info
                )}
              </td>

              {/* Static fields */}
              <td className="p-2 border border-gray-400 text-center">{task.required_workers}</td>
              <td className="p-2 border border-gray-400 text-center">${task.payable_amount}</td>
              <td className="p-2 border border-gray-400 text-center">${task.total_payable}</td>
              <td className="p-2 border border-gray-400 text-center">{task.completion_date}</td>
              <td className="p-2 border border-gray-400 text-center">{task.status}</td>

              {/* Action buttons */}
              <td className="p-2 border border-gray-400 space-x-2">
                {editingId === task._id ? (
                  <>
                    <button
                      onClick={() => handleUpdateSubmit(task._id)}
                      className="px-2 py-1 bg-blue-500 rounded cursor-pointer"
                    >
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="px-2 py-1 rounded cursor-pointer">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="px-2 py-1 bg-yellow-500 rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task)} className="px-2 py-1 bg-red-500 rounded cursor-pointer">
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTasks;
