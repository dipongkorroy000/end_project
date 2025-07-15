import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function AddNewTask() {
  const { user } = useAuth();
  const axiosUseSecure = useAxiosSecure();
  const [totalAmount, setTotalAmount] = useState(0);
  const [image, setImage] = useState(null);
  const [amountError, setAmountError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: userCoin = 0 } = useQuery({
    queryKey: ["userCoin", user.email],
    queryFn: async () => {
      const res = await axiosUseSecure.get(`/userFind?email=${user.email}`);
      return res.data.coin;
    },
    enabled: !!user?.email,
  });

  const onSubmit = async (data) => {
    const total = Number(data.required_workers) * Number(data.payable_amount);
    setTotalAmount(total);

    if (total > userCoin) {
      setAmountError(total - userCoin);
      return;
    } else {
      setAmountError(null);

      await axiosUseSecure.patch(`/userCoinUpdate?email=${user.email}`, { coin: userCoin - total, sumOrSub: true });
    }

    const taskPayload = await {
      ...data,
      buyer_email: user.email,
      task_image_url: image,
      required_workers: Number(data.required_workers),
      payable_amount: Number(data.payable_amount),
      total_payable: total,
      created_at: new Date(),
    };

    try {
      const res = await axiosUseSecure.post("/addTask", taskPayload);
      if (res.data?.taskId) {
        Swal.fire({
          icon: "success",
          title: "Task Added",
          text: "Your task has been successfully saved!",
        });
        reset();
        setTotalAmount(0);
      }
    } catch (error) {
      console.error("Error saving task:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Save Task",
        text: error.response?.data?.error || "Something went wrong. Please try again.",
      });
    }
  };

  const imageHandle = async (e) => {
    const photo = e.target.files[0];

    const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const response = await axios.post(imageUrl, formData);
      // console.log("Upload response:", response.data);
      const uploadedImageUrl = response.data.data.url;
      // console.log(uploadedImageUrl)
      setImage(uploadedImageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">Add New Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Title */}
        <div>
          <label className="font-medium">Task Title</label>
          <input
            type="text"
            {...register("task_title", { required: "Task title is required" })}
            placeholder="Enter task title"
            className="input input-bordered w-full"
          />
          {errors.task_title && <p className="text-red-500 text-sm">{errors.task_title.message}</p>}
        </div>

        {/* Task Detail */}
        <div>
          <label className="font-medium">Task Detail</label>
          <textarea
            {...register("task_detail", { required: "Task detail is required" })}
            placeholder="Describe the task"
            className="textarea textarea-bordered w-full"
          />
          {errors.task_detail && <p className="text-red-500 text-sm">{errors.task_detail.message}</p>}
        </div>

        {/* Required Workers */}
        <div>
          <label className="font-medium">Required Workers</label>
          <input
            type="number"
            {...register("required_workers", {
              required: "Required workers is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
            placeholder="e.g. 100"
            className="input input-bordered w-full"
          />
          {errors.required_workers && <p className="text-red-500 text-sm">{errors.required_workers.message}</p>}
        </div>

        {/* Payable Amount */}
        <div>
          <label className="font-medium">Payable Amount (per worker)</label>
          <input
            type="number"
            {...register("payable_amount", {
              required: "Payable amount is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
            placeholder="e.g. 10"
            className="input input-bordered w-full"
          />
          {errors.payable_amount && <p className="text-red-500 text-sm">{errors.payable_amount.message}</p>}
        </div>

        {/* Completion Date */}
        <div>
          <label className="font-medium">Completion Date</label>
          <input
            type="date"
            {...register("completion_date", { required: "Completion date is required" })}
            className="input input-bordered w-full"
          />
          {errors.completion_date && <p className="text-red-500 text-sm">{errors.completion_date.message}</p>}
        </div>

        {/* Submission Info */}
        <div>
          <label className="font-medium">Submission Info</label>
          <textarea
            {...register("submission_info")}
            placeholder="Instructions for submission"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Task Image URL */}
        <div>
          <label className="font-medium">Task Image URL</label>
          <input
            type="file"
            onChange={(e) => imageHandle(e)}
            className="w-full px-4 py-2 rounded border border-gray-300 input"
            required
          />
        </div>

        {/* Total Payable Amount Display */}
        <div className="text-lg font-semibold text-primary flex justify-between">
          <p>Total Payable Amount: {totalAmount > 0 ? `${totalAmount} coins` : "—"}</p>
          {amountError && <p className="text-red-500">You need : {amountError}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
          <FaPlusCircle /> Add Task
        </button>
      </form>
    </div>
  );
}

export default AddNewTask;
