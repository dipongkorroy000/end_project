import React from "react";

const SectionTwo = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">Featured Tasks</h2>
      <div className="grid grid-cols-2 gap-6 px-4">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title">For new buyer</h3>
            <p>Earn 50 coins by submitting a detailed review.</p>
            <div className="badge badge-success mt-2">High Reward</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title">For new worker</h3>
            <p>Earn 10 coins by submitting a detailed review.</p>
            <div className="badge badge-success mt-2">High Reward</div>
          </div>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default SectionTwo;
