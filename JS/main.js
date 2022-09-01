  $('#searchForm').on('submit', (e) => {
      let searchText = $("#searchText").val();
      getMovies(searchText);
      e.preventDefault();
   });


function getMovies(searchText) {
  const axiApi = axios.get('https://www.omdbapi.com?s='+searchText+'&apikey=d5e41865')
  axiApi.then((response) =>{
    let movies = response.data.Search;
    console.log(movies.length);
    let output ='';
    $.each(movies, (index, movie) => {
      output += `
            <div class="col-md-3">
             <div class="card text-center">
                <div class="card-img-top">
                  <img src= "${movie.Poster}">
                  <h5>${movie.Title}</h5>
                  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
             </div>
            </div>
      `;
    });

    $('#movies').html(output);
  })

  axiApi.catch((err) => {
    console.log(err);
  });
}


function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';

}

function getMovie() {
  let movieId  = sessionStorage.getItem('movieId');

  axios.get('https://www.omdbapi.com?i='+movieId+'&apikey=d5e41865')
  .then((response) =>{
    console.log(response);
    let movie = response.data;

    let output = `
          <div class="row">

           <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
           </div>

           <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="detailsList">
             <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
             <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
             <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
             <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
             <li class="list-group-item"><strong>IMDB rating:</strong> ${movie.imdbRating}</li>
             <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
             <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
           </div>

          </div>

          <div class="row">
           <div class="card plot">
            <h3>Plot</h3>
            ${movie.Plot}
              <hr>
              <div class="buttons">
                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-success imdbBtn">View Imdb</a>
                <a href="index.html" class="btn btn-primary goBackBtn">Go Back To Search</a>
              </div>

             </div>
            </div>

    `;
    $('#movie').html(output);
  })

  .catch((err) => {
    console.log(err);
  });

}
