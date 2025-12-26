import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <p className="text-gray-400 mt-3">
          Choose the plan that fits your needs
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-14 grid gap-8 max-w-6xl mx-auto md:grid-cols-3">
        {/* Basic Plan */}
        <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950 hover:border-white transition">
          <h2 className="text-xl font-semibold">Basic</h2>
          <p className="text-gray-400 mt-2">For individuals</p>

          <p className="text-4xl font-bold mt-6">
            ₹0 <span className="text-sm text-gray-400">/month</span>
          </p>

          <ul className="mt-6 space-y-3 text-gray-300 text-sm">
            <li>✔ Limited Access</li>
            <li>✔ Basic Support</li>
            <li>✔ Community Help</li>
          </ul>

          <button className="mt-8 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition">
            Get Started
          </button>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div className="border border-white rounded-2xl p-8 bg-gray-900 scale-105 shadow-xl">
          <span className="text-xs bg-white text-black px-3 py-1 rounded-full">
            Most Popular
          </span>

          <h2 className="text-xl font-semibold mt-4">Pro</h2>
          <p className="text-gray-300 mt-2">For professionals</p>

          <p className="text-4xl font-bold mt-6">
            ₹999 <span className="text-sm text-gray-400">/month</span>
          </p>

          <ul className="mt-6 space-y-3 text-gray-200 text-sm">
            <li>✔ Full Access</li>
            <li>✔ Priority Support</li>
            <li>✔ Advanced Tools</li>
            <li>✔ Daily Updates</li>
          </ul>

          <button className="mt-8 w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition">
            Upgrade Now
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="border border-gray-800 rounded-2xl p-8 bg-gray-950 hover:border-white transition">
          <h2 className="text-xl font-semibold">Enterprise</h2>
          <p className="text-gray-400 mt-2">For organizations</p>

          <p className="text-4xl font-bold mt-6">Custom</p>

          <ul className="mt-6 space-y-3 text-gray-300 text-sm">
            <li>✔ Unlimited Access</li>
            <li>✔ Dedicated Support</li>
            <li>✔ Custom Features</li>
            <li>✔ Team Management</li>
          </ul>

          <button className="mt-8 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition">
            Contact Us
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-500 text-sm mt-16">
        © 2025 Raipura. Secure payments & transparent pricing.
      </p>
    </div>
  );
};

export default Pricing;
