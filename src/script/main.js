import "./component/app-bar.js";
import "./component/carousel-main.js";
import "./component/list-movie.js";
import "./component/upcoming-movie.js";
import "./component/nowPlaying-movie.js";
import "./component/Rate-movie.js";
import "./component/popular-movie.js";
import { DataAPI } from "./data/data-api.js";

const main = () => {
  const searchElement = document.querySelector("app-bar");
  const carouselElement = document.querySelector("main-carousel");
  const newReleaseElement = document.querySelector("upcoming-movie");
  const movieListElement = document.querySelector("list-movie");
  const nowPlayingElement = document.querySelector("now-playing");
  const topRatedElement = document.querySelector("top-rated");
  const popularElement = document.querySelector("popular-movie");

  const getCarousel = async () => {
    const popularMoviesForCarousel = await DataAPI.popularMovies();
    carouselElement.movie = popularMoviesForCarousel;
  };

  const getGroupingMovie = async () => {
    try {
      const upcomingMovies = await DataAPI.upcomingMovie();
      const nowPlayingMovies = await DataAPI.nowPlayingMovie();
      const topRatedMovies = await DataAPI.topRatedMovies();
      const popularMovie = await DataAPI.popularMovies();

      const fetchMoviesDetails = async (movies) => {
        const moviesDetails = await Promise.all(
          movies.map(async (movie) => await getMovieDetails(movie))
        );
        return moviesDetails;
      };

      const [
        newReleaseDetails,
        trendingDetails,
        topRatedDetails,
        popularDetails,
      ] = await Promise.all([
        fetchMoviesDetails(upcomingMovies),
        fetchMoviesDetails(nowPlayingMovies),
        fetchMoviesDetails(topRatedMovies),
        fetchMoviesDetails(popularMovie),
      ]);

      newReleaseElement.movies = newReleaseDetails;
      nowPlayingElement.movies = trendingDetails;
      topRatedElement.movies = topRatedDetails;
      popularElement.movies = popularDetails;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  const onClickSearch = async () => {
    try {
      const searchValue = searchElement.value.trim();

      if (!searchValue) {
        window.location.reload();
        return;
      }

      hideElement();
      const searchMovie = await DataAPI.searchMovie(searchValue);

      if (!searchMovie || searchMovie.length === 0) {
        throw new Error("Movie Not found");
      }
      const moviesWithDetails = await Promise.all(
        searchMovie.map(getMovieDetails)
      );
      renderResults(moviesWithDetails);
    } catch (error) {
      fallbackResult(error.message);
    }
  };

  const getMovieDetails = async (movie) => {
    try {
      const movieDetails = await DataAPI.getMovieDetails(movie.id);
      movie.runtime = movieDetails.runtime;
      return movie;
    } catch (error) {
      console.error(`Failed to fetch details for movie ID: ${movie.id}`, error);
      return movie;
    }
  };

  const renderResults = (result) => {
    movieListElement.movies = result;
    showElement();
  };

  const fallbackResult = (message) => {
    movieListElement.renderError(message);
  };

  const hideElement = () => {
    carouselElement.style.display = "none";
    movieListElement.style.display = "none";
    newReleaseElement.style.display = "none";
    nowPlayingElement.style.display = "none";
    topRatedElement.style.display = "none";
    popularElement.style.display = "none";
  };

  const showElement = () => {
    movieListElement.style.display = "block";
  };

  searchElement.clickEvent = onClickSearch;
  getCarousel();
  getGroupingMovie();
};

export default main;
