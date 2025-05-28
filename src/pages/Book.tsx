import Layout from '@/components/layouts/Layout'
import React from 'react'
import islamicbook1 from '../Assets/images/islamic-book1.jpg';
import book2 from '../Assets/images/book2.jpg';
import book3 from '../Assets/Images/book3.jpg';
import book4 from '../Assets/Images/book4.jpg';
import book5 from '../Assets/Images/book5.jpg';
import book6 from '../Assets/Images/book6.jpg';
import book7 from '../Assets/Images/book7.jpg';
import MySwiperComponent from '@/components/Home/MySwiperComponent';
import Bookscounter from '@/components/Home/Bookscounter';
import BookCont from '@/components/BookComp/BookCont';
import BookContDetails from '@/components/BookComp/BookContDetails';
import Bookslider from '@/components/Slider/Bookslider';


const Book = () => {
  return (
    <div>
      <Layout>

        <Bookslider />


        <BookCont />



      </Layout>
    </div>
  )
}

export default Book
