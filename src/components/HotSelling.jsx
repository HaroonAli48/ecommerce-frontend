import React from "react";
import { useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HotSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        const hotSelling = res.data.products.filter(
          (p) => p.hotSeller === true
        );
        setProducts(hotSelling);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return products.length > 0 ? (
    <>
      <div className="py-12 bg-gray-50">
        <h1 className="text-center text-3xl font-bold mb-8">
          Hot Selling Products – Arooj Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  Hot Selling
                </span>
                {product.discount > 0 && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg font-bold text-red-600">
                    Rs{" "}
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-gray-400 line-through">
                      Rs {product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Buy Now Button */}
                <Link
                  to={`/product/${product._id}`}
                  className="w-full bg-black text-center text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-md"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default HotSellingProducts;
