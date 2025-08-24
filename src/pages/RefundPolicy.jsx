import React from "react";
import { RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <RefreshCcw className="w-10 h-10 text-red-500" />
        <h1 className="text-3xl font-bold">Refund & Shipping Policy</h1>
      </div>

      <p className="mb-4">
        We follow a strict <b>No Return / No Refund</b> policy. Once an order is
        placed and confirmed, it cannot be cancelled, returned, or refunded
        under any circumstances.
      </p>

      <p className="mb-4">
        Please review your cart carefully before completing your purchase. If
        you have any questions about a product, feel free to contact our support
        team <b>before placing the order</b>.
      </p>

      <p className="mb-4">
        <b>Shipping Policy:</b> All products are processed and shipped within
        <b> 7 days</b> under normal circumstances. Delivery time may vary
        depending on your location and courier services.
      </p>

      <p className="mb-6">
        By placing an order on our website, you agree to this policy.
      </p>

      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-red-600 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default RefundPolicy;
