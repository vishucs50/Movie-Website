let popular=async()=>{
    try
    {

        let response= await fetch('https://api.themoviedb.org/3/movie/popular?api_key=b2c8d6ce056bc1d972d350c0806bcd68');
        let data=await response.json();
        console.log(data);
        let popular=document.querySelector('.popularmov')
        data.results.forEach(movie => {
            if (movie.poster_path) {
                let imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                
                let div = document.createElement('div');
                div.classList.add('movie');
                div.setAttribute('data-genre','card');

                div.innerHTML = `<img src="${imgSrc}" alt="Movie Poster" data-id="${movie.id}" data-rating="${movie.vote_average}" data-title="${movie.title}" data-overview="${movie.overview}" data-poster="${movie.poster_path}">`;
                
                popular.appendChild(div);
            }
            
        });
        
        
    }
    catch(e)
    {
        console.log(e);
    }
}
let byid=async(genreId,container,card)=>{
    try
    {
        
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b2c8d6ce056bc1d972d350c0806bcd68&with_genres=${genreId}`);
        let data = await response.json();
        
        console.log(data.results);
        let horror=document.querySelector(`.${container}`)
        data.results.forEach(movie => {
            if (movie.poster_path) {
                let imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                
                let div = document.createElement('div');
                div.classList.add(`${card}`);
                div.setAttribute('data-genre','card');
                div.innerHTML = `<img src="${imgSrc}" alt="Movie Poster" data-id="${movie.id}" data-rating="${movie.vote_average}" data-title="${movie.original_title}" data-overview="${movie.overview}"   data-poster="${movie.poster_path}">`;
                // console.log(div)
                horror.appendChild(div);
            }
        });
        
    }
    catch(e)
    {
        console.log(e);
    }
}

popular()
byid(27,"horrormov","hr")
byid(28,"actionmov","ac")
byid(35,"commov","cmd") 
byid(16,"animov","amv")
byid(878,"scifi","sc")
document.body.addEventListener("mouseenter", (event) => {
    if (event.target.dataset.genre === "card")  {
        if (!event.target.querySelector('.boxadd')) {
            let current = event.target;
            let image_current = current.querySelector("img");
            // console.log(image_current)
            let title = image_current.dataset.title;
            let overview = image_current.dataset.overview;
            let rating=image_current.dataset.rating;
            // console.log(id);
            // console.log(current);
            let div = document.createElement('div');
            console.log(div);
            
            div.classList.add('boxadd');
           
            let imdbLogo = "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"; 
            div.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <h3 style="margin-bottom: 20px ;">${title}</h3>  
                
                <h4 style="display: flex; align-items: center; gap: 8px; justify-content: center;"> 
                    <img src="${imdbLogo}" style="height: 20px; width: auto; display: block;" alt="IMDb Logo"> 
                    <span style="font-size: 16px; font-weight: bold;">${Math.round(rating * 10) / 10}</span>
                </h4>       
            </div>
        `;
        
        
        event.target.appendChild(div);
        

        }
    }
}, true);   
document.body.addEventListener("mouseleave", (event) => {
    if (event.target.dataset.genre === "card") {
        let div = event.target.querySelector('.boxadd');
        if (div) div.remove();
    }
}, true);

//for movement of movie carousel
document.querySelectorAll('[data-dir="right"]').forEach((btn) => {
    btn.onclick = () => {
        let container = btn.previousElementSibling; // The movie list div
        let curLeft = parseInt(getComputedStyle(container).left, 10) || 0;
        let maxLeft = container.scrollWidth - container.offsetWidth; // Max scrollable width

        // Stop scrolling if already at max
        if (Math.abs(curLeft) < maxLeft) {
            let newLeft = curLeft - 200;
            if (Math.abs(newLeft) > maxLeft) {
                newLeft = -maxLeft; // Stop at last element
            }
            container.style.left = newLeft + "px";
        }
    };
});

document.querySelectorAll('[data-dir="left"]').forEach((btn) => {
    btn.onclick = () => {
        let container = btn.nextElementSibling; // The movie list div
        let curLeft = parseInt(getComputedStyle(container).left, 10) || 0;

        // Stop scrolling if already at start
        if (curLeft < 0) {
            let newLeft = curLeft + 200;
            if (newLeft > 0) {
                newLeft = 0; // Reset to start
            }
            container.style.left = newLeft + "px";
        }
    };
});
