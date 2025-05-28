import React, { useMemo } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

// Import images from the public/Images folder
import SliderImage1 from '../../Assets//Images/slider1.jpg';
import SliderImage2 from '../../Assets//Images/slider2.jpg';
import SliderImage3 from '../../Assets//Images/slider3.jpg';
import SliderImage4 from '../../Assets//Images/slider4.jpg';
import SliderImage5 from '../../Assets//Images/slider5.jpg';

const slidesData = [
  {
    image: SliderImage1,
    title: 'Daily <span class="green-clr">Islamic</span> Guidance',
    desc: 'Discover trusted answers on everyday Islamic practices and gain clarity and peace of mind.',
  },
  {
    image: SliderImage2,
    title: 'Marriage and Family <span class="green-clr">Insights</span>',
    desc: 'Find expert advice on relationships and family roles, reflecting traditional Sunni values.',
  },
  {
    image: SliderImage3,
    title: '<span class="green-clr">Ethical</span> Living and Finance',
    desc: 'Explore ethical perspectives on personal conduct, finance, and business in line with Islamic principles.',
  },
  {
    image: SliderImage4,
    title: 'Connect with <span class="green-clr">Scholars</span>',
    desc: 'Engage with knowledgeable scholars to understand Islamic rulings based on Quran and Sunnah.',
  },
  {
    image: SliderImage5,
    title: '<span class="green-clr">Faith</span> in Daily Life',
    desc: 'Incorporate faith into your routine with spiritually uplifting content and guidance.',
  },
];

const MySwiperComponent = () => {
  const slides = useMemo(() => {
    return slidesData.map((slide, index) => (
      <SwiperSlide key={index}>
        <div style={{ position: 'relative', width: '100%', height: '550px' }}>
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
           
          />
        </div>
        <div className="caption-wrapper">
          <div className="caption-bg"></div>
          <div className="caption-txt">
            <div className="caption-area">
              <h2 dangerouslySetInnerHTML={{ __html: slide.title }} />
              <p className="d-none d-lg-block">{slide.desc}</p>
              <a className="btn-explore" href="#">Explore Now</a>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      // autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<div class="owl-dot ${className}"><span></span></div>`;
        },
      }}
      style={{ width: '100%', height: '550px' }}
    >
      {slides}
    </Swiper>
  );
};

export default MySwiperComponent;