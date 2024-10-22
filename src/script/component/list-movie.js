import "./item-movie.js";

class ListMovie extends HTMLElement {
  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  renderError(message) {
    this.innerHTML += `<h2 class="text-white">${message}</h2>`;
  }

  render() {
    this.innerHTML = "";
    this._movies.forEach((movie) => {
      const movieItemElement = document.createElement("item-movie");
      movieItemElement.movie = movie;
      this.appendChild(movieItemElement);

      const modalElement = document.createElement("modal-movie");
      modalElement.movie = movie;
      this.appendChild(modalElement);
    });
  }
}

customElements.define("list-movie", ListMovie);
