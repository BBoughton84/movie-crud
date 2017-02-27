$(document).ready(function() {

  var specificName = decodeURIComponent(window.location.search).split("=")[1]

  var editedName = specificName.replace(/_/g, " ")

  $.get(`/movies/${editedName}`)
    .then(function(success) {
      $('.main-title').text(success.movieName)
      $('.edit-movie-title').val(success.movieName)
      $('.edit-movie-director').val(success.movieDirector)
      $('.edit-movie-year').val(success.year)
      $('.edit-movie-rating').val(success.score)
      $('.edit-movie-poster').val(success.poster)
      $('.poster').attr("src", success.poster)
    }).catch(err => {console.log(err)})

  $('.edit-movie').on("click", function() {
    var editMovie = $('.edit-movie-title').val()
    var editDirector = $('.edit-movie-director').val()
    var editYear = $('.edit-movie-year').val()
    var editMyRating = $('.edit-movie-rating').val()
    var editPosterURL = $('.edit-movie-poster').val()

  $.ajax({
    url: `/movies/${editedName}`,
    type: 'PATCH',
    data: {
      "movieDirector": editDirector,
      "movieName": editMovie,
      "score": editMyRating,
      "year": editYear,
      "poster": editPosterURL
    },
    success: function(result) {
      $('.on-good-edit').text("Movie Saved!").fadeOut(3000)
    },
    error: function(err) {console.log(err)}
    })
  })





})
