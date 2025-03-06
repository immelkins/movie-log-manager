import Model from './model.js';

window.onload = function() {
  // Get elements
  const model = new Model();
  const popup = document.getElementById('add-popup');
  const addPopupBtn = document.getElementById('add-btn');
  const closePopupBtn = document.getElementById('close-popup');
  const submitBtn = document.getElementById('submit-popup');

  //List all Movies by default
  displayMovies(model.data.movies);

  function displayMovies(movieList) {
    const container = document.getElementById('movies-container');
    container.innerHTML = `
      <table class='table table-hover'>
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
        <tbody id = 'movie-table-body'></tbody>
      </table>`
    ;

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
          <td><button class = 'edit-btn' data-index = '${movie.movieID}'>Edit</button></td>
        </tr>`
      ;

      tableBody.innerHTML += row;
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
            openEditPopup(index);
        });
      });
    }); 
  }

  function addMovie() {
    const newMovie = {
      movieID: (model.data.movies.length),
      title: document.getElementById('movie-title').value.trim(),
      genre: document.getElementById('movie-genre').value.trim(),
      director: document.getElementById('movie-by').value.trim(),
      movieDate: parseInt(document.getElementById('movie-year').value),
      rating: Math.round(parseFloat(document.getElementById('movie-rating').value) * 10)/10,
      status: document.getElementById('movie-status').value.trim()
    };
   
    //Append all missing and incorrect fields to alrtmsg 
    let alertmsg = '';
    if(!newMovie.title) 
      { alertmsg += '\nTitle'; }
    if(!newMovie.director)
      alertmsg += '\nDirector';
    if(newMovie.movieDate < 1800 || newMovie.movieDate > 2030) 
      { alertmsg += '\nRelease Year (1800 - 2030)'; }
    if(newMovie.rating < 0 || newMovie.rating > 10) 
      { alertmsg += '\nPlease fill in a valid Rating (1-10)'; }
    if(newMovie.status == '') 
      { alertmsg += '\nSelect Status'; }

    if(!(alertmsg === ''))
      { playAlert(); alert('Please fill in: ' + alertmsg); return; }

    if(isNaN(newMovie.movieDate)) 
      { newMovie.movieDate = ' - - - - '; }
     
    if(isNaN(newMovie.rating)) 
      { newMovie.rating = ' - '; }
    
    popup.style.display = 'none';
    model.data.movies.push(newMovie);
    displayMovies(model.data.movies);    
    clearUserInput();
    playSuccess();
  }

  function searchMovie() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase().trim();

    // If search bar is empty show all movies
    if (searchInput === '') {
        displayMovies(model.data.movies);
        return;
    }
    // Filter movies by title or director
    const searchedMovies = model.data.movies.filter(movie => 
        movie.title.toLowerCase().includes(searchInput) || 
        movie.director.toLowerCase().includes(searchInput)
    );
    document.getElementById('search-bar').value = '';
    // If no movies are found display a message
    if (searchedMovies.length === 0)
      document.getElementById('movies-container').innerHTML = '<img src="image/not_found.gif" alt="Confused Man on Computer" width="400" height="400"><p>NO MOVIES FOUND :(</p>';
    else 
      displayMovies(searchedMovies);
  }

  function filterMovies(filterInput) {
    const filteredMovies = model.data.movies.filter(movie => 
      movie.status === filterInput
    );
    //If no movies are found display a message
    if (filteredMovies.length === 0)
      document.getElementById('movies-container').innerHTML = '<p>No movies found :( </p>';
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
    document.getElementById('edit-popup').style.display = 'flex';

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
        movieDate: parseInt(document.getElementById('edit-movie-year').value),
        rating: Math.round(parseFloat(document.getElementById('edit-movie-rating').value) * 10)/10,
        status: document.getElementById('edit-movie-status').value
    };

    // Append all missing and incorrect fields to alrtmsg 
    let alertmsg = '';
    if(!updateMovie.title) 
      alertmsg += '\nTitle';
    if(!updateMovie.director)
      alertmsg += '\nDirector';
    if(updateMovie.movieDate < 1800 || updateMovie.movieDate > 2030) 
      alertmsg += '\nRelease Year (1800 - 2030)';
    if(updateMovie.rating < 0 || updateMovie.rating > 10) 
      alertmsg += '\nPlease fill in a valid Rating (1-10)';

    if(!(alertmsg === ''))
      { playAlert(); alert('Please fill in: ' + alertmsg); return; }

    if(isNaN(updateMovie.movieDate)) 
      { updateMovie.movieDate = ' - - - - '; }
    
    if(isNaN(updateMovie.rating)) 
      { updateMovie.rating = ' - '; }

    // Update, Close popup & Reload 
    model.data.movies[index] = updateMovie;
    displayMovies(model.data.movies);
    document.getElementById('edit-popup').style.display = 'none';
    playSuccess();
  }

  function deleteEditMovie(index) { 
    //Removes only Object at Index from array Movies
    model.data.movies.splice(index, 1);

    //After removing, renumber the movieID from 0 -->
    model.data.movies.forEach((movie, newMovieID) => {
      movie.movieID = newMovieID;
    });

    // Update, Close popup & Reload 
    displayMovies(model.data.movies);
    document.getElementById('edit-popup').style.display = 'none';
  }

  function clearUserInput()
  {
    document.getElementById('movie-title').value = '';
    document.getElementById('movie-genre').value = '';
    document.getElementById('movie-by').value = '';
    document.getElementById('movie-year').value = '';
    document.getElementById('movie-rating').value = '';
    //no need to clear the status
  }

  // Play Audio Functions
  function playAlert() {
    let A = document.getElementById('alert');
    A.volume = 0.1;
    A.play();
  }
  function playSuccess() {
    let A = document.getElementById('success');
    A.volume = 0.1;
    A.play();
  }
  function playCancel() {
    let A = document.getElementById('cancel');
    A.volume = 1.0;
    A.play();
  }

  // FOR BUTTONS
  // Open Add Movie Popup
  addPopupBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
  });

  // Close Add Movie Popup
  closePopupBtn.addEventListener('click', () => {
      popup.style.display = 'none';
      playCancel();
  });

  // Submit and Close Add Movie Popup
  submitBtn.addEventListener('click', addMovie);

  // Search for a Movie in searchbar
  document.getElementById('search-btn').addEventListener('click', searchMovie);

  // Filter Movie by ...
  document.getElementById('filter-by-nw-btn').addEventListener('click', function() {
    filterMovies('Not Watched');
  });
  document.getElementById('filter-by-s-btn').addEventListener('click', function() {
    filterMovies('Started');
  });
  document.getElementById('filter-by-f-btn').addEventListener('click', function() {
    filterMovies('Finished');
  });

  // Close Edit Movie Popup
  document.getElementById('close-edit-popup').addEventListener('click', function() {
    document.getElementById('edit-popup').style.display = 'none';
    playCancel();
  });
};