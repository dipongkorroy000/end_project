import React from "react";

const Cart = ({ task }) => {
  return (
    <div className="border border-gray-300 rounded hover:shadow-lg p-4">
      <img src={task.task_image_url} alt={task.task_title} className="w-full h-40 object-cover rounded mb-2" />
      <h2 className="text-lg font-semibold">{task.task_title}</h2>
      <p className="text-sm text-gray-600">{task.task_detail}</p>
      <p><strong>Workers:</strong> {task.required_workers}</p>
      <p><strong>Pay/Worker:</strong> ${task.payable_amount}</p>
      <p><strong>Total Pay:</strong> ${task.total_payable}</p>
      <p><strong>Completion Date:</strong> {task.completion_date}</p>
      <p><strong>Status:</strong> {task.status}</p>
    </div>
  );
};

export default Cart;