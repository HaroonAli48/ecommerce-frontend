import React from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-10 h-10 text-purple-500" />
        <h1 className="text-3xl font-bold">Terms & Conditions</h1>
      </div>

      <p className="mb-4">
        By accessing and using our website, you agree to comply with the
        following terms and conditions:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>
          All purchases are final. <b>No refunds or returns</b> are available
          once an order is placed.
        </li>
        <li>
          Products will be shipped within <b>7 days</b> under normal
          circumstances. Delivery time may vary depending on your location and
          courier services.
        </li>
        <li>
          Prices and product availability are subject to change without prior
          notice.
        </li>
        <li>
          Unauthorized use, reproduction, or distribution of our content is
          strictly prohibited.
        </li>
        <li>
          By placing an order, you agree to these terms and our refund/shipping
          policies.
        </li>
      </ul>

      <p className="mb-6">
        Please review these terms carefully before making a purchase. If you
        have any questions, contact our support team.
      </p>

      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-purple-600 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default TermsConditions;
