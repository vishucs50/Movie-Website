let popularjs = async () => {
    try {
        let response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=b2c8d6ce056bc1d972d350c0806bcd68');
        let data = await response.json();
        console.log("Fetched Popular Movies:", data);

        let moviecontainer = document.querySelector('#moviecontainer');
        if (!moviecontainer) {
            console.error("#moviecontainer not found! Ensure the popular page is loaded.");
            return;
        }

        moviecontainer.innerHTML = "";
        data.results.forEach(item => {
            if (item.poster_path) {
                let imgSrc = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
                let div = document.createElement('div');
                div.classList.add('movie-card');
                div.innerHTML = `
                    <img src="${imgSrc}" alt="Movie Poster">
                    <h2 data-color="glow">${item.title}</h2>
                    <p>⭐ IMDB: ${item.vote_average ? item.vote_average : "N/A"}</p>
                `;
                moviecontainer.appendChild(div);
            }
        });
    } catch (e) {
        console.error("Error fetching popular movies:", e);
    }
};
