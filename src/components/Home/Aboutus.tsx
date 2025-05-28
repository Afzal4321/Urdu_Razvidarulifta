import React, { useMemo } from 'react';
import { FaBook, FaHandsHelping, FaGlobe } from 'react-icons/fa';
import AboutImag from '../../Assets/Images/chair.png';

const AboutUs = React.memo(() => {
  const aboutContent = useMemo(() => ({
    heading: 'ABOUT',
    subHeading: 'Razvi Darul Ifta',
    description: `The "Razvi Darul Ifta Bareilly" fatwa website offers authentic Hanafi Ahlus Sunnah guidance. 
      It provides a wide range of Islamic resources, including books, articles, and detailed fatwas on
      various topics. Users can align their lives with Islamic teachings and contribute to Islamic 
      education and welfare through the trust donation section. This platform upholds traditional Islamic 
      knowledge while addressing modern-day inquiries. Supporting the community through knowledge & charity.`, 
  }), []);

  return (
    <section className="About">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="about-content">
              <h3>{aboutContent.heading}</h3>
              <h2>{aboutContent.subHeading}</h2>
              <p>{aboutContent.description}</p>
             
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="about-img">
              <img src={AboutImag.src} className="img-fluid" alt="About Image" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutUs;
