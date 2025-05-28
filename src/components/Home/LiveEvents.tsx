import React, { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Liveeventimage from '../../Assets/Images/Liveeventimage.png';
import { getLiveEventshome } from '@/services/Manage_services';
import { toast } from 'react-toastify';

// ✅ Define interface
interface LiveEvent {
  title: string;
  youtubeUrl: string;
  EventDate: string;
  Location: string;
  button: string;
}

const LiveEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [liveEventsHome, setLiveEventsHome] = useState<LiveEvent[]>([]);

  const openModal = (url: string) => {
    try {
      const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\.be\/|\/live\/)([a-zA-Z0-9_-]{11})/);
      if (videoIdMatch && videoIdMatch[1]) {
        const embedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
        setSelectedVideo(embedUrl);
        setShowModal(true);
      } else {
        toast.error("Invalid YouTube URL");
      }
    } catch (err) {
      toast.error("Error parsing video URL");
      console.error(err);
    }
  };

  const closeModal = () => {
    setSelectedVideo('');
    setShowModal(false);
  };

  const fetchLiveEventsHome = async () => {
    try {
      const response = await getLiveEventshome();
      if (response?.statusCode === 200) {
        setLiveEventsHome(response.data);
      } else {
        toast.error('Failed to fetch live events.');
      }
    } catch (error) {
      console.error('Error fetching live events:', error);
      toast.error('Error fetching live events.');
    }
  };

  useEffect(() => {
    fetchLiveEventsHome();
  }, []);

  // ✅ Memoize rendered list
  const renderedEvents = useMemo(() => {
    return liveEventsHome.map((event, i) => (
      <div
        key={i}
        className="event-card mb-4"
        onClick={() => openModal(event.youtubeUrl)}
        style={{ cursor: 'pointer' }}
      >
        <div className="event-image">
          <img
            src={Liveeventimage.src}
            alt="Event"
            loading="lazy"
          />
        </div>
        <div className="event-type live-now">
          <button
            onClick={() => openModal(event.youtubeUrl)}
            className="btn btn-link text-white p-0"
          >
            {event.button}
          </button>
        </div>
        <div className="event-info">
          <div className="event-title">{event.title}</div>
          <div className="event-meta">
            <div className="event-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="event-icon" />
              <div className="event-meta-text">{event.EventDate}</div>
            </div>
            <div className="event-meta-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="event-icon" />
              <div className="event-meta-text">
                {event.Location?.length > 18
                  ? `${event.Location.slice(0, 18)}...`
                  : event.Location}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [liveEventsHome]);

  return (
    <div>
      <section className="latest_fatawa">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <div className="latest-fatwa-title">
                <h2 className="section-title">Razvi Darul Ifta Live Events</h2>
                <p className="section-description">
                  Below are some UI design references and guidelines for your Events/Live Programs section.
                </p>
                {renderedEvents}
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="video-modal-overlay" onClick={closeModal}>
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>×</button>
              <div className="video-container">
                <iframe
                  width="100%"
                  height="400"
                  src={selectedVideo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Live Event"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        .video-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .video-modal {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 800px;
          width: 90%;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .video-container {
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default LiveEvents;
