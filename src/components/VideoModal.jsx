import React from "react";
import "../style/videoModal.css";

const VideoModal = (props) => {
  const toggleVideoPopup = props.toggleVideoPopup;
  const selectedMovieTrailer = props.selectedMovieTrailer;
  var url = `https://www.youtube.com/embed/${selectedMovieTrailer}`;
  return (
    <div className="modal-video">
      <div onClick={toggleVideoPopup} className="overlay-video"></div>
      <iframe
        className="container-video-modal"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoModal;
