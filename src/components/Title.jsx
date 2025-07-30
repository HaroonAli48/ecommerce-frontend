import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="text-center mb-10">
      <h2 className="text-xl sm:text-3xl font-bold text-gray-800 tracking-wide">
        <span className="text-gray-400">{text1} </span>
        <span className="text-black decoration-cyan-400 underline-offset-4">
          {text2}
        </span>
      </h2>

      <div className="mt-3 flex justify-center">
        <div className="h-1 w-16 bg-cyan-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Title;
