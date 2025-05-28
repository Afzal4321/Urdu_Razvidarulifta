import React from 'react';
import Image from 'next/image';
import AboutUS2 from '../../Assets/images/AboutUS2.jpeg';

const Aboutus2 = () => {
  return (
    <div>
      <div className="d-lg-flex justify-content-center align-items-start gap-4">
        <div className="col-12 col-lg-9">
          <h3 className="text-2xl font-bold text-green-700">RAZVI DARUL IFTA</h3>
          <p className="mt-4 text-gray-700">
            Allah عزوجل says "فَسْــٴَـلُـوْۤا اَهْلَ الذِّكْرِ اِنْ كُنْتُمْ لَا تَعْلَمُوْنَ" —
            "So ask the people of knowledge if you do not know". Because of this command from Allah, it is obligatory for those who are unaware to seek guidance from scholars regarding beliefs, worship, and religious affairs.
            <br /><br />
            The foundation of a Darul Ifta is built to serve as a center of guidance for such inquiries. Issuing fatwas and answering religious questions is not a task for everyone; it demands deep study, discipline, and Allah’s divine help.
            In India and Pakistan, many great scholars and jurists have rendered exceptional services in Islamic jurisprudence through Darul Ifta institutions.
          </p>
        </div>

        <div className="col-12 col-lg-3">

          <img src={AboutUS2.src} alt="About Us"
            width={400}
            height={400}
            className="rounded img-fluid"

            loading="lazy" />

        </div>
      </div>
    </div>
  );
};

export default React.memo(Aboutus2);
