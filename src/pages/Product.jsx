import React, { useContext, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { useEffect } from 'react';
import { assets, products } from '../assets/assets';
import RelatedComponents from '../components/RelatedComponents';
import { toast } from 'react-toastify';
import axios from 'axios';

const Product = () => {

  const {productId} = useParams();
  const [toggle,setToggle] = useState('description')
  const {products,currency,cartItems,addToCart,backendUrl,userName,token} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size,setSize] = useState('');
  const [review,setReview] = useState('');
  const [allReviews,setAllReviews] = useState();

  const fetchProductData = async () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };
  
  const AddReview = async () => {
    try {
        const response = await axios.post(backendUrl + '/api/cart/addReview', 
            { itemId: productData._id, message: review }, 
            { headers: { token } }
        );

        if (response.data.success) {
            toast.success("Review added successfully!");
            fetchReviews(); // Refresh reviews after adding
        } else {
            toast.error("Failed to add review");
        }
    } catch (error) {
        console.error("Error adding review:", error);
        toast.error("Something went wrong");
    }
};

console.log(allReviews);
const fetchReviews = useCallback(async () => {
  try {
    const response = await axios.post(`${backendUrl}/api/cart/getReviews`, { itemId: productData._id }, { headers: { token } });
    if (response.data.success) {
      setAllReviews(response.data.reviews);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
}, [productData, backendUrl, token]);
  const onClickHandler = () => {
    setToggle('review');
  }

  useEffect(()=>{
    fetchProductData();
  },[productId, products])

  useEffect(() => {
    if (productData) {
        fetchReviews();
    }
  }, [productData]);
  


  return productData ? (
    
    <div className='border-t-2 pt10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          
          {productData.stock?null:<p className='text-red-600 font-bold'>Out of Stock!</p>}
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>

          </div>
          <button onClick={()=>
            {productData.stock?addToCart(productData._id,size):toast.error("Out of Stock")}} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash On Delivery Available</p>
            <p>Easy Exchange Or Return Policy Within 7 Days</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex">
          <p onClick={()=>setToggle('description')} className={`border px-5 py-3 cursor-pointer text-sm${toggle==='description'?'text-gray-900 font-bold':'text-gray-600'}`}>Description</p>
          <p onClick={()=>onClickHandler()} className={`border px-5 py-3 text-sm cursor-pointer ${toggle==='review'?'text-gray-900 font-bold':'text-gray-600'}`} >Reviews ({allReviews?.length})</p>
        </div>
        {toggle==='description'?<div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {productData.description}
        </div>:<div className='flex flex-col gap-4 border px-6 py-6'>
      <div className='flex flex-col mb-3'>
        <div className='mb-3 relative'>
            <div className='flex gap-3 mb-2 '>
                <img src={assets.user} className='w-6' alt="" />
                <h1>{userName}</h1>
            </div>
            <div className='grid grid-cols-[3fr_1fr] '>    
                <input onChange={(event)=>setReview(event.target.value)} value={review}  className='border outline-black text-sm text-gray-700 p-2'/>
                <button onClick={()=>AddReview()} className="bg-black relative right-0 content-center text-white px-8 py-2 ml-3 text-center sm:w-[60%] text-sm active:bg-gray-700">Send</button>
            </div>
        </div>

      {allReviews && allReviews.map((item, index) => (
        Array.isArray(item.review) ? (
        item.review.map((review, subIndex) => (
        <div key={`${index}-${subIndex}`}>
          <div className='flex gap-3 mb-2 border-t pt-2'>
            <img src={assets.user} className='w-6' alt="" />
            <h1>{item.userName}</h1>
          </div>
          <p className='text-sm text-gray-500 mb-5'>{review}</p>
        </div>
        ))
        ) : (
        <p key={index}></p>
        )
      ))}


      </div>
    </div>}
      </div>
      <RelatedComponents  category={productData.category} subCategory={productData.subCategory} />
    </div>  
  ) : <div className="opacity-0"></div>
}

export default Product
