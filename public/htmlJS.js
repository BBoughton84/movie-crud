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
        $('.movies').after($(`<tr class="${result[i].movieName.replace(/ /g, '-')}">`).html(`<td class="name name-${result[i].movieName.replace(/ /g, '-')}"><a class="show-page" href="show.html?id=${result[i].movieName.replace(/ /g, "_")}">${result[i].movieName}</a></td>
        <td class="director director-${result[i].movieDirector.replace(/ /g, '-')}">${result[i].movieDirector}</td>
        <td class="year">${result[i].year}</td>
        <td class="score">${result[i].score}</td>
        <td><button type="button" class="delete-btn delete-${result[i].movieName.replace(/ /g, '-')}">Delete Movie</button></td>
        <td><button type="button" class="edit-btn edit-${result[i].movieName.replace(/ /g, '-')}"><a href="edit.html?id=${result[i].movieName.replace(/ /g, "_")}">Edit</a></button></td>`))
      }
    }).catch(err => {console.log(err)})

  $('.submit-new-movie').on("click", function() {
    movie = $('.add-movie-title').val()
    director = $('.add-movie-director').val()
    year = $('.add-movie-year').val()
    myRating = $('.add-movie-rating').val()
    posterURL = $('.add-movie-poster').val()

    $.post("/movies", {
      "movieDirector": director,
      "movieName": movie,
      "score": myRating,
      "year": year,
      "poster": posterURL
    }).then(function(allMovies) {
        $('.show-on-add').text("Movie Added!").fadeOut(3000)
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
        $(`.${$selectedItem.replace(/ /g, '-')}`).empty()
      },
      error: function(result) {console.log(result)}
    })
  })
})
