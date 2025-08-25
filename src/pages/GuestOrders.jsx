import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const GuestOrders = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!phone) {
        toast.error("Enter phone number");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/order/guestorders`, {
        phone,
      });

      if (response.data.success) {
        setOrders(response.data.orders);
        if (response.data.orders.length === 0) toast.info("No orders found");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders");
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
        >
          Search
        </button>
      </div>

      {orders.map((order, idx) => (
        <div key={idx} className="border p-3 rounded mb-3">
          <p className="font-medium mb-2">
            Date: {new Date(order.date).toLocaleString()}
          </p>
          <p className="mb-2">Payment: {order.payment ? "Paid" : "Unpaid"}</p>
          <div className="flex flex-wrap gap-3">
            {order.items.map((item, i) => (
              <div key={i} className="border p-2 rounded">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover mb-1"
                />
                <p>{item.name}</p>
                <p>Size: {item.size}</p>
                <p>Qty: {item.quantity}</p>
                <p>
                  Price: {currency}
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestOrders;
