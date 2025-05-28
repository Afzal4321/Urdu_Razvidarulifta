import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/Layout';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { GetArticalDetailsByID, PageLatestArticleMain } from '@/services/Manage_services';
import {
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter,
} from 'react-icons/fa';
import Img1 from '../Assets/images/zakat.png';
import Link from 'next/link'; // Import the Link component

interface ArticleType {
  mid: string;
  thumbnail: string;
  Category: string;
  readtime: string;
  title: string;
  SubDescription: string;
  Author?: string;
  Description?: string;
}

export default function ArticalDetails() {
  const router = useRouter();
  const { mid } = router.query; // Get the article ID from the URL

  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [articlesData, setArticlesData] = useState<ArticleType[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<ArticleType[]>([]);
  const [articlesToShow] = useState(10); // Number of articles to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // This will be used to store the URL for sharing on social media
  const [shareUrl, setShareUrl] = useState('');
  const text = encodeURIComponent("Check this out!");

  // Check if we're in the browser before setting the share URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      setShareUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  // Fetch article details by ID
  const fetchArticleByMID = async () => {
    if (!mid) return;

    try {
      const response = await GetArticalDetailsByID(Number(mid));
      if (response?.statusCode === 200) {
        setArticle(response.data[0]);
      } else {
        toast.error('Failed to fetch article details.');
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
      toast.error('Error fetching article details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleByMID();
  }, [mid]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Fetch the list of articles
  const fetchArticles = async () => {
    try {
      const response = await PageLatestArticleMain();
      if (response?.statusCode === 200) {
        setArticlesData(response.data);
        setCurrentPage(1); // Reset page on new data
      } else {
        toast.error('Failed to fetch article collection.');
      }
    } catch (error) {
      console.error('Error fetching article collection:', error);
      toast.error('Error fetching article collection.');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * articlesToShow;
    const endIndex = startIndex + articlesToShow;
    setVisibleArticles(articlesData.slice(startIndex, endIndex));
  }, [articlesData, currentPage, articlesToShow]);

  const totalPages = Math.ceil(articlesData.length / articlesToShow);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10 text-xl font-semibold">Loading article...</div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="text-center py-10 text-xl font-semibold text-red-500">
          No article found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <div className="container mx-auto p-4"></div>

      {/* Main Content */}
      <div className="container">
        <div className="row">

          {/* Left Side - Article List with show/hide toggle and pagination */}
          <div className="col-12 col-lg-4">
            <div className="d-lg-none mb-3">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="articleGlanceMobile"
              >
                <i className="fa fa-bars">&nbsp;</i> Articles at Glance
              </button>
            </div>

            <div className={`d-lg-block ${isMobileMenuOpen ? 'd-block' : 'd-none'}`} id="articleGlanceMobile">
              <div className="article-item bg-dark-green text-white p-4 mb-4">
                <div className="article-item-text font-semibold text-lg">
                  Articles at Glance
                </div>
                <div data-svg-wrapper className="relative">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0007 26.6668L25.334 18.1335H20.6673C20.6673 13.8668 17.8673 5.3335 6.66732 5.3335C8.22332 5.3335 11.334 7.8935 11.334 18.1335H6.66732L16.0007 26.6668Z" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Display Latest Articles (paginated and clickable) */}
              <div className="latest-articles-list">
                {visibleArticles.map((articleItem) => (
                  <Link
                    key={articleItem.mid}
                    href={`/ArticalDetails?mid=${articleItem.mid}`} // Construct the link using the article ID
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} // Style the Link to behave like a div
                  >
                    <div className="flex items-center p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer"> {/* Added hover effect and cursor */}
                      <Image src={`https://admin.razvidaruliftabareilly.com/Uploads/${articleItem.thumbnail}`} alt={articleItem.title} width={60} height={60} onError={(e) => {
                        (e.target as HTMLImageElement).src = Img1.src; // Fallback image
                      }} />
                      <div className="ml-3">
                        <h6 className="font-bold" style={{ borderBottom: 'solid' }}>{articleItem.title}</h6>
                        <p className="text-sm text-gray-500">
                          {articleItem.SubDescription?.slice(0, 130)}
                          {articleItem.SubDescription?.length > 130 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination mt-4 flex justify-between">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="btn btn-outline-secondary rounded"
                  >
                    Previous
                  </button>
                  <span>{`Page ${currentPage} of ${totalPages}`}</span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-secondary rounded"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Article Details */}
          <div className="col-12 col-lg-8">
            {article?.thumbnail && (
              <Image
                src={`https://admin.razvidaruliftabareilly.com/Uploads/${article.thumbnail}`}
                alt="Article Thumbnail"
                className="rounded-lg article-thumbnail w-full"
                width={800}
                height={400}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = Img1.src; // Fallback image
                }}
              />
            )}

            <div className="article-header text-2xl font-bold mt-4">
              Topic: {article?.title || 'Loading...'}
            </div>
            <div className="article-author mt-2">
              Writer: {article?.Author || 'Unknown'}
            </div>
            <div className="mt-4">
              {article?.Description ? (
                <div className="text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: article.Description }} />
              ) : (
                <p>Loading article content...</p>
              )}
            </div>

            <div className="mt-4">
              <div className="mt-4">
                {/* Download Button */}
                <a
                  href="#"
                  download
                  className="btn btn-success"
                  style={{ padding: '3px 20px', borderRadius: '6px', textDecoration: 'none', color: 'white' }}
                >
                  Download
                </a>

                {/* Share Buttons (Only if we're in the client) */}
                {isClient && (
                  <div
                    style={{
                      marginTop: '20px',
                      display: 'flex',
                      gap: '15px',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>Share this:</span>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light"
                      title="Share on Facebook"
                    >
                      <FaFacebookF color="#1877F2" size={20} />
                    </a>

                    <a
                      href={`https://t.me/share/url?url=${shareUrl}&text=${text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light"
                      title="Share on Telegram"
                    >
                      <FaTelegramPlane color="#0088cc" size={20} />
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?text=${text}%20${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light"
                      title="Share on WhatsApp"
                    >
                      <FaWhatsapp color="#25D366" size={20} />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light"
                      title="Share on Twitter"
                    >
                      <FaTwitter color="#1DA1F2" size={20} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}