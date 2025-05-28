import React, { useEffect, useState, useMemo } from 'react';
import { getsBookscounter } from '@/services/Manage_services';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface BookCounterData {
  TotalFatawas: number;
  TotalBooks: number;
  TotalArticals: number;
}

const Bookscounter: React.FC = () => {
  const [bookCollection, setBookCollection] = useState<BookCounterData>({
    TotalFatawas: 0,
    TotalBooks: 0,
    TotalArticals: 0
  });

  const fetchBookscounter = async () => {
    try {
      const response = await getsBookscounter();
      if (response?.statusCode === 200) {
        setBookCollection(response.data[0]);
      } else {
        toast.error('Failed to fetch book collection.');
      }
    } catch (error) {
      console.error('Error fetching book collection:', error);
      toast.error('Error fetching book collection.');
    }
  };

  useEffect(() => {
    fetchBookscounter();
  }, []);

  const fatawaMemo = useMemo(() => (
    <div className="books-box">
      <Link href="/Fatawa" passHref   style={{ textDecoration: 'none' }}>
        <div className="book-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M9 4H36.5V36H9C8.3099 36 7.66536 35.8958 7.06641 35.6875C6.46745 35.4792 5.93359 35.1927 5.46484 34.8281C4.99609 34.4635 4.63802 34.0417 4.39062 33.5625C4.14323 33.0833 4.01302 32.5625 4 32V8C4 7.44792 4.13021 6.93229 4.39062 6.45312C4.65104 5.97396 5.00911 5.54688 5.46484 5.17188C5.92057 4.79688 6.44792 4.51042 7.04688 4.3125C7.64583 4.11458 8.29688 4.01042 9 4ZM34 34V30H9C8.64844 30 8.32292 30.0521 8.02344 30.1562C7.72396 30.2604 7.46354 30.401 7.24219 30.5781C7.02083 30.7552 6.83854 30.9688 6.69531 31.2188C6.55208 31.4688 6.48698 31.7292 6.5 32C6.5 32.2812 6.5651 32.5417 6.69531 32.7812C6.82552 33.0208 7.0013 33.2292 7.22266 33.4062C7.44401 33.5833 7.71094 33.7292 8.02344 33.8438C8.33594 33.9583 8.66146 34.0104 9 34H34ZM34 28V6H9C8.64844 6 8.32292 6.05208 8.02344 6.15625C7.72396 6.26042 7.46354 6.40104 7.24219 6.57812C7.02083 6.75521 6.83854 6.96875 6.69531 7.21875C6.55208 7.46875 6.48698 7.72917 6.5 8V28.5312C7.28125 28.1771 8.11458 28 9 28H34ZM19 24V14H21.5V24H19ZM19 12V10H21.5V12H19Z" fill="#262626" stroke="#262626" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="book-title">Total Fatawas</div>
        <div className="counter">{bookCollection.TotalFatawas}</div>
      </Link>
    </div>
  ), [bookCollection.TotalFatawas]);

  const booksMemo = useMemo(() => (
    <div className="books-box">
      <Link href="/Book" passHref  style={{ textDecoration: 'none' }}>
        <div className="book-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="34" viewBox="0 0 36 34" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M33.9143 1H20.5048L19.6514 1.40506L18.0667 3.13333L16.4819 1.40506L15.6286 1H2.21905L1 2.35021V29.3544L2.21905 30.7046H15.1166L17.2133 33H18.92L21.0168 30.7046H33.9143L35.1333 29.3544V2.35021L33.9143 1ZM16.8476 28.8684L16.4088 28.4093L15.6286 28.0042H3.4381V3.70042H15.1166L16.9208 5.69873L16.8476 28.8684ZM32.6952 28.0042H20.5048L19.6514 28.4093L19.3101 28.7603V5.59072L21.0168 3.70042H32.6952V28.0042ZM13.1905 9.10126H5.87619V11.8017H13.1905V9.10126ZM13.1905 19.903H5.87619V22.6034H13.1905V19.903ZM5.87619 14.5021H13.1905V17.2025H5.87619V14.5021ZM30.2571 9.10126H22.9429V11.8017H30.2571V9.10126ZM22.9429 14.5021H30.2571V17.2025H22.9429V14.5021ZM22.9429 19.903H30.2571V22.6034H22.9429V19.903Z" fill="#262626" stroke="#262626" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="book-title">Total Books</div>
        <div className="counter">{bookCollection.TotalBooks}</div>
      </Link>
    </div>
  ), [bookCollection.TotalBooks]);

  const articlesMemo = useMemo(() => (
    <div className="books-box">
      <Link href="/Articals" passHref  style={{ textDecoration: 'none' }}>
        <div className="book-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10.75 28C10.75 28.6904 11.3096 29.25 12 29.25H22C22.6904 29.25 23.25 28.6904 23.25 28C23.25 27.3096 22.6904 26.75 22 26.75H12C11.3096 26.75 10.75 27.3096 10.75 28ZM10.75 20C10.75 20.6904 11.3096 21.25 12 21.25H28C28.6904 21.25 29.25 20.6904 29.25 20C29.25 19.3096 28.6904 18.75 28 18.75H12C11.3096 18.75 10.75 19.3096 10.75 20ZM10.75 12C10.75 12.6904 11.3096 13.25 12 13.25H28C28.6904 13.25 29.25 12.6904 29.25 12C29.25 11.3096 28.6904 10.75 28 10.75H12C11.3096 10.75 10.75 11.3096 10.75 12ZM3.75 32C3.75 34.3472 5.65279 36.25 8 36.25H32C34.3472 36.25 36.25 34.3472 36.25 32V8C36.25 5.65279 34.3472 3.75 32 3.75H8C5.65279 3.75 3.75 5.65279 3.75 8V32ZM10 33.75C7.92893 33.75 6.25 32.0711 6.25 30V10C6.25 7.92893 7.92893 6.25 10 6.25H30C32.0711 6.25 33.75 7.92893 33.75 10V30C33.75 32.0711 32.0711 33.75 30 33.75H10Z" fill="#262626" stroke="#262626" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="book-title">Total Articles</div>
        <div className="counter">{bookCollection.TotalArticals}</div>
      </Link>
    </div>
  ), [bookCollection.TotalArticals]);

  return (
    <section className="Books-counter">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {fatawaMemo}
          {booksMemo}
          {articlesMemo}
        </div>
      </div>
    </section>
  );
};

export default Bookscounter;
