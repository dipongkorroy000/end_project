import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <span className="loading loading-spinner text-primary scale-150"></span>
      <p className="mt-4 text-gray-500">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
