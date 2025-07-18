import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'PKR';
    const delivery_fee = 200;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [userName,setUserName] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
    
        if (quantity === 0) {
            delete cartData[itemId][size];
    
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
    
            setCartItems(cartData);
    
            if (token) {
                try {
                    await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        } else {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
    
            if (token) {
                try {
                    await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
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
                headers: {token}
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
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });

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
    }

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
const addToCart = async (product, size, colour) => {
    if (!token) {
        toast.error("Not logged in.");
        navigate('login');
        return;
    }

    if (product.subCategory !== 'Accessories' && !size) {
        toast.error("Select Any Size!");
        return;
    }
    if (product.category==='Women'||product.category==='Men'||product.category==='Kids') {
        
        if (!colour) {
            toast.error("Select a Colour!");
            return;
        }
    }

    if (size === 'Customized') {
          // WhatsApp redirection
    const phoneNumber = "923335273923"; 
    const message = `Hello, I want to customize the product: ${product.name}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, "_blank"); 
    }

    const itemId = product._id;
    const key = `${size}-${colour}`; // Unique key for each size/colour combo

    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};

    cartData[itemId][key] = (cartData[itemId][key] || 0) + 1;
    setCartItems(cartData);

    try {
        toast.success("Added to Cart!");
        await axios.post(`${backendUrl}/api/cart/add`, {
            itemId,
            size,
            colour
        }, {
            headers: { token },
        });
    } catch (error) {
        console.error(error);
        toast.error(error.message);
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
                        totalAmount += itemInfo.price * quantity;
                    }
                } catch (error) {
                    console.error("Error calculating cart amount:", error);
                }
            }
        }

        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
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
        updateQuantity, 
        getCartAmount, 
        navigate, 
        backendUrl, 
        setCartItems,
        token, 
        setToken,
        userName,
        userEmail

    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
