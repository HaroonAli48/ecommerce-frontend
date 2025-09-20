import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import Title from "../components/Title";

const GuestOrders = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [phone, setPhone] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      if (!phone) {
        toast.error("Enter phone number");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/order/guestorders`, {
        phone,
      });

      if (response.data.success) {
        if (response.data.orders.length === 0) {
          toast.info("No orders found");
          setOrderData([]);
          return;
        }

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
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Track order (refresh status without clearing)
  const trackOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/order/guestorders`, {
        phone,
      });

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
    } catch (err) {
      console.log(err);
      toast.error("Failed to track order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Check Your Orders</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchOrders}
          className="bg-black text-white px-4 rounded"
          disabled={loading}
        >
          {!loading ? (
            "Search"
          ) : (
            <div className="flex  gap-4">
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="relative flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin"></div>
                  <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-xl shadow-purple-500/40"></div>
                </div>
              </div>
            </div>
          )}
        </button>
      </div>

      <div className="p-4 max-w-5xl mx-auto">
        <Title text1="My" text2="Orders" />

        {orderData.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">
            Enter phone number to view orders.
          </p>
        ) : loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="relative flex items-center justify-center">
              {/* Outer pulse ring */}
              <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-indigo-500 animate-spin"></div>

              {/* Glowing inner circle */}
              <div className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-xl shadow-purple-500/40"></div>
            </div>
          </div>
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
                    <p className="font-medium text-gray-800 mb-1">
                      {item.name}
                    </p>
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
                    onClick={trackOrder}
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
    </div>
  );
};

export default GuestOrders;
