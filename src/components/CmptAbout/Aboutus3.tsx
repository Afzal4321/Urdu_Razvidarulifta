import React from 'react';
import Image from 'next/image';
import AboutUS33 from '../../Assets/images/AboutUS3.jpeg';

const Aboutus3 = () => {
  return (
    <div>
      <div className="d-lg-flex justify-content-center align-items-start gap-4">

        <div className="col-12 col-lg-3">
        <img src={AboutUS33.src} alt="About Us"
            width={400}
            height={400}
            className="rounded img-fluid"

            loading="lazy" />

        </div>

        <div className="col-12 col-lg-9">
          <p className="mt-4 text-gray-700">
            Khanqah Alia Qadriah Razviyah, situated in the renowned district of Bareilly Sharif in Uttar Pradesh,
            is a well-established hub for religious services that speaks for itself.
            The Khanqah ranks as a central institution for the reform of beliefs and practices of the Muslims of Ahlus Sunnah in every corner,
            circle and class. The Khanqah has fulfilled extraordinary and exceptional work in the field of writing verdicts,
            an example set that may hardly exist in India and Pakistan or even around Islamic provinces.
            <br /><br />
            Khanwada e Ala Hazrat is nearly about to complete 200 years in resolving, with literature and speech,
            general and specific, ancient and latest as well as emerging issues and Islamic rulings that arise in the Muslim Ummah.
            The foundation of Masnad e Ifta was established in 1246 AH by Qutb-ul-Waqt Hazrat Maulana Mufti Raza Ali Khan قدس سره,
            the grandfather of Aala Hazrat Imam Ahmad Raza قدس سره.
            Since then, the Mashaaikh of the Razaviyya Family have been carrying out this tough but vital Islamic duty with deep research and sincerity.
          </p>
        </div>

      </div>
    </div>
  );
};

export default React.memo(Aboutus3);
