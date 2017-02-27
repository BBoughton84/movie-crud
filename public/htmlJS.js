$(document).ready(function() {

  var movie
  var director
  var year
  var myRating
  var posterURL

  $.get("/movies")
    .then(function(result) {
      for (var i = 0; i < result.length; i++) {
        // console.log(result)
        // console.log("****************")
        $('.movies').append($(`<p class="movies ${result[i].movieName.replace(/ /g, '-')}">`).html(`<span class="name name-${result[i].movieName.replace(/ /g, '-')}">${result[i].movieName}</span>
        <span class="director director-${result[i].movieDirector.replace(/ /g, '-')}">${result[i].movieDirector}</span>
        <span class="year">${result[i].year}</span>
        <span class="score">${result[i].score}</span>
        <button type="button" class="delete-btn delete-${result[i].movieName.replace(/ /g, '-')}">Delete Movie</button>
        <button type="button" class="edit-btn edit-${result[i].movieName.replace(/ /g, '-')}"><a href="edit.html">Edit</a></button>`))
      }
    }).catch(err => {console.log(err)})


  $('.submit-new-movie').on("click", function() {
    movie = $('.add-movie-title').val()
    director = $('.add-movie-director').val()
    year = $('.add-movie-year').val()
    myRating = $('.add-movie-rating').val()
    posterURL = $('.add-movie-poster').val()
    // var nextId = db.get('movies')
    // console.log(nextId)
    // console.log(movie + director + year + myRating + posterURL)
    // $('.add').empty() not working yet

    $.post("/movies", {
      "id": 5,
      "movieDirector": director,
      "movieName": movie,
      "score": myRating,
      "year": year,
      "poster": posterURL
    }).then(function(allMovies) {
        console.log(allMovies)
      })
      .catch(err => {
        console.log(err)
      })
  })

  $(document).on("click", ".delete-btn", function() {
    var $selectedItem = $(this).prev().prev().prev().prev().text()
    $(`.${$selectedItem.replace(/ /g, '-')}`).empty()

    $.ajax({
      url: `/movies/${$selectedItem}`,
      type: 'DELETE',
      success: function(result) {console.log("these are the results " +result)},
      error: function(result) {console.log(result)}
    })
  })

  $(document).on("click", ".edit", function() {
    var $selectedEditMovie = $(this).prev().prev().prev().prev().prev().text()

    var editMovie = $('.edit-movie-title').val()
    var editDirector = $('.edit-movie-director').val()
    var editYear = $('.edit-movie-year').val()
    var editMyRating = $('.edit-movie-rating').val()
    var editPosterURL = $('.edit-movie-poster').val()


  })




















})
