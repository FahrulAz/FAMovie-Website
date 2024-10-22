class carouselMain extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    const imgUrl = "https://image.tmdb.org/t/p/w1280";
    if (!this._movie || this._movie.length === 0) {
      this.innerHTML = `<h1 style="color:white; margin: 100px; text-align: center;">No movie found</h1>`;
      return;
    }

    const carouselItems = this._movie
      .slice(0, 3)
      .map(
        (movie, index) => `
      <div class="carousel-item${
        index === 0 ? " active" : ""
      }" data-bs-interval="5000">
        <img src="${imgUrl}${
          movie.backdrop_path
        }" class="d-block carousel-img" alt="${movie.title}">
        <div class="overlay"></div>
        <div class="carousel-caption d-none d-sm-block">
          <h5 class="fw-bold text-capitalize fs-3">${movie.title}</h5>
          <p class="sub-text d-none d-md-block">${movie.overview}</p>
        </div>
      </div>
    `
      )
      .join("");

    this.innerHTML = `
      <div id="carouselExampleDark" class="carousel slide margin-100" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          ${carouselItems}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }
}

customElements.define("main-carousel", carouselMain);
