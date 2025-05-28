import React, { useEffect, useState } from 'react';
import icon1book from '../../Assets/images/Icons/Read.png';
import icon2book from '../../Assets/images/Icons/Download.png';
import defaultImage from '../../Assets/Images/BookStatic.png';

import {
  Getbook_masterFront,
  GetBookDetails,
  GetIslamicBookCollection,
  PageGetgetauthor,
} from '@/services/Manage_services';
import { toast } from 'react-toastify';

type Book = {
  mid: number;
  Title: string;
  author_name: string;
  thumbnail: string;
  FileURL?: string;
  Language?: string;
  Created_By?: string;
  BookCategory?: string;
  TotalNoofPages?: number;
  description?: string;
};

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const BookCont = () => {
  const [BookCollection, setBookCollection] = useState<Book[]>([]);
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [isBookDetailsVisible, setIsBookDetailsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | number>('All');
  const [BookMaster, SetBookMaster] = useState<
    { MID: number; BookCategory: string }[]
  >([]);
  const [AuthorMaster, SetAuthorMaster] = useState<
    { Mid: number; Name: string }[]
  >([]);
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<'Category' | 'Author'>(
    'Category'
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    if (selectedType === 'Author') {
      fatchAuthormaster();
    } else {
      FatchBookMaster();
    }
  }, [selectedType]);

  useEffect(() => {
    fetchLatestIslamicBooks('All', selectedType);
  }, []);

  const fatchAuthormaster = async () => {
    try {
      const response = await PageGetgetauthor();
      if (response?.statusCode === 200) {
        SetAuthorMaster(response.data);
      } else {
        toast.error('Failed to fetch authors.');
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
      toast.error('Error fetching authors.');
    }
  };

  const FatchBookMaster = async () => {
    try {
      const response = await Getbook_masterFront();
      if (response?.statusCode === 200) {
        SetBookMaster(response.data);
      } else {
        toast.error('Failed to fetch book categories.');
      }
    } catch (error) {
      console.error('Error fetching book categories:', error);
      toast.error('Error fetching book categories.');
    }
  };

  const fetchLatestIslamicBooks = async (
    Book_Name: string | number,
    selectedType: string
  ): Promise<void> => {
    try {
      // **Explicitly convert Book_Name to a string**
      const bookNameString = String(Book_Name);
      const response = await GetIslamicBookCollection(bookNameString, selectedType);
      if (response?.statusCode === 200) {
        setBookCollection(response.data);
        setIsBookDetailsVisible(false);
      } else {
        toast.error('Failed to fetch book collection.');
      }
    } catch (error) {
      console.error('Error fetching book collection:', error);
      toast.error('Error fetching book collection.');
    }
  };

  const handleBookClick = async (bookId: number) => {
    try {
      const response = await GetBookDetails(bookId);
      if (response?.statusCode === 200) {
        setBookDetails(response.data[0]);
        setIsBookDetailsVisible(true);
      } else {
        toast.error('Failed to fetch book details.');
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      toast.error('Error fetching book details.');
    }
  };

  const handleTabClick = async (Mid: string | number) => {
    setSelectedTab(Mid);
    await fetchLatestIslamicBooks(Mid, selectedType);
    setCurrentPage(1);
    setSearchText('');
    setIsMobileMenuOpen(false);
  };


  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage.src;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredBooks = BookCollection.filter(
    (book) =>
      book.Title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event :any) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
      setCurrentPage(1);
    };

    recognition.onerror = (event :any) => {
      toast.error('Speech recognition error: ' + event.error);
    };

    recognition.start();
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const downloadWithPicker = async () => {
    const response = await fetch(`https://admin.razvidaruliftabareilly.com/${bookDetails?.FileURL}`);
    const blob = await response.blob();
  
    // Check for support
    if ('showSaveFilePicker' in window) {
      const opts = {
        suggestedName: bookDetails?.Title ? `${bookDetails.Title}.pdf` : 'file.pdf',
        types: [{
          description: 'PDF files',
          accept: { 'application/pdf': ['.pdf'] },
        }],
      };
  
      const handle = await (window as any).showSaveFilePicker(opts);
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } else {
      alert("Your browser doesn't support save file picker.");
    }
  };
  
  return (
    <div>
      <section className="pt-lg-5 pt-0">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-lg-12">
              <div className="guiding-light pb-3 text-center">
                <h2
                  style={{
                    textAlign: 'left',
                    color: '#008B11',
                    fontFamily: 'Inter',
                    fontWeight: '700',
                    lineHeight: 'normal',
                  }}
                >
                  Guiding Light of Books
                </h2>
                <p style={{ textAlign: 'left' }}>
                  Discover reliable, faith-centered answers on daily issues,
                  grounded in Sunni values, shaping and enriching Muslim lives.
                  Discover reliable, faith-centered answers on daily issues,
                  grounded in Sunni values, shaping and enriching Muslim lives.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Mobile Menu Toggle Button */}
            <div className="col-12 d-lg-none mb-3">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={toggleMobileMenu}
              >
                <i className="fa fa-bars">&nbsp;</i> All Show
              </button>
            </div>

            {/* Sidebar - Vertical Tabs (Hidden on Mobile after toggle) */}
            <div
              className={`col-12 col-lg-3 ${
                isMobileMenuOpen ? '' : 'd-none d-lg-block'
              }`}
            >
              <div className="verticle-left">
                <div className="verticle-left">
                  {selectedType === 'Author' ? (
                    <div
                      className="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {/* Render "All Author" tab */}
                      <a
                        className={`nav-link ${
                          selectedTab === 'All' ? 'active' : ''
                        }`}
                        onClick={() => handleTabClick('All')}
                        role="tab"
                        style={{ cursor: 'pointer' }}
                      >
                        All Author
                      </a>

                      {/* Render AuthorMaster items or show message if empty */}
                      {AuthorMaster.length > 0 ? (
                        AuthorMaster.map((author) => (
                          <a
                            key={author.Mid}
                            className={`nav-link ${
                              selectedTab === author.Name ? 'active' : ''
                            }`}
                            onClick={() => handleTabClick(author.Name)}
                            role="tab"
                            style={{ cursor: 'pointer' }}
                          >
                            {author.Name}
                          </a>
                        ))
                      ) : (
                        <p>No authors available at the moment.</p>
                      )}
                    </div>
                  ) : (
                    <div
                      className="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {/* Render "All Books" tab */}
                      <a
                        className={`nav-link ${
                          selectedTab === 'All' ? 'active' : ''
                        }`}
                        onClick={() => handleTabClick('All')}
                        role="tab"
                      >
                        All Books
                      </a>

                      {/* Render BookMaster items or show message if empty */}
                      {BookMaster.length > 0 ? (
                        BookMaster.map((BookM) => (
                          <a
                            key={BookM.MID}
                            className={`nav-link ${
                              selectedTab === BookM.MID ? 'active' : ''
                            }`}
                            onClick={() => handleTabClick(BookM.MID)}
                            role="tab"
                          >
                            {BookM.BookCategory}
                          </a>
                        ))
                      ) : (
                        <p>No books available at the moment.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="RightSideContent">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" role="tabpanel">
                    <ul
                      className="nav nav-tabs mb-4 mt-4 mt-lg-0"
                      id="home-category-tab"
                      role="tablist"
                    >
                      <li className="nav-item w-50">
                        <a
                          className={`nav-link mx-0 by-category ${
                            selectedType === 'Category' ? 'active' : ''
                          }`}
                          onClick={() => {
                            setSelectedType('Category');
                            setSelectedTab('All');
                            FatchBookMaster();
                          }}
                          role="tab"
                        >
                          By Category
                        </a>
                      </li>
                      <li className="nav-item w-50">
                        <a
                          className={`nav-link by-author ${
                            selectedType === 'Author' ? 'active' : ''
                          }`}
                          onClick={() => {
                            setSelectedType('Author');
                            setSelectedTab('All');
                            fatchAuthormaster();
                          }}
                          role="tab"
                        >
                          By Author
                        </a>
                      </li>
                    </ul>

                    <div
                      className="tab-content mt-3"
                      id="home-category-tabContent"
                    >
                      <div className="books_area">
                        <div className="search-box">
                          <input
                            type="text"
                            placeholder="Search here..."
                            value={searchText}
                            onChange={(e) => {
                              setSearchText(e.target.value);
                              setCurrentPage(1);
                            }}
                          />
                          <i
                            className="fa fa-search search-icon"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setCurrentPage(1);
                            }}
                          ></i>

                          {/* Microphone for voice search */}
                          <i
                            className="fa fa-microphone mic-icon"
                            style={{ cursor: 'pointer' }}
                            onClick={() => startListening()}
                          ></i>
                        </div>

                        {!isBookDetailsVisible && (
                          <div className="row mt-6">
                            {currentBooks.length > 0 ? (
                              currentBooks.map((book, index) => (
                                <div
                                  className="col-12 col-lg-4 mb-3"
                                  key={index}
                                >
                                  <article
                                    className="thumbnail1 mb-3 mt-3 tabmaincls"
                                    onClick={() => handleBookClick(book.mid)}
                                  >
                                    <a>
                                      <img
                                        src={`https://admin.razvidaruliftabareilly.com/${book.thumbnail}`}
                                        className="img-fluid"
                                        onError={handleImageError}
                                      />
                                    </a>
                                    <div className="caption">
                                      <h6 className="pt-3" style={{ fontWeight: 700 }}>
                                        {book.Title}
                                      </h6>
                                      <p className="flex-text mb-0">
                                        <i
                                          className="fa fa-pencil"
                                          aria-hidden="true"
                                        >
                                          &nbsp;
                                        </i>{' '}
                                        {book.author_name}
                                      </p>
                                      <span className="lang-txt">
                                        <i
                                          className="fa fa-language"
                                          aria-hidden="true"
                                        >
                                          &nbsp;
                                        </i>{' '}
                                        {book.Language}
                                      </span>
                                    </div>
                                  </article>
                                </div>
                              ))
                            ) : (
                              <p>No books available.</p>
                            )}
                          </div>
                        )}

                        {/* Pagination Controls */}
                        {BookCollection.length > booksPerPage &&
                          !isBookDetailsVisible && (
                            <div className="pagination-controls mt-4 text-center">
                              <button
                                className="btn btn-outline-primary me-2"
                                onClick={() =>
                                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>

                              <span>
                                {' '}
                                Page {currentPage} of {totalPages}{' '}
                              </span>

                              <button
                                className="btn btn-outline-primary ms-2"
                                onClick={() =>
                                  setCurrentPage((prev) =>
                                    Math.min(prev + 1, totalPages)
                                  )
                                }
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </div>
                          )}

                        {isBookDetailsVisible && bookDetails && (
                          <div>
                            <div className="book-container1">
                              {/* Book Thumbnail */}
                              <img
                                className="book-thumbnail1"
                                src={`https://admin.razvidaruliftabareilly.com/${bookDetails.thumbnail}`}
                                alt="Book Thumbnail"
                              />

                              {/* Book Details Section */}
                              <div className="book-info1">
                                <div className="book-header1">
                                  <div className="book-title1 pt-3 pt-lg-0">
                                    {bookDetails?.Title}
                                  </div>
                                  <div className="book-author1">
                                    Author: {bookDetails?.author_name}
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="action-buttons1">
                                  {/* Open in New Tab */}
                                  <a
                                    href={`https://admin.razvidaruliftabareilly.com/${bookDetails?.FileURL}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="action-button1"
                                  >
                                    <img
                                      className="icon1"
                                      src={icon1book.src}
                                      alt="Read Icon"
                                    />
                                    <span>Read</span>
                                  </a>

                                  {/* Download File */}
                                  <a
                                    href={`https://admin.razvidaruliftabareilly.com/${bookDetails?.FileURL}`}
                                    download
                                    className="action-button1" style={{background:'green',color:'white'}}
                                  >
                                    <img
                                      className="icon1"
                                      src={icon2book.src}
                                      alt="Download Icon"
                                    />
                                    <span>Download</span>
                                  </a>
                                </div>

                                {/* Additional Book Information */}
                                <div className="book-meta1">
                                  <div>Publisher: {bookDetails?.Created_By}</div>
                                  <div>Category: {bookDetails?.BookCategory}</div>
                                  <div>
                                    Total Pages: {bookDetails?.TotalNoofPages}
                                  </div>
                                  <div>Language: {bookDetails?.Language}</div>
                                </div>
                              </div>
                            </div>

                            {/* Book Description */}
                            <div className="description-title1">Description :</div>
                            <div className="description-text1">
                              {bookDetails?.description ||
                                'No description available.'}
                            </div>

                            
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookCont;