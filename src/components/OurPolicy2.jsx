import React from "react";
import { Link } from "react-router-dom";
import { Shield, RefreshCcw, FileText } from "lucide-react";
import Title from "./Title";

const OurPolicy2 = () => {
  return (
    <div className="my-10 px-4">
      <div className="text-center text-3xl mb-8">
        <Title text1="Our" text2="Policies" />
      </div>

      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center py-10 text-xs sm:text-sm md:text-base text-gray-700">
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <RefreshCcw className="w-14 h-14 mx-auto mb-4 text-gray-700" />
          <p className="font-semibold text-lg">Refund Policy</p>
          <Link
            to="/refund-policy"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-500 hover:text-blue-600 hover:underline text-base"
          >
            View Refund Policy
          </Link>
        </div>
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <Shield className="w-14 h-14 mx-auto mb-4 text-gray-700" />
          <p className="font-semibold text-lg">Privacy Policy</p>
          <Link
            to="/policy"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-500 hover:text-green-600 hover:underline text-base"
          >
            View Privacy Policy
          </Link>
        </div>

        <div className="cursor-pointer hover:scale-105 transition-transform">
          <FileText className="w-14 h-14 mx-auto mb-4 text-gray-700" />
          <p className="font-semibold text-lg">Terms & Conditions</p>
          <Link
            to="/terms-conditions"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-500 hover:text-purple-600 hover:underline text-base"
          >
            View Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy2;
