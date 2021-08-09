var express = require("express");
var api = express.Router();

import {
  getMovieList,
  movieSuggestions,
  movieFullInfo
} from "../lib/functions";

// Movies list
api.get("/movies", (req, res) => {
  const url = "https://www.imdb.com/chart/top-english-movies?sort=us,desc";
  getMovieList(url).then(data => {
    res.send(data);
  });
});

// Movies list - Trending
api.get("/trending", (req, res) => {
  const url = "https://www.imdb.com/chart/moviemeter?sort=us,desc";
  getMovieList(url).then(data => {
    res.send(data);
  });
});

// Get movies suggestions
api.get("/suggestions/:movie", (req, res) => {
  movieSuggestions(req.params.movie).then(data => res.send(data));
});

// Get movie details
api.get("/movie/:titleID", (req, res) => {
  movieFullInfo(req.params.titleID).then(data => {
    res.send(data);
  });
});

module.exports = api;
