import Model from './model.js';

window.onload = function() {
  const model = new Model();

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

  displayMovies(model.data.movies);

  const openPopup =  Boolean(false);
  function popup() {
    document.getElementById('popup').style.display = 'block';
  }

  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }
};
