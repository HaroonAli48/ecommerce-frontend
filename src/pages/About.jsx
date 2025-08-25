import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import OurPolicy from "../components/OurPolicy";
import OurPolicy2 from "../components/OurPolicy2";

const About = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16">
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"Us"} />
      </div>
      <div className="flex flex-col md:flex-row gap-10 my-12 items-center">
        <img
          src={assets.about_img}
          alt="About Arooj Collection"
          className="w-full md:max-w-md rounded-lg shadow-md"
        />
        <div className="cursor-pointer md:w-3/5 flex flex-col gap-6 text-gray-700">
          <p>
            At <b className="text-gray-900">Arooj Collection</b>, we believe
            fashion is more than just clothing — it’s a reflection of
            personality and confidence. Our brand is dedicated to providing
            stylish, high-quality apparel that blends elegance with comfort.
          </p>
          <p>
            Founded with a passion for fashion,{" "}
            <b className="text-gray-900">Arooj Collection</b> aims to make
            trendy, premium-quality clothing accessible to everyone. We
            prioritize craftsmanship, customer satisfaction, and affordability,
            ensuring that each piece meets the highest standards.
          </p>
          <div>
            <b className="text-gray-800 text-lg">Our Mission</b>
            <p className="mt-2">
              At <b className="text-gray-900">Arooj Collection</b>, our mission
              is to redefine fashion by offering high-quality, stylish, and
              affordable clothing. We aim to inspire confidence and
              individuality through every piece we create.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xl py-6 text-center">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div className="border cursor-pointer border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition duration-300 bg-white flex flex-col gap-4">
          <b className="text-lg text-gray-800">Quality Assurance</b>
          <p className="text-sm text-gray-600">
            At <b>Arooj Collection</b>, we ensure premium quality with carefully
            selected fabrics, precise craftsmanship, and strict quality checks.
            Every piece is designed for durability, comfort, and timeless style.
          </p>
        </div>

        <div className="border cursor-pointer border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition duration-300 bg-white flex flex-col gap-4">
          <b className="text-lg text-gray-800">Convenience</b>
          <p className="text-sm text-gray-600">
            Shopping at <b>Arooj Collection</b> is easy and hassle-free. With a
            user-friendly website, secure payments, and fast delivery, we bring
            trendy fashion to your doorstep.
          </p>
        </div>

        <div className="cursor-pointer border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-md transition duration-300 bg-white flex flex-col gap-4">
          <b className="text-lg text-gray-800">Exceptional Customer Service</b>
          <p className="text-sm text-gray-600">
            Customer satisfaction is our priority. Our dedicated support team
            ensures quick responses, smooth returns, and friendly assistance
            every step of the way.
          </p>
        </div>
      </div>

      <OurPolicy />
      <OurPolicy2 />
    </div>
  );
};

export default About;
