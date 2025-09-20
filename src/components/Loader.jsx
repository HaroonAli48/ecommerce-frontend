import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin"></div>

        <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-xl shadow-purple-500/40"></div>
      </div>
    </div>
  );
};

export default Loader;
