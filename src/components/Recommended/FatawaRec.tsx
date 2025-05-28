import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPencil, faListAlt } from "@fortawesome/free-solid-svg-icons";
import defaultImage from "../../Assets/Images/BookStatic.png";
import LatestImg from '../../Assets/Images/latest-img.png';
import { FatchGetfatawahWithCate, GetLatestArticlesHome, getLatestFatawa } from "@/services/Manage_services";
import { toast } from "react-toastify";
import DOMPurify from "dompurify"; // ✅ Import DOMPurify

// Function to sanitize HTML content
const createSanitizedMarkup = (htmlContent: string) => {
  return { __html: DOMPurify.sanitize(htmlContent) };
};

type Fatwa = {
  MID: number;
  fatawah_title: string;
  Created_Date: string;
  RefNo: string;
  fatawah_description: string;
};

const FatawaRec: React.FC = () => {
  const [latestFatawa, setLatestFatawa] = useState<Fatwa[]>([]);

  const fetchLatestFatawa = async () => {
    try {
      const response = await   FatchGetfatawahWithCate('All');
      if (response?.statusCode === 200) {
        setLatestFatawa(response.data);
      } else {
        toast.error("Failed to fetch fatawa.");
      }
    } catch (error) {
      console.error("Error fetching fatawa:", error);
      toast.error("Error fetching fatawa.");
    }
  };

  useEffect(() => {
    fetchLatestFatawa();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage.src;
  };

  return (
    <section className="islamic-book-collection padding100 position-relative">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <div className="latest-fatwa-title">
              <h1>
                <FontAwesomeIcon icon={faBook} /> Recommended Fatawa
              </h1>
            </div>
          </div>
        </div>

        <div className="row">
          {latestFatawa.length > 0 ? (
          latestFatawa.slice(0, 8).map((fatwa) => (
              <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={fatwa.MID}>
                <article className="thumbnail item bg-white border p-2 h-100">
                  <div className="latest-art-img position-relative mb-2">
                    <img
                      src={LatestImg.src}
                      onError={handleImageError}
                      className="img-fluid"
                      alt="Fatawa" // ✅ Alt tag
                    />
                   
                  </div>
                  <div className="caption">
                    <h5>
                      {fatwa.fatawah_title.length > 25
                        ? fatwa.fatawah_title.slice(0, 25) + "..."
                        : fatwa.fatawah_title}
                    </h5>
                    <p className="text-muted">
                      <span
                        dangerouslySetInnerHTML={createSanitizedMarkup(
                          fatwa.fatawah_description.length > 50
                            ? fatwa.fatawah_description.slice(0, 50) + "..."
                            : fatwa.fatawah_description
                        )}
                      />

                    </p>
                    
                    <a     key={fatwa.MID}
                                                    style={{ textDecoration: 'none' }}
                                                    href={`/Answer?mid=${fatwa.MID}`} className="btn btn-readmore btn-block bg-white">Read more</a>
                    {/* Add href to actual fatwa detail if available */}
                  </div>
                </article>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No fatawa found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FatawaRec;
