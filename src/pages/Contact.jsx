import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import OurPolicy from "../components/OurPolicy";
import Cart from "./Cart";
import { useState } from "react";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "923017134100"; // WhatsApp number (without dashes)
    const text = `*Contact Form Submission*\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const encodedText = encodeURIComponent(text);

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Redirect to WhatsApp
    window.open(whatsappURL, "_blank");
  };
  return (
    <div className="px-4 sm:px-8 md:px-16">
      {/* Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      {/* Content Section */}
      <div className="my-12 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Info */}
        <div className="md:w-1/2 flex flex-col gap-6 text-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800">Our Store</h2>
          <p className="text-gray-600">
            Arooj Collection is an{" "}
            <span className="font-semibold">online-only brand</span>. We do not
            operate a physical storefront, ensuring lower costs and greater
            convenience for our customers.
          </p>
          <div className="text-gray-500 space-y-2">
            <p>
              <b className="text-gray-700">Phone:</b> 0301-7134100
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.contact_img}
            alt="Contact Arooj Collection"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Optional: Add a contact form in future */}
      {/* Contact Form Section */}
      <div className="bg-gray-50 p-6 md:p-10 rounded-lg shadow-md max-w-3xl mx-auto my-10 w-full">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Send Us a Message
        </h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
              onChange={handleChange}
            ></textarea>
          </div>
          <buttonp
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Send Message
          </buttonp>
        </form>
      </div>

      <OurPolicy />
    </div>
  );
};

export default Contact;
