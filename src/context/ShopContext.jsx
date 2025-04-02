import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'PKR';
    const delivery_fee = 20;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [userName,setUserName] = useState('')
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
    
        if (quantity === 0) {
            // Remove the specific size of the item
            delete cartData[itemId][size];
    
            // If no more sizes for this item, remove the item itself
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
    
            setCartItems(cartData);
    
            // If the user is logged in, update the cart in the backend
            if (token) {
                try {
                    await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        } else {
            // Normal update logic if quantity is > 0
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
        try {
            if(token){
            const response = await axios.get(backendUrl + "/api/user/profile", {
                headers:  {token} , // Use Bearer token format
            });
        
            if (response.data.success) {
                setUserName(response.data.Username);
                
            } else {
                toast.error(response.data.message);
            }}
            else{
                toast.error("Please Login!")
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
    
    const addToCart = async (itemId, size) => {
        
        if (token) {
            let cartData = structuredClone(cartItems);

        if (!size) {
            toast.error("Select Any Size");
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        console.log(cartData);
        setCartItems(cartData);

            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
                toast.success("Added to Cart!")
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        
        }
        else{
            toast.error("Not logged in.")
            navigate('login')
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        if (products.length === 0) {
            return totalAmount; // Return 0 if products haven't loaded
        }

        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);

            if (!itemInfo) {
                continue; // If no matching product found, skip this item
            }

            for (const size in cartItems[itemId]) {
                try {
                    const quantity = cartItems[itemId][size];

                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity; // Multiply price by quantity
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
        userName

    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
