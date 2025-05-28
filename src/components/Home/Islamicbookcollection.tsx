import React, { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPencil, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { GetIslamicBookCollection } from '@/services/Manage_services';
import { toast } from 'react-toastify';
import defaultImage from '../../Assets/Images/BookStatic.png';

// ✅ Interface for the book items
interface BookItem {
  mid: number;
  Title: string;
  author_name: string;
  Language: string;
  thumbnail: string;
}

const Islamicbookcollection = () => {
  const [BookCollection, setBookCollection] = useState<BookItem[]>([]);

  const fetchLatestIslamicBooks = async () => {
    try {
      const response = await GetIslamicBookCollection('All', 'Author');
      if (response?.statusCode === 200) {
        setBookCollection(response.data);
      } else {
        toast.error('Failed to fetch book collection.');
      }
    } catch (error) {
      console.error('Error fetching book collection:', error);
      toast.error('Error fetching book collection.');
    }
  };

  useEffect(() => {
    fetchLatestIslamicBooks();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage.src;
  };

  const renderedBooks = useMemo(() => {
    if (!BookCollection || BookCollection.length === 0) {
      return <p>No books available.</p>;
    }

    return BookCollection.map((book) => (
      <SwiperSlide key={book.mid} className="thumbnail item">
        <article >
          <a href="/Book">
            <img
              src={`https://admin.razvidaruliftabareilly.com/${book.thumbnail}`}
              alt={book.Title}
              className="img-fluid w-100"
              onError={handleImageError}
            />
          </a>
          <div className="caption">
            <h4 className="pt-3" style={{ fontSize: '14px' }}>
              {book.Title.length > 30 ? `${book.Title.slice(0, 30)}...` : book.Title}
            </h4>

            <p className="flex-text" style={{ marginBottom: '0px' }}>
              <FontAwesomeIcon icon={faPencil} /> {book.author_name}
            </p>
            <span className="lang-txt">
              <FontAwesomeIcon icon={faLanguage} /> {book.Language}
            </span>
          </div>
        </article>
      </SwiperSlide>
    ));
  }, [BookCollection]);

  return (
    <section className="islamic-book-collection1">
      <div className="container">
        <div className="row mb-lg-5 my-4 align-items-center">
          <div className="col-12 col-lg-11">
            <div className="latest-fatwa-title">
              <h1><FontAwesomeIcon icon={faBook} /> Islamic Book Collection</h1>
            </div>
            Immerse yourself in our curated library of authentic Islamic books on Tafsir, Hadith, Fiqh, Aqeedah, and spirituality. Whether scholarly, classical, or contemporary, these resources empower students, researchers, and seekers to deepen their understanding of Islam.
          </div>
          <div className="col-12 col-lg-1">
            <div className="view-all-title">
              <Link href="/Book">
                <button className="btn btn-view">Explore Library</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <Swiper
            spaceBetween={15}
            breakpoints={{
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            loop
            autoplay={false}
            modules={[Navigation]}
          >
            {renderedBooks}
          </Swiper>
          
        </div>
      </div>
    </section>
  );
};

export default Islamicbookcollection;
