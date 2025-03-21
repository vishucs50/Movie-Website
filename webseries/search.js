
let searchBox = document.querySelector('#search')
let btn = document.querySelector('#but')
let form = document.querySelector('#form')
let moviecontainer = document.querySelector('#moviecontainer')
form.addEventListener("submit", function (e) {
    e.preventDefault();
    loadPage(searchBox.value)
    webseries(searchBox.value)

})
//for fetching data

let webseries = async (name) => {
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b2c8d6ce056bc1d972d350c0806bcd68&query=${name}`);
    let data = await res.json();
    console.log(data)
    moviecontainer.innerHTML = "";
    if (data.results.length == 0) {
        moviecontainer.innerHTML = '<h1>No results found</h1>';
        return;
    }
    data.results.forEach(item => {
        
        if (item.poster_path) {
            let imgSrc = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            let div = document.createElement('div');
            div.classList.add('movie-card')
            div.innerHTML = `
                        <img src="${imgSrc}" alt="Movie Poster">
                        <h2>"${item.title}"</h2>
                        <p>⭐ IMDB: ${item.vote_average ? item.vote_average : "N/A"}</p>                
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


