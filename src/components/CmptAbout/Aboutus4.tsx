import React from 'react';
import Image from 'next/image';
import AboutUS4 from '../../Assets/images/AboutUS4.jpeg';

const Aboutus4 = () => {
  return (
    <div>
      <div className="d-lg-flex justify-content-center align-items-start gap-4">

        <div className="col-12 col-lg-9">
          <p className="mt-4 text-gray-700">
            The apparent witness and verbal evidence can be found in the remarkable collections of fataawaa, such as Fatawa Razaviyya, 
            Fatawa Mufti Azam Hind, Fatawa Hujjatul Islam, Fatawa Tajush Shariah, etc. Those which by carefully observing, a clear assessment 
            can be made about the rank of proficiency and expertise in the standard of research, findings of facts, scrutiny of Islamic rulings, 
            which is not too difficult to guess for anyone fond of Islamic jurisprudence and verdicts and those passionates for Books of Fataawa.
            <br /><br />
            Because everyone knows that if the superior findings and preferences of Fatawa Razaviyyah didn't exist, then it would have been 
            very tough — perhaps even unreachable — for many upcoming noble Muftis to extract better opinions and rulings among many different 
            statements in Mazhab.
            <br /><br />
            Aala Hadrat قدس سره issued his first fatwa in 1286 AH at the remarkable age of 13 years and 10 months. This prolific journey 
            of writing fataawas continued steadfastly until the final days of Ala Hazrat قدس سره — an impressive span of approximately 55 years.
          </p>
        </div>

        <div className="col-12 col-lg-3">
        <img src={AboutUS4.src} alt="About Us"
            width={400}
            height={400}
            className="rounded img-fluid"

            loading="lazy" />
        </div>
        
      </div>
    </div>
  );
};

export default React.memo(Aboutus4);
