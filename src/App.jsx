import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Product = lazy(() => import("./pages/Product"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Login = lazy(() => import("./pages/Login"));
const Verify = lazy(() => import("./pages/Verify"));
const Profile = lazy(() => import("./pages/Profile"));
const Shiamnu = lazy(() => import("./pages/Shiamnu"));
const Footwear = lazy(() => import("./pages/Footwear"));
const Size = lazy(() => import("./pages/Size"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/Policy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const GuestCheckout = lazy(() => import("./pages/GuestCheckout"));
const GuestOrders = lazy(() => import("./pages/GuestOrders"));

const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const SearchBar = lazy(() => import("./components/SearchBar"));
const Whatsapp = lazy(() => import("./components/Whatsapp"));
const Makeup = lazy(() => import("./components/Makeup"));
const Accessories = lazy(() => import("./components/Accessories"));
const Oil = lazy(() => import("./components/Oil"));
const Jewellery = lazy(() => import("./components/Jewellery"));
const ProductCategory = lazy(() => import("./components/ProductCategory"));

const App = () => {
  return (
    <>
      <Analytics />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
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
            <Route path="/place-guest" element={<GuestCheckout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/makeup" element={<Makeup />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/oil" element={<Oil />} />
            <Route
              path="/category/:categoryName"
              element={<ProductCategory />}
            />
            <Route path="/guest-orders" element={<GuestOrders />} />
            <Route path="/jewellery" element={<Jewellery />} />
            <Route path="/footwear" element={<Footwear />} />
            <Route path="/size" element={<Size />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>

          <div className="fixed sm:right-12 sm:bottom-12 right-4 bottom-5 z-40 cursor-pointer hover:scale-105 transition-transform duration-300">
            <Whatsapp />
          </div>

          <Footer />
        </div>
      </Suspense>
    </>
  );
};

export default App;
