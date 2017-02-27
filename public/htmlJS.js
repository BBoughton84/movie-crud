$(document).ready(function() {

  var movie
  var director
  var year
  var myRating
  var posterURL
  var $selectedEditMovie

  $.get("/movies")
    .then(function(result) {
      for (var i = 0; i < result.length; i++) {
        // console.log(result)
        // console.log("****************")
        $('.movies').append($(`<p class="movies ${result[i].movieName.replace(/ /g, '-')}">`).html(`<span class="name name-${result[i].movieName.replace(/ /g, '-')}"><a class="show-page" href="show.html">${result[i].movieName}</a></span>
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
      success: function(result) {
        console.log("these are the results " +result)
        $(`.${$selectedItem.replace(/ /g, '-')}`).empty()
      },
      error: function(result) {console.log(result)}
    })
  })

  $(document).on("click", ".edit-btn", function() {
    var $selectedEditMovie = $(this).prev().prev().prev().prev().prev().text()
    console.log($selectedEditMovie)

    $('.main-title').replaceWith(`<b>${$selectedEditMovie}</b>`)
    $('.main-title').text($selectedEditMovie)

    $.get(`/movies/${$selectedEditMovie}`)
      .then(function(success) {
        $('.edit-movie-title').val(success.movieName)
        $('input[name=title]').val(success.movieName)
        $('.test1').text(success.movieName)
        $('.poster').attr("src", success.poster)
        console.log(success.movieName);
      }).catch(err => {console.log(err)})
  })


  $(document).on("click", ".edit-movie", function() {

    var editMovie = $('.edit-movie-title').val()
    var editDirector = $('.edit-movie-director').val()
    var editYear = $('.edit-movie-year').val()
    var editMyRating = $('.edit-movie-rating').val()
    var editPosterURL = $('.edit-movie-poster').val()

    $.ajax({
      url: `/movies/${editMovie}`,
      type: 'PATCH',
      data: {
        "movieDirector": editDirector,
        "movieName": editMovie,
        "score": editMyRating,
        "year": editYear,
        "poster": editPosterURL
      },
      success: function(result) {
        console.log(result)
      },
      error: function(err) {console.log(err)}
    })
  })



  $(document).on("click", ".show-page", function () {
    console.log($(this).text());
    $('.show-title').text($(this).text())
  })














})
