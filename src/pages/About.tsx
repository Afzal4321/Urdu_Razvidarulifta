import Layout from '@/components/layouts/Layout';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import AboutUS1 from '../Assets/images/AboutUS1.jpeg';
import dynamic from 'next/dynamic';

// Dynamically load tab content components with memoization
const AboutRazviDarulifta = dynamic(() => import('@/components/CmptAbout/AboutRazviDarulifta'), {
  loading: () => <p>Loading About Info...</p>,
  ssr: false,
});

const OurPersonalities = dynamic(() => import('@/components/CmptAbout/OurPersonalities'), {
  loading: () => <p>Loading Personalities...</p>,
  ssr: false,
});

const About = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'personalities'>('about');

  // Use useMemo for tab button rendering to avoid recalculating on every render
  const tabButtons = useMemo(() => {
    return (
      <div className="d-lg-flex justify-content-between gap-4 bg-white p-4 rounded-lg shadow-md mt-4" style={{display:'flex'}}>
        <button
          onClick={() => setActiveTab('about')}
          className={`btnabout flex items-center justify-center gap-2 text-lg font-semibold px-6 py-3 rounded-lg transition-all duration-300 ${
            activeTab === 'about'
              ? 'bg-green-600 text-white'
              : 'border border-gray-400 bg-white text-black'
          }`}
        >
          <span className="text-xl">🏠</span> About Razvi Darul Ifta
        </button>

        <button
          onClick={() => setActiveTab('personalities')}
          className={`btnabout flex items-center justify-center gap-2 text-lg font-semibold px-6 py-3 rounded-lg transition-all duration-300 ${
            activeTab === 'personalities'
              ? 'bg-green-600 text-white'
              : 'border border-gray-400 bg-white text-black'
          }`}
        >
          <span className="text-xl">🎓</span> Our Personalities
        </button>
      </div>
    );
  }, [activeTab]);

  return (
    <Layout>
      <section className="Aboutus">
      <div className="container">
        <div className="row" style={{textAlign:'justify'}}>
         
            <Image
              src={AboutUS1}
              alt="About Us"
              width={1920}
              height={550}
              layout="responsive"
              priority
              className="rounded"
            />

<div className="col-12">
              {/* Tab Navigation */}
              {tabButtons}

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === 'about' ? <AboutRazviDarulifta /> : <OurPersonalities />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default React.memo(About);
