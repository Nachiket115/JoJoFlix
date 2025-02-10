const myApiKey = "595ec7fb"; 

const searchForm = document.querySelector("#searchForm");
const inputBox = document.querySelector(".inputBox");
const moviePoster = document.querySelector(".movie-poster");
const movieDetails = document.querySelector(".moviedetails");

// Function to fetch movie info
async function getMovieInfo(movie) {
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            // Display movie data
            moviePoster.style.background = `url(${data.Poster}) center/cover no-repeat`;
            movieDetails.innerHTML = `
                <h3>${data.Title} (${data.Year})</h3>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Actors:</strong> ${data.Actors}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
            `;
        } else {
            // Show error message
            movieDetails.innerHTML = `<p style="color: red;">Movie not found. Try again!</p>`;
            moviePoster.style.background = `url('https://placehold.co/300x450') center/cover no-repeat`;
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        movieDetails.innerHTML = `<p style="color: red;">Something went wrong. Try again!</p>`;
    }
}

// Event listener for search form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();

    if (movieName !== "") {
        getMovieInfo(movieName);
    } else {
        movieDetails.innerHTML = `<p style="color: red;">Please enter a movie name!</p>`;
    }
});
