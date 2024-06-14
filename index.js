document.getElementById('search-btn').addEventListener('click', fetchMovie);

function fetchMovie() {
    const movieTitle = document.getElementById('movie-title').value;
    const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your OMDB API key
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayMovie(data))
        .catch(error => console.error('Error fetching movie:', error));
}

function displayMovie(movie) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    if (movie.Response === "False") {
        movieContainer.innerHTML = `<p>${movie.Error}</p>`;
        return;
    }

    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';

    const poster = document.createElement('img');
    poster.src = movie.Poster !== "N/A" ? movie.Poster : 'placeholder.png';
    poster.alt = `${movie.Title} Poster`;
    poster.className = 'movie-poster';

    const movieInfo = document.createElement('div');
    movieInfo.className = 'movie-info';

    const title = document.createElement('h2');
    title.textContent = movie.Title;

    const year = document.createElement('p');
    year.textContent = `Release Year: ${movie.Year}`;

    const plot = document.createElement('p');
    plot.textContent = `Plot: ${movie.Plot}`;

    movieInfo.appendChild(title);
    movieInfo.appendChild(year);
    movieInfo.appendChild(plot);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);

    movieContainer.appendChild(movieCard);
}
