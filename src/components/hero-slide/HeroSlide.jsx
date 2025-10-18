import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Correct import for Autoplay

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import Button, { OutlineButton } from "./../button/Button";
import Modal, { ModalContent } from "./../modal/Modal";

import tmdbApi, { category, movieType } from "./../../api/tmdbApi";
import apiConfig from "./../../api/apiConfig";

import "./hero-slide.scss";
import * as Config from "./../../constants/Config";

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies
  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = { page: 1 };
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });

        if (response && response.results) {
          setMovieItems(response.results.slice(0, 4));
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="hero-slide__loading">
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-slide__error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]} // Add Autoplay to modules array
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ 
          delay: 4000,
          disableOnInteraction: false 
        }}
        loop={true} // Added loop for better UX
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem item={item} className={isActive ? "active" : ""} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

// ===============================================
// HeroSlideItem Component
// ===============================================
const HeroSlideItem = ({ item, className }) => {
  const navigate = useNavigate();

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    try {
      const videos = await tmdbApi.getVideos(category.movie, item.id);

      if (videos.results.length > 0) {
        const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
        modal.querySelector(".modal__content > iframe").setAttribute("src", videoSrc);
      } else {
        modal.querySelector(".modal__content").innerHTML = "No trailer available";
      }

      modal.classList.toggle("active");
    } catch (err) {
      console.error("Error loading trailer:", err);
      modal.querySelector(".modal__content").innerHTML = "Trailer not available";
      modal.classList.toggle("active");
    }
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => navigate(`/${Config.HOME_PAGE}/movie/${item.id}`)}>
              Watch Now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img
            src={apiConfig.w500Image(item.poster_path)}
            alt={`${item.title} poster`}
          />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current?.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title={`${item.title} trailer`}
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;