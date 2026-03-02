import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Carttotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    products,
    currency,
    getCartAmount,
    cartItems,
    updateQuantity,
    token,
    setCartItems,
    navigate,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [stock, setStock] = useState(true);
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const itemId in cartItems) {
        for (const key in cartItems[itemId]) {
          const parts = key.split("-");
          const size = parts[0];
          const colour = parts[1] || "N/A";

          tempData.push({
            _id: itemId,
            size: size,
            colour: colour,
            quantity: cartItems[itemId][key],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);
  const proceed = () => {
    if (getCartAmount() !== 0) {
      if (stock === false) {
        toast.error("Out of stock!");
      } else {
        if (token) {
          navigate("place-order");
        } else {
          navigate("place-guest");
        }
      }
    } else {
      toast.error("Cart is empty!");
    }
  };
  useEffect(() => {
    let outOfStock = cartData.some((item) => {
      const productData = products.find((product) => product._id === item._id);
      return productData && !productData.stock;
    });
    setStock(!outOfStock);
  }, [cartData, products]);
  const handleQuantityChange = (itemId, size, colour, newQuantity) => {
    const key = `${size}-${colour}`;

    if (newQuantity === "") {
      updateQuantity(itemId, key, "");
      return;
    }

    const quantityNumber = Number(newQuantity);

    if (quantityNumber > 0) {
      updateQuantity(itemId, key, quantityNumber);
    } else if (quantityNumber === 0) {
      removeFromCart(itemId, size, colour);
    }
  };

  const removeFromCart = (itemId, size, colour) => {
    const key = `${size}-${colour}`;
    const updatedCart = { ...cartItems };

    if (updatedCart[itemId]) {
      delete updatedCart[itemId][key];

      if (Object.keys(updatedCart[itemId]).length === 0) {
        delete updatedCart[itemId];
      }
    }

    setCartItems(updatedCart);
    updateQuantity(itemId, `${size}-${colour}`, 0);
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-center text-2xl   mb-10">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="space-y-6">
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div className="space-y-1 text-sm sm:text-base">
                  <p className="font-semibold">{productData.name}</p>

                  <div className="text-gray-700">
                    Price:{" "}
                    <span className="font-medium">
                      {currency}{" "}
                      {productData.discount <= 0
                        ? productData.price
                        : productData.discount}
                    </span>
                  </div>

                  <div className="text-gray-700">
                    Size: <span className="font-medium">{item.size}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">Colour:</span>
                    <span
                      className="w-5 h-5 border rounded"
                      style={{ backgroundColor: item.colour }}
                    />
                  </div>

                  {!productData.stock && (
                    <p className="text-red-600 font-semibold">Out of Stock</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                <input
                  type="number"
                  value={item.quantity ?? ""}
                  onChange={(e) =>
                    handleQuantityChange(
                      item._id,
                      item.size,
                      item.colour,
                      e.target.value,
                    )
                  }
                  className="w-20 px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                  onClick={() =>
                    removeFromCart(item._id, item.size, item.colour)
                  }
                  className="text-red-600 hover:text-red-800"
                  title="Remove item"
                >
                  <img src={assets.bin_icon} alt="Delete" className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px] bg-white shadow-md rounded-xl p-6">
          <Carttotal />
          <div className="text-end mt-6">
            <button
              onClick={proceed}
              className="bg-black hover:bg-gray-800 text-white font-semibold text-sm px-6 py-3 rounded-md"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
