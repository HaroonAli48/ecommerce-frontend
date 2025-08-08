import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discount, stock }) => {
  const { currency } = useContext(ShopContext);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 cursor-pointer  active:scale-95  group block border border-gray-300 shadow-md transition-all duration-800 hover:shadow-xl hover:-translate-y-1"
      aria-label={`View details for ${name}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden relative h-64">
        <img
          src={image[0]}
          alt={name}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            hovered && image[1] ? "opacity-0" : "opacity-100"
          }`}
        />
        {image[1] && (
          <img
            src={image[1]}
            alt={name}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      <div className="px-3 py-2 transition-colors duration-300 group-hover:bg-gray-50">
        <p
          className="pt-3 pb-1 text-sm font-semibold transform transition-all duration-300 group-hover:translate-x-1"
          title={name}
        >
          {name}
        </p>

        {discount > 0 ? (
          <>
            <p className="text-sm font-medium text-gray-500 line-through">
              {currency} {price.toFixed(2)}
            </p>
            <p className="text-sm font-medium">PKR {discount}</p>
          </>
        ) : (
          <p className="text-sm font-medium">
            {currency} {price.toFixed(2)}
          </p>
        )}
        {!stock && (
          <p className="text-red-600 font-bold mt-1" aria-live="polite">
            Out of stock!
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
