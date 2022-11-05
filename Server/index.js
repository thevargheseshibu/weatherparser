var express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

var movies = require('./movies.js');

//Use the Router on the sub route /movies
app.get('/', function (req, res) {
  res.send('Hello World');
})

app.get('/movies', function(req, res){
  res.json(movies);
});



const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});