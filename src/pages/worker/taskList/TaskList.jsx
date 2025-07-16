import React from "react";
import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const TaskList = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });

  if (isLoading) {
    return <SnipPetLoading></SnipPetLoading>;
  }


  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Available Tasks</h1>

        {tasks.length === 0 ? (
          <p className="text-center text-xl">No available tasks found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-lg:mx-10">
            {tasks.map((task) => (
              <div key={task._id} className="card bg-base-100 shadow-xl flex">
                <figure>
                  {task.task_image_url && (
                    <img src={task.task_image_url} alt={task.task_title} className="w-full h-48 object-cover" />
                  )}
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{task.task_title}</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Buyer:</span> {task.buyer_email}
                    </p>
                    <p>
                      <span className="font-semibold">Deadline:</span>{" "}
                      {new Date(task.completion_date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Pay Rate:</span> ${task.payable_amount}/worker
                    </p>
                    <p>
                      <span className="font-semibold">Workers Needed:</span> {task.required_workers}
                    </p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button onClick={() => navigate(`/dashboard/taskDetails/${task._id}`)} className="btn bg-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     
    </>
  );
};

export default TaskList;
