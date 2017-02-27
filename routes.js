const express = require('express')
const router = express.Router()
const app = express()
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const db = low('./db/db.json', {
  storage: fileAsync
})

app.use(express.static('./public'))

router.get('/movies', (req, res) => {
  const movies = db.get('movies')
  res.json(movies)
})

router.get('/movies/:id', (req, res) =>{
  const name = req.params.id
  const movies = db.get('movies')
  res.json(movies.find({movieName: name}))
})

router.post('/movies', (req, res) => {
  db.get('movies')
    .push(req.body)
    .write()
    .then(allMovies =>{
      res.json(allMovies)
    })
    .catch(err => {
      console.log(err)
    })
})

router.patch('/movies/:id', (req, res) => {
  const movieId = req.params.id
  db.get('movies')
    .find({movieName: movieId})
    .assign(req.body)
    .write()
    .then(updatedMovie => {
      res.json(updatedMovie)
    })
    .catch(err => {
      console.log(err)
    })
})

router.delete('/movies/:id', (req, res) => {
  const deleteMovie = req.params.id
  db.get('movies')
    .remove({movieName: deleteMovie})
    .write()
    .then(removedMovie => {
      res.json(removedMovie)
    })
    .catch(err => {
      console.log(err)
    })
})


module.exports = router
