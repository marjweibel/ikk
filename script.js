const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=042d6b7f2a5e2b45dae3e6e8c9e3f9f4&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=042d6b7f2a5e2b45dae3e6e8c9e3f9f4&query="';

const form = document.getElementById('form');
const main = document.getElementById('main');

//get initial movie
getDisplay(API_URL);

async function getDisplay(url) {
  const res = await fetch(url);
  const data = await res.json();
  showDisplay(data.results);
}

function showDisplay(videos) {
  main.innerHTML = '';

  videos.forEach((video) => {
    const { title, poster_path, overview } = video;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

    const poster = movieEl.querySelector('img');
    poster.addEventListener('click', () => {
      const popup = document.createElement('div');
      popup.classList.add('popup');
      popup.style.backgroundImage = `url(${IMG_PATH + poster_path})`;

      document.body.appendChild(popup);

      popup.addEventListener('click', () => {
        popup.remove();
      });
    });

    main.appendChild(movieEl);
  });
}
