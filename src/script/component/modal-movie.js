class ModalMovie extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    const imgUrl = "https://image.tmdb.org/t/p/original";
    const rating = this.getDecimalValue(this._movie.vote_average);
    const duration = this.getDuration(this._movie.runtime);
    this.innerHTML = `
    <div class="modal fade" id="movieModal${this._movie.id}" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-white" id="movieModalLabel">${this._movie.title}</h1>
          <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="d-flex flex-wrap align-items-center gap-4">
              <div class="col-md-2 col-3 d-flex justify-content-center align-items-center">
                <img src="${imgUrl}${this._movie.poster_path}" class="img-fluid modal-img rounded" alt="${this._movie.title}">
              </div>
              <div class="col">
                <div class="row my-2">
                  <div class="col-lg-3 col-md-4 col-sm-3 fw-bold text-white">Release Data</div>
                  <div class="col">: ${this._movie.release_date}</div>
                </div>
                <div class="row my-2">
                  <div class="col-lg-3 col-md-4 col-sm-3 fw-bold text-white">Duration</div>
                  <div class="col">: ${duration}</div>
                </div>
                <div class="row my-2">
                  <div class="col-lg-3 col-md-4 col-sm-3 fw-bold text-white">Popularity</div>
                  <div class="col">: ${this._movie.popularity}</div>
                </div>
                <div class="row my-2">
                  <div class="col-lg-3 col-md-4 col-sm-3 fw-bold text-white">Rating</div>
                  <div class="col">: ${rating}/10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-block">
          <p class="fw-bold text-white">Overview:</p>
          <span>${this._movie.overview}</span>
        </div>
      </div>
    </div>
  </div>
    `;
  }

  getDecimalValue(rating) {
    return Math.round(rating * 10) / 10;
  }

  getDuration(duration) {
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;

    if (hours === 0) {
      return `${mins} minutes`;
    } else {
      return `${hours} hour ${mins} minutes`;
    }
  }
}

customElements.define("modal-movie", ModalMovie);
