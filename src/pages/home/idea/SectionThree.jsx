import React from "react";

const SectionThree = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">Security & Trust</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 text-center">
        <div>
          <div className="text-4xl text-primary mb-2">🔒</div>
          <h3 className="text-xl font-semibold">Secure Payments</h3>
          <p>Stripe-powered transactions ensure safety and reliability.</p>
        </div>
        <div>
          <div className="text-4xl text-primary mb-2">🧑‍⚖️</div>
          <h3 className="text-xl font-semibold">Role-Based Access</h3>
          <p>Only authorized users can access sensitive features and data.</p>
        </div>
        <div>
          <div className="text-4xl text-primary mb-2">🛡️</div>
          <h3 className="text-xl font-semibold">Admin Oversight</h3>
          <p>Reports and issues are handled swiftly to maintain platform integrity.</p>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
