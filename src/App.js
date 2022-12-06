import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Genres from "./Pages/Genres";
import Inicio from "./Pages/Inicio";
import Selected from "./Pages/Selected";

function App() {
  const [genreList, setGenreList] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [upcoming, setUpcoming] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [timeoutId, setTimeoutId] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [selectedMovieGenres, setSelectedMovieGenres] = useState([]);
  const [selectedMovieTrailer, setSelectedMovieTrailer] = useState([]);
  const [recomendedMovies, setRecomendedMovies] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const handleToggle = () => {
    setOpen(!isOpen);
    setCurrentPage(1);
  };

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const getGenesList = async () => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const datos = await request.data;
      setGenreList(datos.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenesMovies = async (id, page) => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
          process.env.REACT_APP_API_KEY +
          `&with_genres=${id}` +
          `&page=${page}`
      );
      const datos = await request.data;
      setGenreMovies(datos.results);
      setTotalPages(datos.results.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const getUpcoming = async () => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
          process.env.REACT_APP_API_KEY
      );
      const datos = await request.data;
      setUpcoming(datos.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPopular = async (page) => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
          process.env.REACT_APP_API_KEY +
          `&page=${page}`
      );
      const datos = await request.data;
      setMovieList(datos.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieList = async (movieName) => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=" +
          process.env.REACT_APP_API_KEY +
          `&query=${movieName}`
      );
      const datos = await request.data;
      if (datos) {
        setMovieList(datos.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    setSearchValue(e.target.value);
    const timeout = setTimeout(() => getMovieList(e.target.value), 500);
    setTimeoutId(timeout);
  };

  const getSelectedMovieTrailer = async (movieId) => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=` +
          process.env.REACT_APP_API_KEY
      );
      const datos = await request.data;
      const videos = datos.results;
      const trailer = videos.find((video) => {
        return video.name === "Official Trailer";
      });
      const vid = videos[0].key;
      setSelectedMovieTrailer(trailer ? trailer.key : vid);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedMovie = async (movieId) => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=` +
          process.env.REACT_APP_API_KEY
      );
      const datos = await request.data;
      getSelectedMovieTrailer(movieId);
      setSelectedMovie(datos);
      setSelectedMovieGenres(datos.genres);
      localStorage.setItem(
        "selectedMovie",
        JSON.stringify({
          datos,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getRecomendedMovie = async (movieId) => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=` +
          process.env.REACT_APP_API_KEY
      );
      const datos = await request.data;
      const recomends = datos.results;
      setRecomendedMovies(datos.results);
      localStorage.setItem(
        "selectedMovieRecommends",
        JSON.stringify({
          recomends,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    getGenesList();
    getUpcoming();
    getPopular(currentPage);
    getMovieList(searchValue);
    getGenesMovies(genreId, currentPage);
    getSelectedMovie(selectedMovieId);
    getRecomendedMovie(selectedMovieId);
    const datosRecuperar = JSON.parse(localStorage.getItem("selectedMovie"));
    const datosRecuperarRecomends = JSON.parse(
      localStorage.getItem("selectedMovieRecommends")
    );
    if (datosRecuperar) {
      setSelectedMovie(datosRecuperar.datos);
      setSelectedMovieGenres(datosRecuperar.datos.genres);
      setRecomendedMovies(datosRecuperarRecomends.recomends);
      getSelectedMovieTrailer(datosRecuperar.datos.id);
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [searchValue, genreId, currentPage, selectedMovieId]);

  return (
    <div className="App">
      <Router>
        <Header
          onTextChange={onTextChange}
          isOpen={isOpen}
          handleToggle={handleToggle}
        />
        <Aside
          key={genreList.id}
          genreList={genreList}
          setGenreId={setGenreId}
          isOpen={isOpen}
          handleToggle={handleToggle}
          setCurrentPage={setCurrentPage}
        />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Inicio
                searchValue={searchValue}
                key={upcoming.id}
                upcoming={upcoming}
                movieList={movieList}
                setSelectedMovieId={setSelectedMovieId}
                prev={prev}
                next={next}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </Route>
            <Route path="/genres/:genreName">
              {genreMovies && (
                <Genres
                  key={genreMovies.id}
                  genreMovies={genreMovies}
                  setSelectedMovieId={setSelectedMovieId}
                  prev={prev}
                  next={next}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </Route>
            <Route path="/selected/:movieId">
              {selectedMovie && (
                <Selected
                  key={selectedMovie.id}
                  selectedMovie={selectedMovie}
                  selectedMovieTrailer={selectedMovieTrailer}
                  selectedMovieGenres={selectedMovieGenres}
                  recomendedMovies={recomendedMovies}
                  setSelectedMovieId={setSelectedMovieId}
                />
              )}
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
