import React from "react";

const SectionThree = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center mb-5  text-color max-md:text-xl">Security & Trust</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 text-center">
        <div>
          <div className="text-4xl text-primary mb-2 max-md:text-xl">🔒</div>
          <h3 className="text-xl font-semibold max-md:text-lg">Secure Payments</h3>
          <p className="max-md:text-sm">Stripe-powered transactions ensure safety and reliability.</p>
        </div>
        <div>
          <div className="text-4xl text-primary mb-2 max-md:text-xl">🧑‍⚖️</div>
          <h3 className="text-xl font-semibold max-md:text-lg">Role-Based Access</h3>
          <p className="max-md:text-sm">Only authorized users can access sensitive features and data.</p>
        </div>
        <div>
          <div className="text-4xl text-primary mb-2 max-md:text-xl">🛡️</div>
          <h3 className="text-xl font-semibold max-md:text-lg">Admin Oversight</h3>
          <p className="max-md:text-sm">Reports and issues are handled swiftly to maintain platform integrity.</p>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
