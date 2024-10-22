import "./modal-movie.js";
import "./../../img/icon-duration.png";

class ItemMovie extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    const imgUrl = "https://image.tmdb.org/t/p/w500";
    const idMovie = this._movie.id;
    const year = this.getReleaseYear(this._movie.release_date);
    const duration = this.getDuration(this._movie.runtime);

    if (!this._movie.poster_path) {
      this.style.display = "none";
      return;
    }

    this.innerHTML = `
    <div class="card p-2 my-1" data-bs-toggle="modal" data-bs-target="#movieModal${idMovie}">
        <img src="${imgUrl}${this._movie.poster_path}" class="card-img-top rounded" alt="${this._movie.title}">
        <div class="card-body d-flex align-items-center justify-content-between">
        <p class="d-flex align-items-center gap-1"><img src="./img/icon-duration.png"> ${duration}</p>
        <p class="card-years">${year}</p>
        <p class="card-overlay-hover">See Detail</p>
        </div>
    </div>
    `;
  }

  getReleaseYear(year) {
    return new Date(year).getFullYear();
  }

  getDuration(duration) {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;

    if (hours === 0) {
      return `${mins}min`;
    } else {
      return `${hours}h ${mins}min`;
    }
  }
}

customElements.define("item-movie", ItemMovie);
