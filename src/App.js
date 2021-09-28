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
  const [recomendedMovies, setRecomendedMovies] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  const getGenesList = async () => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=df35452f4054f7db9fa3529a5ec517cf"
      );
      const datos = await request.data;
      setGenreList(datos.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenesMovies = async (id) => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
          process.env.REACT_APP_API_KEY +
          `&with_genres=${id}`
      );
      const datos = await request.data;
      setGenreMovies(datos.results);
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

  const getPopular = async () => {
    try {
      const request = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
          process.env.REACT_APP_API_KEY
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

  const getSelectedMovie = async (movieId) => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=` +
          process.env.REACT_APP_API_KEY
      );
      const datos = await request.data;
      setSelectedMovie(datos);
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
      setRecomendedMovies(datos.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenesList();
    getUpcoming();
    getPopular();
    getMovieList(searchValue);
    getGenesMovies(genreId);
    getSelectedMovie(selectedMovieId);
    getRecomendedMovie(selectedMovieId);
  }, [searchValue, genreId, selectedMovieId]);

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
              />
            </Route>
            <Route path="/genres">
              {genreMovies && (
                <Genres
                  key={genreMovies.id}
                  genreMovies={genreMovies}
                  setSelectedMovieId={setSelectedMovieId}
                />
              )}
            </Route>
            <Route path="/selected">
              {selectedMovie && (
                <Selected
                  key={selectedMovie.id}
                  selectedMovie={selectedMovie}
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
