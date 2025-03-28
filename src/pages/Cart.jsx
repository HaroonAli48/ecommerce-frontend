import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import Carttotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, setCartItems, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, size, newQuantity);
    } else {
      removeFromCart(itemId, size);
    }
  };

  const removeFromCart = (itemId, size) => {
    // Clone cartItems to modify it
    let updatedCart = structuredClone(cartItems);

    // Remove the specific size of the item
    delete updatedCart[itemId][size];

    // If no more sizes for this item, remove the item itself
    if (Object.keys(updatedCart[itemId]).length === 0) {
      delete updatedCart[itemId];
    }

    // Update cartItems state
    setCartItems(updatedCart);

    // Update the backend
    updateQuantity(itemId, size, 0);
    
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id);

            if (!productData) {
              return null;
            }

            return (
              <div key={index} className="border-t border-b py-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img src={productData.image[0]} alt={productData.name} className="w-16 sm:w-20" />
                  <div>
                    <p className="text-xs font-medium sm:text-lg">{productData.name}</p>
                    <div className="flex gap-5 items-center mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  type="number" 
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" 
                  min={1} 
                  value={item.quantity}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue && Number(newValue) >= 0) {
                      handleQuantityChange(item._id, item.size, Number(newValue));
                    }
                  }}
                />
                <img 
                  onClick={() => removeFromCart(item._id, item.size)} 
                  src={assets.bin_icon} 
                  alt="Delete" 
                  className="w-4 mr-4 sm:w-5 cursor-pointer" 
                />
              </div>
            );
          })
        }
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <Carttotal />
          <div className="w-full text-end">
            <button 
              onClick={() => navigate('place-order')} 
              className="bg-black text-white text-sm px-8 my-8 py-3">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
