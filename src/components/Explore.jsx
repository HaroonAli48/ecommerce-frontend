import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl md:text-3xl font-bold mb-3 text-gray-800">
        EXPLORE OTHER COLLECTIONS
      </h2>
      <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="group relative h-[595px] overflow-hidden rounded-lg shadow-md">
          <img
            src="https://res.cloudinary.com/dsqrvypib/image/upload/v1749009705/ynax0w23tgb6awjhu00f.jpg"
            alt="Formal Wear"
            className="w-full h-full object-cover cursor-pointer group-hover:scale-110 duration-500"
          />
          <Link to={'/collection'} className="absolute active:scale-95 bottom-5 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition">
            Formal Wear
          </Link>
        </div>

        <div className="flex flex-col gap-6 justify-between">

          <div className="grid grid-cols-2 gap-2">
            
              <div
                className="h-[150px] overflow-hidden rounded-lg shadow-sm group"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKQs1j7i7jkPjEeSR0c7wgkDfv2m6AxY17g&s"
                  className="w-full h-full object-cover group-hover:scale-110 duration-500 cursor-pointer"
                  alt=""
                />
              </div>
              <div
                className="h-[150px] overflow-hidden rounded-lg shadow-sm group"
              >
                <img
                  src="https://zaroon.pk/cdn/shop/files/DSC08310_1024x1024@2x.jpg?v=1723201669"
                  className="w-full h-full object-cover group-hover:scale-110 duration-500 cursor-pointer"
                  alt=""
                />
              </div>
              <div
                className="h-[150px] overflow-hidden rounded-lg shadow-sm group"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYn5PCrNOfrRsXAR66KSKJib3552TS3E5xw&s"
                  className="w-full h-full object-cover group-hover:scale-110 duration-500 cursor-pointer"
                  alt=""
                />
              </div>
              <div
                className="h-[150px] overflow-hidden rounded-lg shadow-sm group"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEKQs1j7i7jkPjEeSR0c7wgkDfv2m6AxY17g&s"
                  className="w-full h-full object-cover group-hover:scale-110 duration-500 cursor-pointer"
                  alt=""
                />
              </div>
          </div>
          <Link to={'/jewellery'} className="bg-cyan-500 active:scale-95 text-center text-white py-2 rounded-full text-md font-semibold shadow-md hover:bg-cyan-600 transition">
            Jewellery
          </Link>

          <div className="relative h-[200px] overflow-hidden rounded-lg shadow-md group">
            <img
              src="https://imagescdn.simons.ca/vb/4e53ae13e2ed9ef36f5555f45d4c0f59/exclusive-sandals-pumps-and-shoes-by-simons.jpg"
              alt="Footwear"
              className="w-full h-full cursor-pointer object-cover group-hover:scale-110 duration-500"
            />
            <Link to={'/footwear'} className="absolute active:scale-95 bottom-4 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition">
              Footwear
            </Link>
          </div>
        </div>

        <div className="group relative h-[595px] overflow-hidden rounded-lg shadow-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49q4DL7Xo7FV11Hr2_zgU4yklcxWBtBstaA&s"
            alt="Daily Wear"
            className="w-full h-full cursor-pointer object-cover group-hover:scale-110 duration-500"
          />
          <Link to="/watches" className="absolute active:scale-95 bottom-5 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition">
            Watches
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;
