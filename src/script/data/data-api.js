const axios = require("axios");

const baseURL = "https://api.themoviedb.org/3/";
const apiKey = "?api_key=20786c26e71de28cb6c21aedac7d41e0";
const pathURL = {
  popular: "movie/popular",
  upcoming: "movie/upcoming",
  topRated: "movie/top_rated",
  nowPlaying: "movie/now_playing",
  search: "search/movie",
};

class DataAPI {
  static searchMovie(keyword) {
    return axios
      .get(`${baseURL}${pathURL.search}${apiKey}&query=${keyword}`)
      .then((response) => {
        if (response.data.results) {
          const filteredResults = response.data.results.filter(
            (movie) => movie.poster_path !== null
          );
          return Promise.resolve(filteredResults);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }

  static upcomingMovie() {
    return axios
      .get(`${baseURL}${pathURL.upcoming}${apiKey}`)
      .then((response) => {
        if (response.data.results) {
          return Promise.resolve(response.data.results);
        } else {
          return Promise.reject("Failed to fetch popular movies");
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  static nowPlayingMovie() {
    return axios
      .get(`${baseURL}${pathURL.nowPlaying}${apiKey}`)
      .then((response) => {
        if (response.data.results) {
          return Promise.resolve(response.data.results);
        } else {
          return Promise.reject("Failed to fetch popular movies");
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
  static topRatedMovies() {
    return axios
      .get(`${baseURL}${pathURL.topRated}${apiKey}`)
      .then((response) => {
        if (response.data.results) {
          return Promise.resolve(response.data.results);
        } else {
          return Promise.reject("Failed to fetch popular movies");
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  static popularMovies() {
    return axios
      .get(`${baseURL}${pathURL.popular}${apiKey}`)
      .then((response) => {
        if (response.data.results) {
          return Promise.resolve(response.data.results);
        } else {
          return Promise.reject("Failed to fetch popular movies");
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  static getMovieDetails(movieId) {
    return axios
      .get(`${baseURL}movie/${movieId}${apiKey}`)
      .then((response) => {
        if (response.data) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(
            `Failed to fetch details for movie ID: ${movieId}`
          );
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export { DataAPI };
