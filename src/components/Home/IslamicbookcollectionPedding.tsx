import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPencil,
  faAngleLeft,
  faAngleRight,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import islamicimg from "../../Assets/Images/latest-art-img.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import defaultImage from "../../Assets/Images/BookStatic.png";
import articalicon22 from "../../Assets/Images/Icons/articalicon22.png";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { GetLatestArticlesHome } from "@/services/Manage_services";
import { toast } from "react-toastify";

// ✅ Article Interface
interface Article {
  mid: string;
  Category: string;
  title: string;
  thumbnail: string;
  readtime: string;
  SubDescription: string;
}

const IslamicBookCollectionPedding: React.FC = () => {
  const [articleCollection, setArticleCollection] = useState<Article[]>([]);

  const GetArticals = async (): Promise<void> => {
    try {
      const response = await GetLatestArticlesHome();
      if (response?.statusCode === 200) {
        setArticleCollection(response.data);
      } else {
        toast.error("Failed to fetch article collection.");
      }
    } catch (error) {
      console.error("Error fetching article collection:", error);
      toast.error("Error fetching article collection.");
    }
  };

  useEffect(() => {
    GetArticals();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage.src;
  };


  // ✅ useMemo to memoize rendered articles
  const renderedArticles = useMemo(() => {
    if (articleCollection.length === 0) {
      return <p>No books available.</p>;
    }

    return articleCollection.map((article) => (
      <SwiperSlide key={article.mid}>
        <article
          className="thumbnail item bg-white"
          style={{ border: "1px solid #ccc" }}
        >
          <div className="latest-art-img position-relative">
            <img
              src={`https://admin.razvidaruliftabareilly.com/Uploads/${article.thumbnail}`}
              alt={article.title}
              onError={handleImageError}
            />
            <div className="img-overlay-txt">
              <span>
                <FontAwesomeIcon icon={faPencil} />{" "}
                {article.Category.length > 10
                  ? article.Category.slice(0, 10)
                  : article.Category}
              </span>
              <span>
                <FontAwesomeIcon icon={faListAlt} /> {article.readtime} min read
              </span>
            </div>
          </div>
          <div className="caption">
            <h4>
              {article.title.length > 30
                ? article.title.slice(0, 30) + "..."
                : article.title}
            </h4>
            <p className="flex-text" style={{height:'40px'}}>
              {article.SubDescription.split(" ").slice(0, 10).join(" ") + "..."}
            </p>
            <a
              href={`/ArticalDetails?mid=${article.mid}`}
              className="btn btn-readmore btn-block bg-white"
            >
              Read more
            </a>
          </div>
        </article>
      </SwiperSlide>
    ));
  }, [articleCollection]);

  return (
    <section className="islamic-book-collection padding100 position-relative">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-lg-11">
            <div className="latest-fatwa-title">
              <h1>
                <FontAwesomeIcon icon={faBook} /> Latest Articles
              </h1>
            </div>
            <p>
              Stay informed with insightful articles on Islamic faith,
              jurisprudence, history, and contemporary issues. Crafted by expert
              scholars, these articles offer in-depth guidance and reflections to
              help you navigate daily life while upholding Islamic values.
            </p>
          </div>
          <div className="col-12 col-lg-1">
            <div className="view-all-title">
              <Link href="/Articals">
                <button className="btn btn-view">View All Articles</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={15}
            breakpoints={{
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="mySwiper"
          >
            {renderedArticles}
          </Swiper>

          {/* Custom Navigation */}
          <div className="dots-show">
            <div className="swiper-button-prev owl-prev">
              <div className="prev-arrow">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
            </div>
            <div className="swiper-button-next owl-next">
              <div className="next-arrow">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
          </div>

          {/* Custom Dots */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default IslamicBookCollectionPedding;
