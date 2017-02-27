$(document).ready(function() {

  var movie
  var director
  var year
  var myRating
  var posterURL
  var $selectedEditMovie

  // <div class="col-lg-3 col-md-4 col-sm-6">
  // <article class="card">
  //   <header class="title-header">
  //     <h3>Movie Title</h3>
  //   </header>
  //   <div class="card-block">
  //     <div class="img-card">
  //       <img src="//placehold.it/300x250" alt="Movie" class="w-100" />
  //     </div>
  //     <p class="tagline card-text text-xs-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
  //     <a href="#" class="btn btn-primary btn-block"><i class="fa fa-eye"></i> Watch Now</a>
  //   </div>
  // </article>
  // </div>

  $.get("/movies")
    .then(function(result) {
      for (var i = 0; i < result.length; i++) {
        $('.movies').append($(`<p class="movies ${result[i].movieName.replace(/ /g, '-')}">`).html(`<span class="name name-${result[i].movieName.replace(/ /g, '-')}"><a class="show-page" href="show.html?id=${result[i].movieName.replace(/ /g, "_")}">${result[i].movieName}</a></span>
        <span class="director director-${result[i].movieDirector.replace(/ /g, '-')}">${result[i].movieDirector}</span>
        <span class="year">${result[i].year}</span>
        <span class="score">${result[i].score}</span>
        <button type="button" class="delete-btn delete-${result[i].movieName.replace(/ /g, '-')}">Delete Movie</button>
        <button type="button" class="edit-btn edit-${result[i].movieName.replace(/ /g, '-')}"><a href="edit.html?id=${result[i].movieName.replace(/ /g, "_")}">Edit</a></button>`))
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


  })


  // $(document).on("click", ".show-page", function () {
  //   console.log($(this).text());
  //   $('.show-title').text($(this).text())
  // })














})
