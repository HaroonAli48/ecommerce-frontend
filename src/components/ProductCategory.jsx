import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const ProductCategory = () => {
  const { products } = useContext(ShopContext);
  const { categoryName } = useParams(); // Get category name from URL
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    if (!products || products.length === 0) return;

    let filtered = products.filter(
      (item) => item.category.toLowerCase() === categoryName.toLowerCase()
    );

    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(filtered);
  }, [products, sortType, categoryName]);

  return (
    <div className="flex flex-col pt-10 border-t px-4 sm:px-0">
      {/* Title + Sort Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-6">
        <Title
          text1={categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          text2={"Collection"}
        />
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border border-gray-300 text-sm px-2 py-[6px] rounded bg-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
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
              discount={item.discount}
              stock={item.stock}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
