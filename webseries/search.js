
let searchBox = document.querySelector('#search')
let btn = document.querySelector('#but')
let form = document.querySelector('#form')
let moviecontainer = document.querySelector('#moviecontainer')
form.addEventListener("submit", function (e) {
    e.preventDefault();
    webseries(searchBox.value)

})


let webseries = async (name) => {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b2c8d6ce056bc1d972d350c0806bcd68&query=${name}`);
    let data = await res.json();
    console.log(data)
    moviecontainer.innerHTML = "";
    if (data.results.length == 0) {
        moviecontainer.innerHTML = '<h1>No results found</h1>';
        return;
    }
    data.results.forEach(movie => {
        
        if (movie.poster_path) {
            let imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            let div = document.createElement('div');
            div.classList.add('movie-card')
            div.setAttribute('data-genre','doubleclick');
            div.innerHTML = `
                        <img src="${imgSrc}" data-id="${movie.id}" alt="Movie Poster">
                        <h2 data-color="glow">"${movie.title}"</h2>
                        <p>⭐ IMDB: ${movie.vote_average ? movie.vote_average : "N/A"}</p>                
        `
            moviecontainer.appendChild(div);
        }
    })
}
//for hamburger style
document.addEventListener("DOMContentLoaded", () => {
    let hamburger = document.querySelector(".hamburger");
    let navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        // Animate the hamburger icon
        hamburger.classList.toggle("toggle");
    });
});
    document.addEventListener("DOMContentLoaded", () => {
        const themeDropdown = document.querySelector(".theme-dropdown"); 
        const themeLink = document.querySelector(".theme-toggle"); 

        if (themeLink && themeDropdown) {
            themeLink.addEventListener("click", (event) => {
                event.preventDefault();
                themeDropdown.classList.toggle("show");
            });

            document.addEventListener("click", (event) => {
                if (!themeLink.contains(event.target) && !themeDropdown.contains(event.target)) {
                    themeDropdown.classList.remove("show");
                }
            });
        } else {
            console.error("Theme button or dropdown not found! Check the selectors.");
        }
    });



