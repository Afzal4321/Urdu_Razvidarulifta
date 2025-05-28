import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

import { toast } from 'react-toastify';
import { GeSliderCall } from '@/services/Manage_services';

type BookDetails = {
  Title: string;
  Description: string;
  ImageURL: string;
  PageTitleID?: string;
};

const ArticalSlider = () => {
  const [books, setBooks] = useState<BookDetails[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const retrieveBooks = async () => {
    try {
      const res = await GeSliderCall('Artical');
      if (res?.statusCode === 200) {
        setBooks(res.data);
      } else {
        toast.error('Unable to load books.');
      }
    } catch (err) {
      console.error('Fetching issue:', err);
      toast.error('Something went wrong while loading books.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    retrieveBooks();
  }, []);

  if (isFetching) return <div>Loading books, please wait...</div>;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      loop
      pagination={{ clickable: true }}
      className="booksliderswip"
    >
      {books.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="book-caption-wrapper">
            <div className="book-caption-txt">
              <div className="book-slider-img">
                <img
                  className="img-fluid"
                  src={`https://admin.razvidaruliftabareilly.com/${item.ImageURL}`}
                 
                  alt={`Book - ${item.Title}`}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="book-caption-area">
                <h3>Article Of the Day</h3>
                <h2>{item.Title}</h2>
                <p className="d-none d-lg-block">{item.Description}</p>
                <a className="book-btn-readmore" href={`/ArticalDetails?mid=${item.PageTitleID}`}>Read Now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ArticalSlider;
