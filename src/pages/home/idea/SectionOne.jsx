import React from "react";

const SectionOne = () => {
  return (
    // Example structure
    <div className="py-16">
      <h2 className="text-2xl font-bold text-center mb-10  text-color max-md:text-xl">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 max-md:text-lg">👷 Worker</h3>
          <p className="max-md:text-sm">Browse tasks → Submit work → Earn coins → Withdraw rewards</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 max-md:text-lg">💼 Buyer</h3>
          <p className="max-md:text-sm">Create tasks → Review submissions → Pay workers → Manage coins</p>
        </div>
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 max-md:text-lg">🛡️ Admin</h3>
          <p className="max-md:text-sm">Monitor activity → Resolve reports → Manage roles → Ensure integrity</p>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
