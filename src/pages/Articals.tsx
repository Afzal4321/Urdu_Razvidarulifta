import Layout from '@/components/layouts/Layout';
import React, { useEffect, useState, useMemo } from 'react';
import { PageLatestArticleMain } from '@/services/Manage_services';
import { toast } from 'react-toastify';
import Link from 'next/link';
import HeroSlider from '@/components/Home/HeroSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faPencil } from '@fortawesome/free-solid-svg-icons';
import ArticalSlider from '@/components/Slider/ArticalSlider';

interface ArticleType {
  mid: string;
  thumbnail: string;
  Category: string;
  readtime: string;
  title: string;
  SubDescription: string;
}

const Articals = () => {
  const [articlesData, setArticlesData] = useState<ArticleType[]>([]);

  const fetchArticals = async () => {
    try {
      const response = await PageLatestArticleMain();
      if (response?.statusCode === 200) {
        setArticlesData(response.data);
      } else {
        toast.error('Failed to fetch articles.');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Error fetching articles.');
    }
  };

  useEffect(() => {
    fetchArticals();
  }, []);

  // Memoize articlesData to prevent unnecessary re-renders
  const memoizedArticles = useMemo(() => {
    return articlesData.map((article) => (
      <div className="col-12 col-lg-4" key={article.mid}>
        <div className="artciles-box">
          <div
            className="thumbnail item bg-white"
            style={{ border: "1px solid #ccc" }}
          >
            <div className="latest-art-img position-relative artimgmain">
              <img
                src={`https://admin.razvidaruliftabareilly.com/Uploads/${article.thumbnail}`}
                className="img-fluid w-100"
                style={{ borderRadius: '7px' }}
                alt={article.title}
              />
              <div className="img-overlay-txt">
                <span>
                  <FontAwesomeIcon icon={faPencil} /> {article.Category.length > 10 ? article.Category.slice(0, 10) : article.Category}
                </span>
                <span>
                  <FontAwesomeIcon icon={faListAlt} /> {article.readtime}{" "}
                  min read
                </span>
              </div>
            </div>
          </div>
          <div className="aticals-content">
            <h6 style={{ marginTop: '6%', fontWeight: '800' }}>{article.title}</h6>
            <p>
              {article.SubDescription.length > 100
                ? `${article.SubDescription.substring(0, 100)}...`
                : article.SubDescription}
            </p>
            <a href={`/ArticalDetails?mid=${article.mid}`} className="btn btn-readmore btn-block bg-white">
              Read more
            </a>
          </div>
        </div>
      </div>
    ));
  }, [articlesData]); // Memoize the articles mapping based on articlesData

  return (
    <Layout>
      <div>
        <ArticalSlider />
        <section className="articles">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h5 className="pt-4" style={{ color: 'green', fontSize: '26px', fontWeight: '700' }}>Latest Articles</h5>
                <p>You are signed into Content Reel with your Google account. In addition to the basic features, here is what you can do:</p>
              </div>
            </div>
            <div className="row">
              {memoizedArticles}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Articals;
