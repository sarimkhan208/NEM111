const mongoose = require("mongoose");
//setting up schema for document
const movieSchema = mongoose.Schema({
  movie_name: String,
  genre: String,
  director: String,
  rating: Number,
  year_of_release: Number,
});

//declaring model with schema
const movieModel = mongoose.model("movie", movieSchema);

module.exports = { movieModel };
