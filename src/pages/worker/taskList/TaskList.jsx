import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SnipPetLoading from "../../../components/Spinner/SnipPetLoading";
import { useNavigate } from "react-router";

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
                    <a
                      onClick={() => navigate(`/dashboard/taskDetails/${task._id}`)}
                      href="#_"
                      className="relative inline-flex items-center justify-start px-5 py-2.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                    >
                      <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                        View Details
                      </span>
                    </a>
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
