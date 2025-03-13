
let popular=async()=>{
    try
    {

        let response= await fetch('https://api.themoviedb.org/3/movie/popular?api_key=b2c8d6ce056bc1d972d350c0806bcd68');
        let data=await response.json();
        console.log(data);
        let popular=document.querySelector('.popularmov')
        arr=data.results[data.results.length-1];
        data.results.forEach(movie => {
            if (movie.poster_path) {
                let imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                
                let div = document.createElement('div');
                div.classList.add('movie');
                
                div.innerHTML = `<img src="${imgSrc}" alt="Movie Poster">`;
                
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
        
        console.log(data);
        let horror=document.querySelector(`.${container}`)
        data.results.forEach(movie => {
            if (movie.poster_path) {
                let imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                
                let div = document.createElement('div');
                div.classList.add(`${card}`);
                
                div.innerHTML = `<img src="${imgSrc}" alt="Movie Poster">`;
                
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

//for movement of movie carousel
let main=document.querySelectorAll('.movie');
let last=main[main.length-1];
if (lastElement) {
    let position = parseInt(getComputedStyle(lastElement).left, 10) || 0;
    console.log("Current Position:", position);
}
document.querySelectorAll('[data-dir="right"]').forEach((container) => {
        console.log()
        container.onclick = () => {
            let cur = parseInt(getComputedStyle(container.previousElementSibling).left, 10) || 0;
            let position =cur- 210;
            container.previousElementSibling.style.left = position + "px";
            console.log(cur);
        };
    });
    document.querySelectorAll('[data-dir="left"]').forEach((container) => {    
        container.onclick = () => {
            let cur = parseInt(getComputedStyle(container.nextElementSibling).left, 10) || 0;
            
                let position=cur+ 210;
                if(position>-150&& position<-80){
                    container.nextElementSibling.style.left = 0 + "px";
                }
                else if(position<0){
                container.nextElementSibling.style.left = position + "px";
            }
        };
    });


