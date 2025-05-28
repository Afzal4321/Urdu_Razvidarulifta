import React from 'react';
import Image from 'next/image'; // Importing Image component for Next.js
import Bookscounter from './Bookscounter';
import Aboutus from './Aboutus';
import Latestfatwa from './Latestfatwa';
import Islamicbookcollection from './Islamicbookcollection';
import OurNewsletter from './OurNewsletter';
import IslamicbookcollectionPedding from './IslamicbookcollectionPedding';

import SliderImage1 from '../../Assets/Images/slider-1.jpg';
import HeroSlider from './HeroSlider';
import MySwiperComponent from './MySwiperComponent';
import LiveEvents from './LiveEvents';

const Home = () => {
  return (
    <>
     {/* <HeroSlider /> */}
     <div className='main-slider'>
        <MySwiperComponent />
      </div>
      {/* Additional Components */}
      <Bookscounter />
      <Aboutus />


      <LiveEvents />
      <Latestfatwa />
      <Islamicbookcollection />
      <IslamicbookcollectionPedding />
      <OurNewsletter />
    </>
  );
};

export default Home;
