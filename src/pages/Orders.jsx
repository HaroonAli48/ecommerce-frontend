import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Title title="My Orders" />

      {orderData.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          You have no orders yet.
        </p>
      ) : (
        orderData.map((item, index) => {
          const [size, colour] = item.size?.includes("-")
            ? item.size.split("-")
            : [item.size, null];

          return (
            <div
              key={index}
              className="py-5 px-3 border border-gray-200 rounded-lg shadow-sm my-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white"
            >
              <div className="flex gap-4 items-start">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover border rounded"
                />
                <div className="text-sm sm:text-base">
                  <p className="font-medium text-gray-800 mb-1">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mt-1">
                    <p className="text-sm">Size: {size}</p>
                    {colour && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm">Colour:</span>
                        <span
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: colour }}
                        ></span>
                      </div>
                    )}
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600 mt-2 md:mt-0">
                <p>
                  Price: {currency}{" "}
                  {item.discount > 0 ? item.discount : item.price}
                </p>
                <p>Date: {new Date(item.date).toDateString()}</p>
                <p>
                  Payment: {item.paymentMethod}{" "}
                  {item.payment ? "(Paid)" : "(Unpaid)"}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-400"
                    }`}
                  ></span>
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border border-gray-400 text-gray-700 px-4 py-1 text-sm rounded hover:bg-gray-100 transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
