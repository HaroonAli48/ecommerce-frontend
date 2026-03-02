import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mt-2 font-light tracking-wide">
          Find our latest top-notch products crafted with elegance and premium
          quality.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            id={item._id}
            image={item.image}
            price={item.price}
            stock={item.stock}
            discount={item.discount}
          />
        ))}
      </div>
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

export default LatestCollection;
