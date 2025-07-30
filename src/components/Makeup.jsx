import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Makeup = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    if (products.length === 0) return;

    const makeupOnly = products.filter((item) => item.category === "Makeup");

    switch (sortType) {
      case "low-high":
        makeupOnly.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        makeupOnly.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(makeupOnly);
  }, [products, sortType]);

  return (
    <div className="flex flex-col pt-10 border-t px-4 sm:px-0">
      {/* Title and Sort Options */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6">
        <Title text1="Makeup" text2="Collection" />
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 text-sm px-2 py-[6px] rounded bg-white focus:outline-none focus:ring-1 focus:ring-pink-300"
        >
          <option value="relevant">Sort By: Relevant</option>
          <option value="low-high">Sort By: Low to High</option>
          <option value="high-low">Sort By: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filterProducts.length > 0 ? (
          filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              image={item.image}
              id={item._id}
              price={item.price}
              stock={item.stock}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No makeup products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Makeup;
