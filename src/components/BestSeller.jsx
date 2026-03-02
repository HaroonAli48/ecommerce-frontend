import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(
      (item) => item.bestseller === true || item.bestseller === "true",
    );
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600"></p>
      </div>
      <div className="grid w-3/3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            discount={item.discount}
            id={item._id}
            image={item.image}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </div>{" "}
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mb-4 mx-auto mt-2 font-light tracking-wide">
          Click to explore our collection of premium products.
        </p>
        <Link
          to={"/collection "}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="active:scale-95 bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-cyan-600 transition"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default BestSeller;
