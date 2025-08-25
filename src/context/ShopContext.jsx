import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "PKR";
  const delivery_fee = 200;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const updateQuantity = async (itemId, key, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][key];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][key] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, key, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  const getUserProfile = async (token) => {
    if (!token) {
      toast.error("Please log in!");
      return;
    }

    setUserName("Loading...");
    setUserEmail("Loading...");

    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      });

      if (response.data.success) {
        setUserName(response.data.Username);
        setUserEmail(response.data.userEmail);
      } else {
        toast.error(data.message || "Failed to fetch user profile.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching user profile.");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const addToCart = async (product, size, colour, discount) => {
    // Validate selections
    if (product.subCategory !== "Accessories" && !size) {
      toast.error("Select Any Size!");
      return;
    }
    if (["Women", "Men", "Kids"].includes(product.category) && !colour) {
      toast.error("Select a Colour!");
      return;
    }

    // WhatsApp redirect for customized items
    if (size === "Customized") {
      const phoneNumber = "923017134100";
      const message = `Hello, I want to customize the product: ${product.name}`;
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      return;
    }

    const itemId = product._id;
    const key = `${size}-${colour}`; // unique key for size/color

    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][key] = (cartData[itemId][key] || 0) + 1;

    setCartItems(cartData);
    toast.success("Added to Cart!");

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size, colour },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    if (products.length === 0) {
      return totalAmount;
    }

    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);

      if (!itemInfo) {
        continue;
      }

      for (const size in cartItems[itemId]) {
        try {
          const quantity = cartItems[itemId][size];

          if (quantity > 0) {
            // totalAmount += itemInfo.discount * quantity;
            let prince =
              itemInfo.discount > 0 ? itemInfo.discount : itemInfo.price;
            totalAmount += prince * quantity;
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }

    return totalAmount;
  };

  const clearCart = async () => {
    setCartItems({});
    if (token) {
      try {
        await axios.delete(`${backendUrl}/api/cart`, { headers: { token } });
      } catch (err) {
        console.error(err);
      }
    } else {
      localStorage.removeItem("cart");
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      // Guest cart from localStorage
      const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
      setCartItems(savedCart);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getUserProfile(token);
    }
  }, [token]);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    clearCart,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setCartItems,
    token,
    setToken,
    userName,
    userEmail,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
