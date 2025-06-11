import React, { useContext, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useEffect } from "react";
import { assets, products } from "../assets/assets";
import RelatedComponents from "../components/RelatedComponents";
import { toast } from "react-toastify";
import axios from "axios";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ProductDescription from "./shiamnu";
const Product = () => {
  const { productId } = useParams();
  const [toggle, setToggle] = useState("description");
  const {
    products,
    currency,
    cartItems,
    addToCart,
    backendUrl,
    userName,
    token,
    navigate,
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [colours, setColours] = useState("");
  const [review, setReview] = useState("");
  const [allReviews, setAllReviews] = useState();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitCart, setSubmitCart] = useState(false);
  let a = 0;

  const buyNow = async (size) => {
    if (productData.subCategory !== "Accessories" && !size) {
      toast.error("Select any Size!");
      return;
    }

    if (size === "Customized") {
      toast.success("You will be contacted regarding the size soon.");
    }

    setSubmitCart(true);

    try {
      await addToCart(productData, size, colours);
      navigate("place-order");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitCart(false);
    }
  };

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };


  const AddReview = async () => {
    try {
      if (token) {
        setLoading(true);
        setSubmit(true);
        const response = await axios.post(
          backendUrl + "/api/cart/addReview",
          { itemId: productData._id, message: review },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success("Review added successfully!");
          fetchReviews(); // Refresh reviews after adding
        } else {
          toast.error("Failed to add review");
        }
        setReview("");
      } else {
        toast.error("Please Login!");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Something went wrong");
    } finally {
      setSubmit(false);
      setLoading(false);
    }
  };

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/getReviews`,
        { itemId: productData._id },
        { headers: { token } }
      );
      if (response.data.success) {
        setAllReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [productData, backendUrl, token]);
  const onClickHandler = () => {
    setToggle("review");
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  useEffect(() => {
    if (productData) {
      fetchReviews();
    }
  }, [productData]);
  let b = 0;
  if (allReviews && Array.isArray(allReviews)) {
    allReviews.forEach((obj) => {
      let rev = obj.review;
      if (rev && Array.isArray(rev)) {
        rev.forEach((rev) => {
          if (rev === "") {
            b = -1;
          }
        });
      }
      if (b !== -1) {
        a += obj.review.length;
      }
    });
  }
  console.log(productData);

  return productData ? (
    <div className="border-t-2 pt10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border p-1 rounded hover:shadow-md transition duration-300 ${
                  image === item ? "border-orange-500" : "border-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {productData.stock ? null : (
            <p className="text-red-600 font-bold">Out of Stock!</p>
          )}
          <p className="mt-5 text-3xl font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-2 font-bold text-xl">Description:</p>
          <ProductDescription description={productData.description} />

          <div className="flex flex-col gap-4 my-8">
            {productData.subCategory === "Accessories" ? null : (
              <p>Select Size</p>
            )}
            <div className="sm:flex grid grid-cols-3 gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                    item === size
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-700 hover:bg-orange-100 border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Colour</p>
            <div className="flex gap-3 mt-4">
              {productData.colours.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setColours(item)}
                  style={{ backgroundColor: item }}
                  className={`w-8 h-8 rounded-full border-2 transition duration-200 ${
                    item === colours
                      ? "ring-2 ring-orange-500 border-white"
                      : "border-gray-300"
                  }`}
                >
                  <span className="sr-only">{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                productData.stock
                  ? addToCart(productData, size, colours)
                  : toast.error("Out of Stock!");
              }}
              className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>
            <button
              onClick={() => {
                productData.stock ? buyNow(size) : toast.error("Out of Stock!");
              }}
              className="bg-orange-400 text-white px-6 py-3 rounded-lg text-sm hover:bg-orange-500 transition disabled:opacity-50"
              disabled={submitCart}
            >
              {submitCart ? "Processing..." : "BUY NOW"}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash On Delivery Available</p>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex">
          <div className="flex mt-10 border-b">
            {["description", "review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setToggle(tab)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                  toggle === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "description" ? "Description" : `Reviews (${a})`}
              </button>
            ))}
          </div>
        </div>
        {toggle === "description" ? (
           <ProductDescription description={productData.description} />
        ) : (
          <div className="flex flex-col gap-4 border px-6 py-6">
            <div className="flex flex-col mb-3">
              <div className="mb-3 relative">
                <div className="flex gap-3 mb-2 ">
                  <img src={assets.user} className="w-6" alt="" />
                  <h1>{userName}</h1>
                </div>
                <div className="grid grid-cols-[3fr_1fr] max-w-[100%] ">
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="Add a review"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                      onClick={() => {
                        review.length === 0 ? null : AddReview();
                      }}
                      className="bg-black text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 transition"
                      disabled={submit}
                    >
                      {loading ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {allReviews?.map((item, index) =>
                  item.review?.map(
                    (review, subIndex) =>
                      review && (
                        <div
                          key={`${index}-${subIndex}`}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={assets.user}
                              alt=""
                              className="w-6 h-6 rounded-full"
                            />
                            <h1 className="text-sm font-semibold text-gray-700">
                              {item.userName}
                            </h1>
                          </div>
                          <p className="text-sm text-gray-600">{review}</p>
                        </div>
                      )
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <RelatedComponents
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <p className="text-center text-gray-500 py-10">Loading product...</p>
  );
};

export default Product;
