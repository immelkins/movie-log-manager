import Model from './model.js';

window.onload = function() {
  // Get elements
  const model = new Model();
  const popup = document.getElementById("popup-window");
  const openPopupBtn = document.getElementById("open-popup");
  const closePopupBtn = document.getElementById("close-popup");
  const submitBtn = document.getElementById("submit-popup");

  displayMovies(model.data.movies);

  //List all Movies by default
  function displayMovies(movieList) {
    const container = document.getElementById('movies-container');
    container.innerHTML = `
        <table class="table table-striped ">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Director</th>
                    <th>Year</th>
                    <th>Rating</th>
                    <th>Status</th>

                </tr>
            </thead>
            <tbody id="movie-table-body"></tbody>
        </table>
    `;
    const tableBody = document.getElementById('movie-table-body');

    
    movieList.forEach(movie => {
        const row = `
            <tr>
                <td>${movie.title}</td>
                <td>${movie.genre}</td>
                <td>${movie.movieBy}</td>
                <td>${movie.movieDate}</td>
                <td>${movie.rating}/10</td>
                <td>${movie.status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
  }

  function addMovie(){
    const title = document.getElementById('movie-title').value.trim();
    const genre = document.getElementById('movie-genre').value.trim();
    const movieBy = document.getElementById('movie-by').value.trim();
    const movieDate = parseInt(document.getElementById('movie-genre').value.trim());
    const rating = parseInt(document.getElementById('movie-rating').value);
    const status = document.getElementById('movie-status').value.trim();

    if(!title || !genre || !movieBy || isNaN(rating ||rating < 0 || rating > 10)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const newMovie = {
      movieID: 'm' + (model.data.movies.length + 1),
      title,
      genre,
      movieBy,
      movieDate,
      rating,
      status
    };
    
    popup.style.display = "none";
    model.data.movies.push(newMovie);
    displayMovies(model.data.movies);    
  }

  //CODE FOR BUTTONS

  // Open Popup
  openPopupBtn.addEventListener("click", () => {
      popup.style.display = "flex";
  });

  // Close Popup
  closePopupBtn.addEventListener("click", () => {
      popup.style.display = "none";
  });

  // Submit and Close Popup
  submitBtn.addEventListener("click", addMovie);
};
