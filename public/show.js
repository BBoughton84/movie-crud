$(document).ready(function() {
  var specificName = decodeURIComponent(window.location.search).split("=")[1]

  var editedName = specificName.replace(/_/g, " ")
  console.log("this is show.js page " + editedName)

  $.get(`/movies/${editedName}`)
    .then(function(success) {
      $('.show-title').text(success.movieName)
      $('.show-movie-title').text(success.movieName)
      $('.show-movie-director').text(success.movieDirector)
      $('.show-movie-year').text(success.year)
      $('.show-movie-rating').text(success.score)
      $('.show-movie-poster').text(success.poster)
      $('.poster').attr("src", success.poster)
    }).catch(err => {console.log(err)})

})
