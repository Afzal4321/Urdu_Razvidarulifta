import Layout from '@/components/layouts/Layout';
import { GetFatawahbyMID } from '@/services/Manage_services';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faBook, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface FatawahType {
  MID: number;
  fatawah_title: string;
  fatawah_description: string;
  RefNo: string;
  fatawah_filename: string;
  Question: string;
  Answer: string;
  Created_Date: string;
}

const Answer = () => {
  const router = useRouter();
  const { mid } = router.query; // Get the ID from the URL

  const [fatawah, setFatawah] = useState<FatawahType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFatawahbyMID = async () => {
    if (!mid) return;

    try {
      const response = await GetFatawahbyMID(Number(mid));
      if (response?.statusCode === 200 && response.data.length > 0) {
        setFatawah(response.data[0]);
      } else {
        toast.error('No data found for the given ID.');
      }
    } catch (error) {
      console.error('Error fetching fatawah details:', error);
      toast.error('Error fetching fatawah details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFatawahbyMID();
  }, [mid]);

  // Memoize fatawah data to prevent unnecessary re-renders
  const memoizedFatawah = useMemo(() => fatawah, [fatawah]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!memoizedFatawah) {
    return <p>No fatawah found.</p>;
  }

  // Social media share URLs
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(memoizedFatawah.fatawah_title);

  return (
    <Layout>
      <div className="talaq-ahsan-container">
        <div className="header">
          <div className="header-left">
            <button className='btn btn-back' onClick={() => router.back()}>
              <i className='fa fa-angle-left'>&nbsp;</i> Back
            </button>
          </div>
          <div className="header-right">
            <p>REF No: {memoizedFatawah.RefNo}</p>
          </div>
        </div>

        <div className="answer-title-section">
          <h2>{memoizedFatawah.fatawah_title}</h2>
        </div>

        <div className="question-section bg-white">
          <div className="question-header">
            <h3><i className="fa fa-question">&nbsp;</i> Question</h3>
            <p>Date: {new Date(memoizedFatawah.Created_Date).toLocaleDateString()}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: memoizedFatawah.Question }} />
        </div>

        <div className="answer-section bg-white">
          <div className="answer-header">
            <h3><i className="fa fa-comment">&nbsp;</i> Answer</h3>
          </div>
          <div dangerouslySetInnerHTML={{ __html: memoizedFatawah.Answer }} />
        </div>

        <div className="bottom-content">
          <div className="bottom-content-left">
            {memoizedFatawah.fatawah_filename && (
              <a
                href={`https://admin.razvidaruliftabareilly.com/${memoizedFatawah.fatawah_filename}`} // update path as per your server setup
                className='btn btn-download-pdf'
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className='fa fa-download'>&nbsp;</i> Download Pdf
              </a>
            )}
          </div>
          <div className="bottom-content-right">
            <h2>Share this:</h2>
            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareTitle}`} aria-label="Share on Facebook">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a target="_blank" href={`https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`} aria-label="Share on WhatsApp">
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>
            <a target="_blank" href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} aria-label="Share on Twitter">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Answer;
