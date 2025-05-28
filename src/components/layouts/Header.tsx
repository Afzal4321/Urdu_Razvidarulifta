import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Asset imports
import logo from '../../Assets/Images/Logo.svg';
import minlogo from '../../Assets/Images/mobilelogo.svg';
import avatar5 from '../../Assets/Images/avatar4.png';

// Service import
import { getSearchGlobal } from '@/services/Manage_services';

// Component import
import Login from '../Auth/Login';


// Define types for better type safety and clarity
type SearchDataItem = {
  id: string;
  title: string;
  category: string;
  author?: string; // Optional author
  keywords?: string[]; // Optional keywords
  details?: string; // Optional details/summary
  // Add other relevant fields from your global search data based on the logged structure
  // Assuming other properties like 'isSuccess', 'statusCode', 'message' are not part of SearchDataItem
};

// Using the same type for filtered results
type FilteredSearchResultItem = SearchDataItem;


const Header: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeMenu, setActiveMenu] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localSession, setLocalSession] = useState<string | null>(null);
  const [searchText, setSearchText] = useState(''); // Immediate input text
  const [debouncedSearchText, setDebouncedSearchText] = useState(''); // Debounced text for searching
  // Initialize globalSearchData as an empty array
  const [globalSearchData, setGlobalSearchData] = useState<SearchDataItem[]>(
    []
  ); // Store fetched data
  const [loadingSearchData, setLoadingSearchData] = useState(true); // Loading state for initial fetch
  const [searchIsActive, setSearchIsActive] = useState(false); // State to control search results popover visibility

  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        setLoadingSearchData(true);
        const response = await getSearchGlobal();
        // *** FIX: Access the 'data' property from the response object ***
        const searchDataArray = response?.data; // Use optional chaining in case response is null/undefined

        // Add a check to ensure the extracted data is an array before setting state
        if (Array.isArray(searchDataArray)) {
          setGlobalSearchData(searchDataArray);
        } else {
          console.error('API response data property is not an array:', response);
           // Set to empty array to prevent errors if API structure changes unexpectedly
          setGlobalSearchData([]);
          // Optionally, set an error state to display a message to the user
        }
      } catch (error) {
        console.error('Failed to fetch global search data:', error);
         // Set to empty array on fetch error
        setGlobalSearchData([]);
        // Optionally, set an error state
      } finally {
        setLoadingSearchData(false);
      }
    };

    fetchSearchData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Session Handling ---
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
       const session = sessionStorage.getItem('user');
       setLocalSession(session);
    }
  }, []);

  const handleLogout = useCallback(() => {
    // Ensure this runs only on the client side
     if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
     }
    setLocalSession(null); // Update state
    router.push('/');
  }, [router]);

  const handleLanguageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLanguage(event.target.value);
      // Implement actual language change logic here (e.g., using i18n library)
    },
    []
  );

  // --- Active Menu Highlighting ---
  useEffect(() => {
    setActiveMenu(router.pathname);
  }, [router.pathname]);

  const handleMenuClick = useCallback(
    (path: string) => {
      setActiveMenu(path);
      router.push(path);
    },
    [router]
  );

  // --- Search Logic with Manual Debouncing and Basic Filtering ---

   // Effect to manually debounce the search text state update
   useEffect(() => {
       // Set a timeout to update debouncedSearchText after a delay
       const handler = setTimeout(() => {
           setDebouncedSearchText(searchText);
       }, 300); // Debounce delay (e.g., 300ms)

       // Cleanup: Clear the timeout if searchText changes before the delay
       // or if the component unmounts
       return () => {
           clearTimeout(handler);
       };
   }, [searchText]); // Re-run effect when searchText changes

   // Memoized function to perform basic filtering based on the debounced text
   const filteredSearchResults = useMemo<FilteredSearchResultItem[]>(() => {
        // Don't perform search if data is still loading or debounced text is empty
        if (loadingSearchData || !debouncedSearchText) {
            return [];
        }

        // *** Add a defensive check here as well before calling filter ***
        // Although we are now correctly setting the state, this adds robustness
        if (!Array.isArray(globalSearchData)) {
             console.error('globalSearchData is not an array during filtering:', globalSearchData);
             return []; // Return empty array if data is unexpectedly not an array
        }

        const lowerCaseQuery = debouncedSearchText.toLowerCase();

        // Basic filtering: Check if any of the search terms are included
        // in title, author, category, or keywords.
        const queryTerms = lowerCaseQuery.split(/\s+/).filter(term => term.length > 0);

        if (queryTerms.length === 0) {
            return [];
        }


        const results = globalSearchData.filter((item) => {
            // Check if ANY query term matches ANY searchable field
             return queryTerms.some(term =>
                item.title.toLowerCase().includes(term) ||
                item.author?.toLowerCase().includes(term) ||
                item.category?.toLowerCase().includes(term) ||
                item.keywords?.some(keyword => keyword.toLowerCase().includes(term))
             );
        });

        // Optionally, limit the results if needed for the dropdown
        return results.slice(0, 10); // Limit to first 10 results

    }, [debouncedSearchText, globalSearchData, loadingSearchData]); // Recalculate when debounced text, global data, or loading state changes


  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchText(value); // Update immediate searchText state
      // Control popover visibility: show if there's text, hide otherwise
      setSearchIsActive(value.length > 0);
      // The debouncing effect (in useEffect) will update debouncedSearchText after a delay
    },
    [] // No dependencies needed as it only updates state
  );

  const clearSearch = useCallback(() => {
    setSearchText('');
    setDebouncedSearchText(''); // Also clear the debounced state
    setSearchIsActive(false); // Hide the popover
    if (searchInputRef.current) {
      searchInputRef.current.value = ''; // Clear input field
    }
    // The useEffect cleanup will handle canceling any pending debounced handler calls
  }, []);


  const handleSearchResultClick = useCallback(
    (itemId: string) => {
      clearSearch(); // Clear search and hide popover when a result is clicked
      router.push(`/details/${itemId}`); // Navigate to a details page
    },
    [router, clearSearch]
  );

  // Handle focus and blur on search input to control popover visibility
  const handleSearchInputFocus = useCallback(() => {
      // Show the popover immediately on focus if there's already text
    if (searchText.length > 0) {
        setSearchIsActive(true);
    }
     // If no text, searchIsActive remains false, no popover shown yet
  }, [searchText]);

  const handleSearchInputBlur = useCallback(() => {
    // Delay hiding the popover to allow a click event on a search result to register.
    // If a search result is clicked, handleSearchResultClick is called,
    // which calls clearSearch, setting searchIsActive to false,
    // and the timeout's effect of setting searchIsActive to false is effectively cancelled
    // because it's already false.
    setTimeout(() => {
      setSearchIsActive(false);
    }, 100); // Adjust delay as needed (100ms is usually sufficient)
  }, []);


  // Memoized component for the search results popover
  const memoizedSearchResults = useMemo(() => {
    // Don't render the popover if search is not active
    if (!searchIsActive) {
      return null;
    }

    // Show loading indicator if fetching initial data AND there's text in the search bar
    if (loadingSearchData && searchText.length > 0) {
        return (
            <div
                className="search-results-popbar rounded-md shadow-md mt-2 px-4 py-3 bg-white border border-gray-200 text-gray-600"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 10,
                }}
                 onMouseDown={(e) => e.preventDefault()} // Prevent closing on click inside
            >
                Loading search data...
            </div>
        );
    }

    // If data is loaded and search is active, show results based on debounced text
    // Only show results if there's debounced text (meaning search input has content and debounce delay passed)
    if (debouncedSearchText.length > 0) {
      if (filteredSearchResults.length > 0) {
        return (
          <div
            className="search-results-popbar rounded-md shadow-md mt-2"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              zIndex: 10,
              border: '1px solid #ddd',
              maxHeight: '300px', // Limit height and add scroll
              overflowY: 'auto',
            }}
            // Prevent the popover from closing immediately on click inside
            onMouseDown={(e) => e.preventDefault()}
          >
            <ul className="divide-y divide-gray-200">
              {filteredSearchResults.map((item, index) => {
                // Using FilteredSearchResultItem type directly
                return (
                  <li
                    key={item.id || index} // Use item.id if available, fallback to index
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ease-in-out"
                    onClick={() => handleSearchResultClick(item.id)}
                  >
                    <strong className="text-gray-800">{item.title}</strong>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="mr-2">
                        Category:{' '}
                        <span className="font-medium text-indigo-600">
                          {item.category}
                        </span>
                      </span>
                      {item.author && (
                        <span>
                          By:{' '}
                          <span className="font-medium text-green-600">
                            {item.author}
                          </span>
                        </span>
                      )}
                    </p>
                     {/* Optionally display a snippet or details field if available */}
                     {/* {item.details && <p className="text-xs text-gray-400 mt-1">{item.details.substring(0, 100)}...</p>} */}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        // No results found for the debounced text
        return (
          <div
            className="search-results-popbar rounded-md shadow-md mt-2 px-4 py-3 bg-white border border-gray-200 text-gray-600"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10,
            }}
             onMouseDown={(e) => e.preventDefault()} // Prevent closing on click inside
          >
            No results found for "{debouncedSearchText}".
          </div>
        );
      }
    }

    // If search is active but debouncedSearchText is empty (e.g., user just focused or typed and cleared quickly)
    // Or if globalSearchData is empty and not loading, indicate no data is available for search
    if (searchIsActive && globalSearchData.length === 0 && !loadingSearchData) {
         return (
            <div
                className="search-results-popbar rounded-md shadow-md mt-2 px-4 py-3 bg-white border border-gray-200 text-gray-600"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 10,
                }}
                 onMouseDown={(e) => e.preventDefault()} // Prevent closing on click inside
            >
                No search data available.
            </div>
         );
    }


    // Don't show anything else if no text, search is inactive, or debounced text hasn't updated yet
    return null;

  }, [searchText, debouncedSearchText, filteredSearchResults, handleSearchResultClick, searchIsActive, loadingSearchData, globalSearchData]); // Added globalSearchData as dependency

  return (
    <>
      {/* Top Header */}
      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-4 col-lg-4">
              <div className="languages">
                <select
                  className="form-control"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>
            </div>
            <div className="col-8 col-lg-8">
              <div className="Location">
                {/* Optional: Add location or dateInfo */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            {/* Logo */}
            <Link href="/" className="navbar-brand">
              <Image src={logo} alt="Logo" className="d-none d-md-inline" />
              <Image src={minlogo} alt="Mini Logo" className="d-inline d-md-none" />
            </Link>

            {/* Navigation Links */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav justify-content-between mx-auto py-4 py-md-0">
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeMenu === '/' ? 'active' : ''}`}
                    onClick={() => handleMenuClick('/')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-home me-1" /> ھوم
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeMenu === '/Fatawa' ? 'active' : ''
                    }`}
                    onClick={() => handleMenuClick('/Fatawa')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-clipboard me-1" /> فتاوی
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeMenu === '/Book' ? 'active' : ''
                    }`}
                    onClick={() => handleMenuClick('/Book')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-book me-1" /> کتب
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeMenu === '/Articals' ? 'active' : ''
                    }`}
                    onClick={() => handleMenuClick('/Articals')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-file-text me-1" /> مضامین
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeMenu === '/About' ? 'active' : ''
                    }`}
                    onClick={() => handleMenuClick('/About')}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-info-circle me-1" /> ہمارے متعلق
                  </a>
                </li>
              </ul>

              {/* Search Box */}
              <div
                className="searchdiv"
                style={{ position: 'relative', width: '100%', maxWidth: '400px' }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Fatwa, Books and Articles"
                  value={searchText}
               
                  onChange={handleInputChange}
                  onFocus={handleSearchInputFocus}
                  onBlur={handleSearchInputBlur}
                  style={{
                    borderRadius: '25px',
                    padding: '10px 50px 10px 20px',
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                />
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '3px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '8px 15px',
                    borderRadius: '25px',
                    backgroundColor: 'green',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={() => searchText && !loadingSearchData && setDebouncedSearchText(searchText)}
                   onMouseOver={(e) =>
                      !loadingSearchData && searchText.length > 0 && ((e.target as HTMLElement).style.backgroundColor = '#00a012')
                    }
                    onMouseOut={(e) =>
                       !loadingSearchData && searchText.length > 0 && ((e.target as HTMLElement).style.backgroundColor = 'green')
                    }
                    disabled={loadingSearchData || searchText.length === 0} // Disable button while loading or no text
                >
                  <i className="fa fa-search"></i>
                </button>

                {/* Memoized Search Results Popbar */}
                {memoizedSearchResults}

                {/* Removed Memoized Trending Topics Popbar */}
              </div>
            </div>

            {/* Right Buttons */}
            <div className="login-signup ms-3">
              <Link href="/AskFatawa" passHref>
                <button
                  className="btn btn-view"
                  style={{
                    color: 'white',
                    background: 'green',
                    fontSize: 13,

                    fontWeight: '700',
                    lineHeight: 2,
                  }}
                >
                 سوال پوچھیں
                </button>
              </Link>

              {localSession === null ? (
                <button
                  className="btn btn-viewlogin"
                  onClick={() => setIsModalOpen(true)}
                >
                  لاگ ان
                </button>
              ) : (
                <div className="navbar-custom-menu ml-3">
                  <ul className="nav navbar-nav">
                    <li className="dropdown dropdown-user admin-user open">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="true"
                      >
                        <div className="user-image">
                          <Image
                            src={avatar5}
                            className="img-circle"
                            height={40}
                            width={40}
                            alt="User"
                          />
                        </div>
                      </a>
                      <ul className="dropdown-menu" style={{ padding: '8px' }}>
                        <li>
                          <a href="#">
                            <i className="fa fa-bookmark" /> Saved
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-user" /> Profile
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={handleLogout}>
                            <i className="fa fa-sign-out-alt" /> Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
        </div>
      </header>

      {/* Login Modal */}
      {isModalOpen && (
        <Login
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={() => setLocalSession(sessionStorage.getItem('user'))}
        />
      )}
    </>
  );
};

export default Header;