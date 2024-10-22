import "./item-movie.js";

class PopularMovies extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="popularMovies" class="container-fluid my-4">
        <h2 class="my-2 text-white">Popular Movies</h2>
        <div  class="list-movie-scroll d-flex overflow-auto"></div>
      </div>
    `;

    if (this._movies && Array.isArray(this._movies)) {
      const scrollContainer = this.querySelector(".list-movie-scroll");

      this._movies.forEach((movie) => {
        if (movie.poster_path) {
          const movieItemElement = document.createElement("item-movie");
          movieItemElement.movie = movie;
          scrollContainer.appendChild(movieItemElement);

          const modalElement = document.createElement("modal-movie");
          modalElement.movie = movie;
          this.append(modalElement);
        }
      });
    }
  }
}

customElements.define("popular-movie", PopularMovies);
