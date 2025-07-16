import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";

const TaskDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Fetch task details
  const { data: task = {}, isLoading: taskLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosSecure(`/taskFind/${id}`);
      return res.data;
    },
  });

  // Handle submission
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/taskSubmission", formData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Success", "Submission sent successfully.", "success");
      reset();
    },
    onError: (error) => {
      Swal.fire("❌ Error", `${error.response.data.message}`, "error");
    },
  });

  const onSubmit = (data) => {
    const submissionInfo = {
      ...data,
      taskId: task._id,
      buyer_email: task.buyer_email,
      buyer_name: task.buyer_name,
      payable_amount: task.payable_amount,
      submission_at: new Date().toISOString(),
      worker_name: user?.displayName,
      worker_email: user?.email,
      status: "pending",
    };

    mutation.mutate(submissionInfo);
  };

  if (taskLoading || authLoading) return <SnipPetLoading />;

  return (
    <div className="card mx-auto shadow-xl 2xl:mx-72 xl:mx-56 lg:mx-24 max-md:w-full">
      <div className="card-body bg-base-100">
        <h2 className="card-title text-2xl font-bold">{task.task_title}</h2>

        {/* Meta Info */}
        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="badge badge-secondary">{task.payment_status}</span>
        </div>

        {/* Task Info */}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Buyer:</strong> {task.buyer_email}
          </p>
          <p>
            <strong>Description:</strong> {task.task_detail}
          </p>
          <p>
            <strong>Submission Info:</strong> {task.submission_info}
          </p>

          <div className="divider my-2"></div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Workers Needed:</strong> {task.required_workers}
            </div>
            <div>
              <strong>Pay Rate:</strong> ${task.payable_amount}/worker
            </div>
            <div>
              <strong>Total Payable:</strong> ${task.total_payable}
            </div>
            <div>
              <strong>Deadline:</strong> {new Date(task.completion_date).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-500 mt-3">
          <p>Posted: {new Date(task.created_at).toLocaleString()}</p>
          {task.paid_at && <p>Paid: {new Date(task.paid_at).toLocaleString()}</p>}
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Submit Your Task</h3>

          <textarea
            {...register("submission_details", { required: true })}
            rows={5}
            className="w-full border px-3 py-2 rounded"
            placeholder="Describe your work..."
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
