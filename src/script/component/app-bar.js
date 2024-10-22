import "./../../img/logo-nav.png";

class appBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector("#searchBox").value;
  }

  render() {
    this.innerHTML = `
                  <nav class="navbar navbar-expand-lg bg-transparent fixed-top m-navbar">
                    <img src="./img/logo-nav.png" alt="logo" width="50" />
                    <a class="navbar-brand m-logo" id="navbarLogo" href="#">FAMovie</a>
                    <button class="navbar-toggler border-0 bg-white" type="button" data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                      <div class="offcanvas-header">
                        <img src="./img/logo-nav.png" alt="logo" width="50" />
                        <h5 class="offcanvas-body m-logo" id="offcanvasNavbarLabel">FAMovie</h5>
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                      </div>
                      <div class="offcanvas-body">
                        <div class="navbar-nav px-3 ms-auto">
                          <a class="nav-link" href="#carouselExampleDark">Home</a>
                          <a class="nav-link" href="#upcomingMovies">Upcoming</a>
                          <a class="nav-link" href="#nowPlayingMovies">Now Playing</a>
                          <a class="nav-link" href="#topRateMovies">Top Rate</a>
                        </div>
                        <form class="d-flex align-content-center ms-auto nav-search my-auto" role="search">
                          <input id="searchBox" class="form-control me-1" type="search" placeholder="Search Movie..." aria-label="Search" required>
                          <button id="searchBtn" class="btn btn-danger text-white" type="submit">Search</button>
                        </form>
                      </div>
                    </div>
                  </nav>
                    `;
    this.querySelector("#searchBtn").addEventListener(
      "click",
      this._clickEvent
    );

    this.querySelector("#navbarLogo").addEventListener("click", () => {
      location.reload();
    });
  }
}

customElements.define("app-bar", appBar);
