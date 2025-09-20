import React, { useContext, useState } from "react";
import Title from "../components/Title";
import Carttotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    setCartItems,
    cartItems,
    clearCart,
    token,
    delivery_fee,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.startsWith("0")) {
        formattedValue = "92" + formattedValue.substring(1);
      }
      if (!formattedValue.startsWith("92")) {
        formattedValue = "92" + formattedValue;
      }
      formattedValue = "+" + formattedValue.substring(0, 12);
    }

    setFormData((data) => ({ ...data, [name]: formattedValue }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formData.phone.length !== 13) {
        toast.error("Enter a valid phone number.");
        return;
      }

      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log(orderItems);

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      let response;
      if (method === "cod") {
        response = await axios.post(
          backendUrl + "/api/order/guest",
          orderData,
          {
            headers: { token },
          }
        );
      } else if (method === "jz") {
        response = await axios.post(backendUrl + "/api/order/jazz", orderData, {
          headers: { token },
        });
      } else if (method === "easy") {
        response = await axios.post(backendUrl + "/api/order/easy", orderData, {
          headers: { token },
        });
      }

      if (response?.data?.success) {
        setCartItems({});
        navigate("/guest-orders");
        toast.success("Order Placed!");
        if (method !== "cod") {
          toast.success(
            "You will be contacted soon for payment verification on your provided phone number.",
            { autoClose: 15000 }
          );
        }
      } else {
        toast.error(response?.data?.message || "Order failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
      clearCart();
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row gap-6 justify-between pt-4 sm:pt-14 min-h-[80vh] border-t px-4"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1={"Delivery"} text2={"Information"} />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-gray-300 rounded py-2 px-3 w-full"
          placeholder="Full Address"
          required
        />

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="text"
          className="border border-gray-300 rounded py-2 px-3 w-full"
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="mt-6 w-full sm:w-[400px]">
        <Carttotal />

        <div className="mt-8">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex flex-col gap-3 mt-4">
            {["jz", "easy", "cod"].map((pay) => (
              <div
                key={pay}
                onClick={() => setMethod(pay)}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded hover:shadow"
              >
                <div
                  className={`w-4 h-4 border rounded-full ${
                    method === pay ? "bg-green-500" : ""
                  }`}
                ></div>
                <p className="text-gray-700 font-medium">
                  {pay === "jz"
                    ? "JazzCash"
                    : pay === "easy"
                    ? "EasyPaisa"
                    : "Cash On Delivery"}
                </p>
              </div>
            ))}
          </div>

          {(method === "jz" || method === "easy") && (
            <div className="border mt-4 rounded shadow p-3 bg-gray-50">
              <p className="text-sm font-medium">
                {method === "jz" ? "JazzCash Account" : "EasyPaisa Account"}:{" "}
                <span className="font-bold">0301-7134100</span>
              </p>
              <p className="text-sm mt-1 font-medium">
                Name: <span className="font-bold">Tabassum naz</span>
              </p>
              <p className="text-sm mt-2">
                <span className="font-bold">Note:</span> Send screenshot of
                payment receipt to WhatsApp:{" "}
                <span className="font-bold">0301-7134100</span>
              </p>
            </div>
          )}

          {method === "cod" ? (
            <div className="border mt-4 rounded shadow p-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-500 m-2">
                <span className="font-bold text-gray-800">Note:</span>For
                confirmation of order send screenshot of advance payment{" "}
                <span className="font-bold text-gray-800">Rs.500</span> on{" "}
                <span className="font-bold text-gray-800">0301-7134100</span>
              </p>
            </div>
          ) : (
            ""
          )}

          <div className="w-full text-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-8 py-2 rounded hover:opacity-90 transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
