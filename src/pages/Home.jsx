import React, { useRef } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Explore from "../components/Explore";
import HotSellingProduct from "../components/HotSelling";
import OurPolicy2 from "../components/OurPolicy2";

const Home = () => {
  const latestCollectionRef = useRef(null);
  return (
    <div>
      <Hero latestCollectionRef={latestCollectionRef} />
      <HotSellingProduct />
      <Explore />
      <div ref={latestCollectionRef}>
        <LatestCollection />
      </div>
      <BestSeller />
      <OurPolicy />
      <OurPolicy2 />
      <NewsletterBox />
    </div>
  );
};

export default Home;
