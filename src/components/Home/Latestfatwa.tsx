import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getLatestFatawa } from '@/services/Manage_services';
import DOMPurify from 'dompurify';
import LatestImg from '../../Assets/Images/latest-img.png';
import { toast } from 'react-toastify';

// Function to sanitize HTML content using DOMPurify
const createSanitizedMarkup = (htmlContent: string) => {
  return { __html: DOMPurify.sanitize(htmlContent) as string }; // Explicitly type as string
};

type Fatwa = {
  MID: number;
  fatawah_title: string;
  Created_Date: string;
  RefNo: string;
  fatawah_description: string;
  Answer:string
};

const Latestfatwa = () => {
  const [latestFatawa, setLatestFatawa] = useState<Fatwa[]>([]);

  const fetchLatestFatawa = async () => {
    try {
      const response = await getLatestFatawa();
      if (response?.statusCode === 200) {
        setLatestFatawa(response.data);
      } else {
        toast.error('Failed to fetch fatawa.');
      }
    } catch (error) {
      console.error('Error fetching fatawa:', error);
      toast.error('Error fetching fatawa.');
    }
  };

  useEffect(() => {
    fetchLatestFatawa();
  }, []);

  return (
    <div>
      <section className="latest_fatawa">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 col-lg-8">
              <div className="latest-fatwa-title">
                <h1>
                  <FontAwesomeIcon icon={faBook} /> Latest Fatawa
                </h1>
                Discover qualified scholars’ Islamic rulings on modern and
                traditional issues, grounded in the Quran and Sunnah. Get clear
                guidance on worship, business, family life, and social
                ethics—authentic insights tailored for contemporary practice.
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="view-all-title">
                <Link href="/AskFatawa">
                  <button
                    className="btn btn-view me-2"
                    style={{ color: 'white', background: '#008B11',fontSize:'14px' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="30"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.99995 2C5.75495 2 2.19995 5.048 2.19995 8.9C2.19995 10.718 3.01535 12.3488 4.29995 13.5686C4.14376 13.9768 3.92205 14.3568 3.64355 14.6936C3.27443 15.1413 2.86666 15.5557 2.42495 15.932C2.32806 16.0097 2.25769 16.1156 2.22354 16.2351C2.18939 16.3545 2.19315 16.4816 2.2343 16.5988C2.27546 16.716 2.35197 16.8175 2.45329 16.8894C2.55461 16.9613 2.67573 16.9999 2.79995 17C4.12895 17 5.08475 16.985 5.94995 16.7564C6.72395 16.5512 7.38935 16.1216 8.06855 15.5186C8.68655 15.6668 9.32435 15.8 9.99995 15.8C14.245 15.8 17.8 12.752 17.8 8.9C17.8 5.048 14.245 2 9.99995 2ZM9.99995 3.2C13.675 3.2 16.6 5.792 16.6 8.9C16.6 12.008 13.675 14.6 9.99995 14.6C9.34655 14.6 8.66795 14.4872 8.04995 14.3186C7.95112 14.2938 7.8476 14.2945 7.74913 14.3207C7.65066 14.347 7.5605 14.3979 7.48715 14.4686C6.81215 15.116 6.31475 15.4178 5.64995 15.5936C5.34395 15.6746 4.75355 15.6554 4.33715 15.6878C4.42115 15.593 4.49975 15.5426 4.58135 15.4436C5.05295 14.8676 5.48315 14.2586 5.61275 13.5686C5.6306 13.465 5.62093 13.3586 5.58471 13.2599C5.54849 13.1612 5.48698 13.0738 5.40635 13.0064C4.14935 11.9684 3.39995 10.5134 3.39995 8.9C3.39995 5.792 6.32495 3.2 9.99995 3.2ZM8.85635 5.5436C8.75074 5.5673 8.6535 5.61913 8.57495 5.6936L7.67495 6.5378L8.48135 7.4186L9.19355 6.7436H10.6372L11.2 7.382V8.2634L9.66215 9.2942C9.57995 9.35018 9.51296 9.4257 9.46719 9.51399C9.42142 9.60228 9.39832 9.70057 9.39995 9.8V11H10.6V10.1372L12.1378 9.1064C12.22 9.05037 12.2871 8.97474 12.3329 8.88634C12.3786 8.79794 12.4017 8.69954 12.4 8.6V7.1564C12.3992 7.01138 12.3459 6.87156 12.25 6.7628L11.35 5.75C11.2939 5.68556 11.2248 5.63382 11.1472 5.59822C11.0696 5.56263 10.9853 5.54401 10.9 5.5436H8.98715C8.94368 5.53883 8.89982 5.53883 8.85635 5.5436ZM9.39995 11.6V12.8H10.6V11.6H9.39995Z"
                        fill="white"
                      />
                    </svg>
                    Ask Fatawa
                  </button>
                </Link>
                <Link href="/Fatawa">
                  <button className="btn btn-view">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="30"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        d="M19 12.998C19 12.4676 19.2107 11.9589 19.5858 11.5838C19.9609 11.2088 20.4696 10.998 21 10.998H33C33.5304 10.998 34.0391 11.2088 34.4142 11.5838C34.7893 11.9589 35 12.4676 35 12.998C35 13.5285 34.7893 14.0372 34.4142 14.4123C34.0391 14.7873 33.5304 14.998 33 14.998H21C20.4696 14.998 19.9609 14.7873 19.5858 14.4123C19.2107 14.0372 19 13.5285 19 12.998ZM19 18.998C19 18.6002 19.158 18.2187 19.4393 17.9374C19.7206 17.6561 20.1022 17.498 20.5 17.498H23C23.3978 17.498 23.7794 17.6561 24.0607 17.9374C24.342 18.2187 24.5 18.6002 24.5 18.998C24.5 19.3959 24.342 19.7774 24.0607 20.0587C23.7794 20.34 23.3978 20.498 23 20.498H20.5C20.1022 20.498 19.7206 20.34 19.4393 20.0587C19.158 19.7774 19 19.3959 19 18.998ZM19 23.498C19 23.1002 19.158 22.7187 19.4393 22.4374C19.7206 22.1561 20.1022 21.998 20.5 21.998H23C23.3978 21.998 23.7794 22.1561 24.0607 22.4374C24.342 22.7187 24.5 23.1002 24.5 23.498C24.5 23.8959 24.342 24.2774 24.0607 24.5587C23.7794 24.84 23.3978 24.998 23 24.998H20.5C20.1022 24.998 19.7206 24.84 19.4393 24.5587C19.158 24.2774 19 23.8959 19 23.498ZM19 28.998C19 28.6002 19.158 28.2187 19.4393 27.9374C19.7206 27.6561 20.1022 27.498 20.5 27.498H33.5C33.8978 27.498 34.2794 27.6561 34.5607 27.9374C34.842 28.2187 35 28.6002 35 28.998C35 29.3959 34.842 29.7774 34.5607 30.0587C34.2794 30.34 33.8978 30.498 33.5 30.498H20.5C20.1022 30.498 19.7206 30.34 19.4393 30.0587C19.158 29.7774 19 29.3959 19 28.998ZM28.274 16.998C28.158 16.998 27.996 16.998 27.85 17.01C27.5862 17.0279 27.3286 17.098 27.092 17.216C26.7157 17.4078 26.4097 17.7137 26.218 18.09C26.066 18.39 26.026 18.67 26.012 18.848C26 18.994 26 19.156 26 19.272V22.724C26 22.84 26 23.002 26.012 23.148C26.026 23.324 26.066 23.606 26.218 23.906C26.4097 24.2824 26.7157 24.5883 27.092 24.78C27.392 24.932 27.672 24.972 27.85 24.986C27.996 24.998 28.158 24.998 28.274 24.998H32.726C32.842 24.998 33.004 24.998 33.15 24.986C33.326 24.972 33.608 24.932 33.908 24.78C34.2843 24.5883 34.5903 24.2824 34.782 23.906C34.9001 23.6695 34.9701 23.4118 34.988 23.148C35 23.002 35 22.84 35 22.724V19.272C35 19.156 35 18.994 34.988 18.848C34.9701 18.5842 34.9001 18.3266 34.782 18.09C34.5903 17.7137 34.2843 17.4078 33.908 17.216C33.6714 17.098 33.4138 17.0279 33.15 17.01C33.004 16.998 32.842 16.998 32.726 16.998H28.274Z"
                        fill="#005306"
                      />
                      <path
                        d="M32.66 5.50195H21.34C20.27 5.50195 19.38 5.50195 18.65 5.56195C17.89 5.62195 17.178 5.75795 16.504 6.10195C15.4689 6.62929 14.6273 7.47085 14.1 8.50595C13.756 9.17995 13.62 9.89195 13.56 10.652C13.5 11.382 13.5 12.272 13.5 13.342V33.502H9C8.60218 33.502 8.22064 33.66 7.93934 33.9413C7.65804 34.2226 7.5 34.6041 7.5 35.002C7.5 38.368 8.644 40.362 10.1 41.452C10.852 42.0125 11.7371 42.3675 12.668 42.482C12.7717 42.4927 12.8758 42.4994 12.98 42.502C17.874 42.546 22.77 42.532 27.664 42.516C30.1093 42.508 32.5547 42.5033 35 42.502C35.14 42.502 35.2733 42.484 35.4 42.448C36.166 42.38 36.85 42.232 37.498 41.902C38.5321 41.3748 39.3728 40.534 39.9 39.5C40.244 38.824 40.38 38.1119 40.44 37.352C40.5 36.622 40.5 35.732 40.5 34.664V13.342C40.5 12.272 40.5 11.382 40.44 10.652C40.38 9.89195 40.244 9.17995 39.9 8.50595C39.3737 7.47145 38.5336 6.62997 37.5 6.10195C36.824 5.75795 36.112 5.62195 35.352 5.56195C34.622 5.50195 33.73 5.50195 32.66 5.50195ZM34.846 39.476L34.74 39.454C34.4371 39.3758 34.1525 39.2393 33.902 39.052C33.358 38.644 32.502 37.636 32.502 35.002C32.502 34.6041 32.344 34.2226 32.0627 33.9413C31.7814 33.66 31.3998 33.502 31.002 33.502H16.5V13.402C16.5 12.258 16.5 11.488 16.55 10.896C16.596 10.322 16.68 10.048 16.772 9.86795C17.0118 9.39678 17.3948 9.01377 17.866 8.77395C18.046 8.68195 18.32 8.59795 18.894 8.55195C19.486 8.50395 20.254 8.50195 21.4 8.50195H32.6C33.744 8.50195 34.514 8.50195 35.104 8.55195C35.68 8.59795 35.954 8.68195 36.134 8.77395C36.606 9.01395 36.988 9.39595 37.228 9.86795C37.32 10.048 37.404 10.322 37.45 10.896C37.498 11.488 37.5 12.256 37.5 13.402V34.602C37.5 35.746 37.5 36.516 37.45 37.106C37.404 37.682 37.32 37.956 37.228 38.136C36.9882 38.6071 36.6052 38.9901 36.134 39.23C35.85 39.374 35.544 39.444 34.846 39.476Z"
                        fill="#005306"
                      />
                    </svg>
                    View all Fatawas
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12">
              {latestFatawa.length > 0 ? (
                latestFatawa.map((fatwa) => (
                  <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href={`/Answer?mid=${fatwa.MID}`}
                    key={fatwa.MID} // **Add key prop here**
                  >
                    <div className="fatawas-list">
                      <div className="row">
                        <div className="col-12 col-lg-3">
                          <div className="latest-list-img">
                            <img
                              src={LatestImg.src}
                              className="img-fluid w-100 pb-2 pb-lg-0"
                              alt="Latest Fatawa"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-9">
                          <div className="latest-list-content">
                            <h2>{fatwa.fatawah_title}</h2>
                            <p>
                              <span className="pr-5">
                                <i
                                  className="fa fa-calendar skyblue"
                                  aria-hidden="true"
                                >
                                  &nbsp;
                                </i>{' '}
                                {fatwa.Created_Date}
                              </span>
                              <span>
                                <i
                                  className="fa fa-pencil skyblue"
                                  aria-hidden="true"
                                >
                                  &nbsp;
                                </i>{' '}
                                Ref NO #{fatwa.RefNo}
                              </span>
                            </p>

                            <p className="mb-0">
                              {/* Use createSanitizedMarkup to display description */}
                              <span
                                dangerouslySetInnerHTML={createSanitizedMarkup(
                                  fatwa.fatawah_description
                                )}
                              />
                              <a
                                className="greentxt"
                                href={`/Answer?mid=${fatwa.MID}`}
                              >
                                .... Know More
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <p>No fatawas available at the moment.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Latestfatwa;