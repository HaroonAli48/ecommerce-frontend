import React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-10 h-10 text-green-500" />
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </div>
      <p className="mb-4">
        Your privacy is very important to us. We only collect information
        necessary to provide our services and improve your shopping experience.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>We do not sell or share your personal data.</li>
        <li>Cookies are used to improve site performance.</li>
        <li>Your payment information is securely encrypted.</li>
      </ul>
      <p className="mb-6">
        By using our site, you agree to our privacy practices.
      </p>
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
};

export default Policy;
