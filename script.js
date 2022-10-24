// 181d67b4a1f519f7dc48538904997f09
const API_KEY = 'api_key=181d67b4a1f519f7dc48538904997f09';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const SEACH_URL = BASE_URL+'/search/movie?'+API_KEY;


const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

// browser.history.deleteAll();

getMovies(API_URL);
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data)
        showMovies(data.results);
    })
}
function showMovies(data) {
    // console.log(data);
    main.innerHTML='';
    data.forEach(movie => {
        const {title, poster_path,vote_average, overview}=movie
        const movieEl = document.createElement('dive');
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMAGE_URL+poster_path}" alt="${title}">
        <div class="movie_info">
            <h3>${title}</h3>
            <span class="${getColour(vote_average)}">${vote_average}</span>
        </div>
        <div class="Overview">
            <h3>${title}</h3>
            ${overview}
            
        </div>
        
        `
        main.appendChild(movieEl)
    }
    )
}

function getColour(vote){
    if (vote>=8){
        return 'green';
    }
    if (vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
}
form.addEventListener('input', (e)=>{
    e.preventDefault();

    const serchTerm = search.value;
    if (serchTerm){
        getMovies(SEACH_URL+'&query='+serchTerm)
    }else{
        getMovies(API_URL)
    }
   
})
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const serchTerm = search.value;
    if (serchTerm){
        getMovies(SEACH_URL+'&query='+serchTerm)
    }else{
        getMovies(API_URL)
    }
   
})