import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import Whatsapp from "./components/Whatsapp";
import Makeup from "./components/Makeup";
import Accessories from "./components/Accessories";
import Oil from "./components/Oil";
import Watches from "./components/Watches";
import Jewellery from "./components/Jewellery";
import Shiamnu from "./pages/Shiamnu";
import Footwear from "./pages/Footwear";

const App = () => {
  return (
    <>
      <div className="pt-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Shiamnu" element={<Shiamnu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/makeup" element={<Makeup />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/oil" element={<Oil />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/jewellery" element={<Jewellery />} />
          <Route path="/footwear" element={<Footwear />} />
        </Routes>
        <div className="fixed sm:right-12 sm:bottom-12 right-4 bottom-5 z-40 cursor-pointer hover:scale-105 transition-transform duration-300">
          <Whatsapp />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
