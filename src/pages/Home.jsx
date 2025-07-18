import React, { useRef } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Explore from '../components/Explore'

const Home = () => {
  const latestCollectionRef = useRef(null);
  return (
    <div >

      <Hero latestCollectionRef={latestCollectionRef} />
      <Explore/>
      <div  ref={latestCollectionRef}>
        <LatestCollection />
      </div>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
