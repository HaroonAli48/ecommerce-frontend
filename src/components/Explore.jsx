import React from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Explore = () => {
  const { backendUrl } = useContext(ShopContext);
  const [pic4, setPic4] = useState(null);
  const [pic5, setPic5] = useState(null);
  const [pic6, setPic6] = useState(null);
  const [pic7, setPic7] = useState(null);
  const [pic8, setPic8] = useState(null);
  const [pic9, setPic9] = useState(null);
  const [pic10, setPic10] = useState(null);

  useEffect(() => {
    axios
      .get(backendUrl + `/api/images/latest`)
      .then((res) => {
        setPic4(res.data.pic4);
        setPic5(res.data.pic5);
        setPic6(res.data.pic6);
        setPic7(res.data.pic7);
        setPic8(res.data.pic8);
        setPic9(res.data.pic9);
        setPic10(res.data.pic10);
        console.log("Images fetched:", res.data);
      })

      .catch((err) => console.error("Failed to fetch images:", err));
  }, []);

  console.log(
    "Images fetched for Explore component:",
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10
  );

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl md:text-3xl font-bold mb-3 text-gray-800">
        EXPLORE OTHER COLLECTIONS
      </h2>
      <div className="w-24 h-1 bg-cyan-600 animation-pulse mx-auto mb-12 rounded-full"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group relative h-[595px] overflow-hidden rounded-lg shadow-md">
          <img
            src={pic4}
            alt="Formal Wear"
            className="w-full h-full object-cover cursor-pointer group-hover:scale-110 duration-1000"
          />
          <Link
            to={"/collection"}
            className="absolute active:scale-95 bottom-5 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition"
          >
            Formal Wear
          </Link>
        </div>

        <div className="flex flex-col gap-6 justify-between">
          <div className="grid grid-cols-2 gap-2">
            <div className="h-[150px] overflow-hidden rounded-lg shadow-sm group">
              <img
                src={pic5}
                className="w-full h-full object-cover group-hover:scale-110 duration-1000 cursor-pointer"
                alt=""
              />
            </div>
            <div className="h-[150px] overflow-hidden rounded-lg shadow-sm group">
              <img
                src={pic6}
                className="w-full h-full object-cover group-hover:scale-110 duration-1000 cursor-pointer"
                alt=""
              />
            </div>
            <div className="h-[150px] overflow-hidden rounded-lg shadow-sm group">
              <img
                src={pic7}
                className="w-full h-full object-cover group-hover:scale-110 duration-1000 cursor-pointer"
                alt=""
              />
            </div>
            <div className="h-[150px] overflow-hidden rounded-lg shadow-sm group">
              <img
                src={pic8}
                className="w-full h-full object-cover group-hover:scale-110 duration-1000 cursor-pointer"
                alt=""
              />
            </div>
          </div>
          <Link
            to={"/jewellery"}
            className="bg-cyan-500 active:scale-95 text-center text-white py-2 rounded-full text-md font-semibold shadow-md hover:bg-cyan-600 transition"
          >
            Jewellery
          </Link>

          <div className="relative h-[200px] overflow-hidden rounded-lg shadow-md group">
            <img
              src={pic9}
              alt="Footwear"
              className="w-full h-full cursor-pointer object-cover group-hover:scale-110 duration-1000"
            />
            <Link
              to={"/footwear"}
              className="absolute active:scale-95 bottom-4 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition"
            >
              Footwear
            </Link>
          </div>
        </div>

        <div className="group relative h-[595px] overflow-hidden rounded-lg shadow-md">
          <img
            src={pic10}
            alt="Daily Wear"
            className="w-full h-full cursor-pointer object-cover group-hover:scale-110 duration-1000"
          />
          <Link
            to="/watches"
            className="absolute active:scale-95 bottom-5 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition"
          >
            Watches
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;
