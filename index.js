import Model from './model.js';

window.onload = function() {
  // Get elements
  const model = new Model();
  const popup = document.getElementById("add-popup");
  const openPopupBtn = document.getElementById("open-popup");
  const closePopupBtn = document.getElementById("close-popup");
  const submitBtn = document.getElementById("submit-popup");


  //List all Movies by default
  displayMovies(model.data.movies);

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
            <th>Actions</th>
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
          <td>${movie.director}</td>
          <td>${movie.movieDate}</td>
          <td>${movie.rating}/10</td>
          <td>${movie.status}</td>
          <td>
            <button class="edit-btn btn" data-index="${movie.movieID}">Edit</button>
          </td>
        </tr>
      `;

      tableBody.innerHTML += row;
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener("click", function() {
          const index = this.getAttribute("data-index");
            openEditPopup(index);
        });
      });
    }); 
  }

  function addMovie() {
    const title = document.getElementById('movie-title').value.trim();
    const genre = document.getElementById('movie-genre').value.trim();
    const director = document.getElementById('movie-by').value.trim();
    let movieDate = parseInt(document.getElementById('movie-year').value);
    let rating = Math.round(parseFloat(document.getElementById('movie-rating').value) * 10)/10;
    const status = document.getElementById('movie-status').value.trim();
    
    if(!title && !director && (movieDate < 1800 || movieDate > 2030) && status == '') 
      { alert('Please fill in a Title, Director, Release Year (1800 - 2030), and Select Status'); return; }
    else if(!title && !director && (movieDate < 1800 || movieDate > 2030)) 
      { alert('Please fill in a Title, Director, Release Year (1800 - 2030)'); return; }
    else if (!title && !director && status == '')
      { alert('Please fill in a Title, Director, and Select Status'); return; }  
    else if (!title && (movieDate < 1800 || movieDate > 2030) && status == '')
      { alert('Please fill in a Title and a valid Release Year (1800 - 2030), and Select Status'); return; }
    else if(!director && (movieDate < 1800 || movieDate > 2030) && status == '') 
      { alert('Please fill in a Director, Release Year (1800 - 2030), and Select Status'); return; }
    else if (!title && !director)
      { alert('Please fill in a Title and Director'); return; }
    else if (!title && (movieDate < 1800 || movieDate > 2030))
      { alert('Please fill in a Title and a valid Release Year (1800 - 2030)'); return; }
    else if (!title && status == '')
      { alert('Please fill in a Title and Select Status'); return; }  
    else if (!director && (movieDate < 1800 || movieDate > 2030))
      { alert('Please fill in a Director and a valid Release Year (1800 - 2030)'); return; }
    else if (!director && status == '')
      { alert('Please fill in a Director and Select Status'); return; }
    else if ((movieDate < 1800 || movieDate > 2030) && status == '')
      { alert('Please fill in a valid Release Year (1800 - 2030) and Select Status'); return; }
    else if (!title)
      { alert('Please fill in a Title'); return; }
    else if (!director)
      { alert('Please fill in a Director'); return; }
    else if (movieDate < 1800 || movieDate > 2030)
      { alert('Please fill in a valid Release Year (1800 - 2030)'); return; }
    else if (status == '')
      { alert('Please Select Status'); return; }


    if(isNaN(movieDate) || movieDate == '') 
      { movieDate = ' - - - - '; }
    

    if(isNaN(rating) || rating == '') 
      { rating = ' - '; }
    else if(rating < 0 || rating > 10) 
        { alert('Please fill in a valid Rating (1-10)'); return; }

    
    const newMovie = {
      movieID: (model.data.movies.length),
      title,
      genre,
      director,
      movieDate,
      rating,
      status
    };
    
    popup.style.display = "none";
    model.data.movies.push(newMovie);
    displayMovies(model.data.movies);    
    clearUserInput();
  }

  function searchMovie() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase().trim();

    // If search bar is empty show all movies
    if (searchInput === "") {
        displayMovies(model.data.movies);
        return;
    }
    // Filter movies by title or director
    const filteredMovies = model.data.movies.filter(movie => 
        movie.title.toLowerCase().includes(searchInput) || 
        movie.director.toLowerCase().includes(searchInput)
    );
    // If no movies are found display a message
    if (filteredMovies.length === 0)
      document.getElementById('movies-container').innerHTML = "<p>No movies found :( </p>";
    else 
      displayMovies(filteredMovies);
  }

  function openEditPopup(index) {
    const movie = model.data.movies[index];

    // Pre-fill input fields with current movie data
    document.getElementById('edit-movie-title').value = movie.title;
    document.getElementById('edit-movie-genre').value = movie.genre;
    document.getElementById('edit-movie-by').value = movie.director;
    document.getElementById('edit-movie-year').value = movie.movieDate;
    document.getElementById('edit-movie-rating').value = movie.rating;
    document.getElementById('edit-movie-status').value = movie.status;

    // Show edit popup
    document.getElementById('edit-popup').style.display = "flex";

    // Set event listener for saving changes
    document.getElementById('save-edit-popup').onclick = function() 
      { saveEditMovie(index); };
    //Set event listener for deleting a movie row
    document.getElementById('delete-edit-popup').onclick = function() 
      { deleteEditMovie(index); };
  }

  function saveEditMovie(index) {
    const updateMovie = {
        movieID: model.data.movies[index].movieID,
        title: document.getElementById('edit-movie-title').value.trim(),
        genre: document.getElementById('edit-movie-genre').value.trim(),
        director: document.getElementById('edit-movie-by').value.trim(),
        movieDate: parseInt(document.getElementById('edit-movie-year').value.trim()),
        rating: parseInt(document.getElementById('edit-movie-rating').value),
        status: document.getElementById('edit-movie-status').value.trim()
    };

    // Validate Movie inputs
    if (!updateMovie.title || !updateMovie.genre || !updateMovie.director || isNaN(updateMovie.movieDate) || isNaN(updateMovie.rating) || updateMovie.rating < 0 || updateMovie.rating > 10) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Update & Reload
    model.data.movies[index] = updateMovie;
    displayMovies(model.data.movies);

    // Close edit popup
    document.getElementById('edit-popup').style.display = "none";
  }

  function deleteEditMovie(index) { 
    //Removes only Object at Index from array Movies
    model.data.movies.splice(index, 1);

    //After removing, renumber the movieID from 0 -->
    model.data.movies.forEach((movie, newMovieID) => {
      movie.movieID = newMovieID;
    });

    // Update & Reload
    displayMovies(model.data.movies);

    // Close edit popup
    document.getElementById('edit-popup').style.display = "none";
  }

  function clearUserInput()
  {
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-genre').value = '';
    document.getElementById('movie-by').value = '';
    document.getElementById('movie-year').value = '';
    document.getElementById('movie-rating').value = '';
    //no need to clear the status preset to 'Not Watched'
  }

  //FOR BUTTONS
  // Open Add Movie Popup
  openPopupBtn.addEventListener("click", () => {
      popup.style.display = "flex";
  });

  // Close Add Movie Popup
  closePopupBtn.addEventListener("click", () => {
      popup.style.display = "none";
  });

  // Submit and Close Add Movie Popup
  submitBtn.addEventListener("click", addMovie);

  // Search for a Movie in searchbar
  document.getElementById('search-button').addEventListener("click", searchMovie);

  // Close Edit Movie Popup
  document.getElementById('close-edit-popup').addEventListener("click", function() {
    document.getElementById('edit-popup').style.display = "none";
  });
};