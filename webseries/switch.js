function loadPage(page) {
  location.hash = page.toLowerCase();
}

function handleHashChange() {
  let page = location.hash.substring(1).toLowerCase() || "home";
  let contentDiv = document.getElementById("moviecontainer");

  if (!contentDiv) {
    console.error("Error: #moviecontainer not found!");
    return;
  }
  if (page.startsWith("details-")) {
    let movieId = page.split("-")[1];
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b2c8d6ce056bc1d972d350c0806bcd68`)
        .then((response) => response.json())
        .then((movie) => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b2c8d6ce056bc1d972d350c0806bcd68`)
                .then((videoResponse) => videoResponse.json())
                .then((videoData) => {
                    // Find the YouTube trailer
                    const trailer = videoData.results.find(
                        (video) => video.site === "YouTube" && video.type === "Trailer"
                    );

                    const youtubeIframe = trailer
                        ? `
                            <iframe
                                src="https://www.youtube.com/embed/${trailer.key}"
                                title="${movie.title} Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                          `
                        : `<p style="color: red;">Trailer not available.</p>`;

                    // Render movie details with YouTube iframe
                    contentDiv.innerHTML = `
                        <div class="container">
                            <div class="left">
                                <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Poster">
                            </div>
                            <div class="right details">
                                <h1>${movie.title}</h1>
                                <p><strong>Director:</strong> ${movie.director || "N/A"}</p>
                                <p><strong>Genre:</strong> ${movie.genres.map((g) => g.name).join(", ")}</p>
                                <p><strong>Year:</strong> ${movie.release_date.split("-")[0]}</p>
                                <p>${movie.overview}</p>
                                <div class="youtube-section">
                                    <h2 style="color:white">Watch Trailer</h2>
                                    ${youtubeIframe}
                                </div>
                            </div>
                        </div>
                    `;
                })
                .catch((error) => {
                    console.error("Error fetching YouTube trailer:", error);
                    contentDiv.innerHTML = `
                        <div class="container">
                            <div class="left">
                                <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Poster">
                            </div>
                            <div class="right details">
                                <h1>${movie.title}</h1>
                                <p><strong>Director:</strong> ${movie.director || "N/A"}</p>
                                <p><strong>Genre:</strong> ${movie.genres.map((g) => g.name).join(", ")}</p>
                                <p><strong>Year:</strong> ${movie.release_date.split("-")[0]}</p>
                                <p>${movie.overview}</p>
                                <p style="color: red;">Trailer not available.</p>
                            </div>
                        </div>
                    `;
                });
        })
        .catch((error) => {
            console.error("Error fetching movie details:", error);
            contentDiv.innerHTML = `<h2 style="color:red;">Movie data not found!</h2>`;
        });
    return;
  }

  const routes = {
    home: `
                <div class="popular" data-genre="inner box">
                <h3>Popular Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="popularmov" data-genre="movie-list"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="horror" data-genre="inner box">
                <h3>Horror Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="horrormov" data-genre="movie-list"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="action" data-genre="inner box">
                <h3>Action Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="actionmov" data-genre="movie-list"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="comedy" data-genre="inner box">
                <h3>Comedy Movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="commov" data-genre="movie-list"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="animation" data-genre="inner box">
                <h3>Animated movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="animov" data-genre="movie-list"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
            <div class="scific" data-genre="inner box">
                <h3>Science fiction movies</h3>
                <i data-dir="left" class='bx bxs-left-arrow'></i>
                <div class="scifi" data-genre="movie-list"></div>
                <i data-dir="right" class='bx bxs-right-arrow'></i>
            </div>
                    
            `,
    popular: `<h2 style="color: var(--glow-color); margin-bottom: 1rem;">POPULAR</h2>`,
    contact: `
                <div style="max-width: 500px; margin: auto; padding: 20px;">
                    <h2 style="color: #ffcc00;">📞 Get in Touch with Us! 🎬</h2>
                    <p><strong style="color:white">Email Support:</strong> 📩 
                        <a href="mailto:support@screenscape.com" style="color: #ffcc00; text-decoration: none; font-weight: bold;">
                            support@screenscape.com
                        </a>
                    </p>
                    <p><strong style="color: white">Phone Number:</strong> 📱 
                        <a href="tel:+91" style="color: #ffcc00; text-decoration: none; font-weight: bold;">
                            +91 XXXXX XXXXX
                        </a>
                    </p>
                    <p style="color: white"><strong>Address:</strong> 🏢 123 Movie Street, Hollywood, CA</p>
                </div>`,
  };
  const genreMap = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    tvmovie: 10770,
    thriller: 53,
    war: 10752,
    western: 37,
    scific: 878,
  };
  if (genreMap[page]) {
    contentDiv.innerHTML = `<h2 style="color: var(--glow-color); margin-bottom: 1rem;">Genre: ${
      page.charAt(0).toUpperCase() + page.slice(1)
    }</h2>`;
    loadScript("genre-script", "genre.js")
      .then(() => genrejs(genreMap[page]))
      .catch(console.error);
    return;
  }

  contentDiv.innerHTML = routes[page] || "<h2>Page Not Found</h2>";
  // Helper function to load a script with Promises
  function loadScript(id, src) {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve();
        return;
      }

      let script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.onload = () => resolve();
      script.onerror = () => reject(`Error loading ${src}!`);
      document.body.appendChild(script);
    });
  }

  // Load `slider.js` for home page
  if (page === "home") {
    loadScript("dynamic-script", "slider.js")
      .then(() => {
        console.log("slider.js loaded successfully!");
        popular();
        byid(27, "horrormov", "hr");
        byid(28, "actionmov", "ac");
        byid(35, "commov", "cmd");
        byid(16, "animov", "amv");
        byid(878, "scifi", "sc");
      })
      .catch(console.error);
  }

  // Load `popular.js` for popular page
  if (page === "popular") {
    loadScript("pop-script", "popular.js")
      .then(() => {
        console.log("popular.js loaded successfully!");
        popularjs();
      })
      .catch(console.error);
  }
}
document.body.addEventListener("dblclick", (event) => {
  let card = event.target.closest('[data-genre="doubleclick"]');
  if (!card) return;

  let img = card.querySelector("img");
  if (!img) return;

  loadPage(`details-${img.dataset.id}`);
});
document.body.addEventListener("dblclick", (event) => {
  let card = event.target.closest('[data-genre="card"]');
  if (!card) return;

  let img = card.querySelector("img");
  if (!img) return;
  
  loadPage(`details-${img.dataset.id}`);
});

// Run on hash change and initial load
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", handleHashChange);
