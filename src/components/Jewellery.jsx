import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Jewellery = () => {
  const { products } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    if (products.length === 0) return;

    let JewelleryOnly = products.filter((item) => item.category === "Jewellery");

    switch (sortType) {
      case "low-high":
        JewelleryOnly.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        JewelleryOnly.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(JewelleryOnly);
  }, [products, sortType]);

  return (
    <div className="flex flex-col pt-10 border-t px-4 sm:px-0">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={"JEWELLERY"} text2={"COLLECTION"} />
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border-2 border-gray-300 text-sm px-2"
        >
          <option value="relevant">Sort By: Relevant</option>
          <option value="low-high">Sort By: Low to High</option>
          <option value="high-low">Sort By: High to Low</option>
        </select>
      </div>

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
            No Jewellery available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jewellery;
