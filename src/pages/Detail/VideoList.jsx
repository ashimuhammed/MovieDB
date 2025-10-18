import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";

const VideoList = ({ id }) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await tmdbApi.getVideos(category, id);
        setVideos(response.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    getVideos();
  }, [category, id]);

  return (
    <div className="videos">
      {videos.map((video, index) => (
        <div key={index} className="video__item">
          <div className="video__title">
            <h3>{video.name}</h3>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${video.key}`}
            width="100%"
            height="500px"
            title={`video-${index}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default VideoList;