import React from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "../Style/Upcoming.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
SwiperCore.use([EffectCoverflow, Pagination]);

const Upcoming = (props) => {
  let history = useHistory();
  const upcomingMovies = props.upcoming;
  const setSelectedMovieId = props.setSelectedMovieId;
  return (
    <div className="tendencia">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={false}
        className="mySwiper"
      >
        {upcomingMovies.map((upcoming) => {
          var url = `https://image.tmdb.org/t/p/w500${upcoming.poster_path}`;
          const handleSelectedMovie = () => {
            setSelectedMovieId(upcoming.id);
            history.push("/selected");
          };
          return (
            <SwiperSlide onClick={handleSelectedMovie}>
              <img className="slider-img" src={url} alt="upcoming" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Upcoming;
