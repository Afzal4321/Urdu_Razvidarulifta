import React, { Suspense } from 'react'
import AboutUS5 from '../../Assets/images/AboutUS5.jpeg';
const Aboutus5 = () => {
  return (
    <div>
      <div className="d-lg-flex justify-content-center">
        {/* Content Section */}
        <div className="col-lg-3">
          <Suspense fallback={<div>Loading image...</div>}>
          <img src={AboutUS5.src} alt="About Us"
            width={400}
            height={400}
            className="rounded img-fluid"

            loading="lazy" />
          </Suspense>
        </div>
        <div className="col-12 col-lg-9">
          <p className="mt-4 text-gray-700">
            During this period, he confidently provided insightful answers to thousands of inquiries from both domestic
            and international audiences, through compelling speeches and thoughtful writings. He conducted rigorous research
            and analysis on a multitude of Sharia issues, producing work of exceptional quality that surpasses anything found
            in contemporary or even historical fatwa literature. A’ala Hadrat قدس سره boldly undertook the significant
            task of writing fatwas from the comfort of his own home, which also served as his Dar-ul-Ifta. As he approached
            the end of his life, he revitalized this vital institution, establishing a permanent Dar-ul-Ifta with a modernized
            organization and structure that set a standard for others to follow. He proposed the name “Razvi Dar-ul-Ifta” and placed
            its organization and management in the capable hands of his son, Taaj Dar E Ahle Sunnat, Hazrat Mufti Azam of
            India قدس سره.  The tradition mentioned above was confidently narrated by Hazrat Qazi Abdul Rahim Bastavi عليه الرحمه, the
            esteemed former Central Mufti of Darul Ifta Bareilly Sharif, on Monday, 7th Muharram 1411 AH.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus5;
