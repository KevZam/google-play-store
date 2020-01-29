const express = require("express");
const morgan = require("morgan");
const playstore = require("./play-store");
const app = express();

app.use(morgan("common"));

app.get("/app", (req, res) => {
  let { sort, genre } = req.query;
  if (!sort && !genre) {
    res.json(playstore);
  }

  // we set a default parameter here to account for line 30, otherwise we can pass a parameter to set it
  function sortResults(results = playstore) {
    //capitalize first letter of each word to match object property
    sort = sort.charAt(0).toUpperCase() + sort.substring(1);

    //make sure sort is == rating or app
    if (sort != "Rating" && sort != "App") {
      res.status(400).send({ message: "sort option not found" });
    }
    let newresults = results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
    res.json(newresults);
  }

  if (sort && !genre) {
    sortResults();
  }

  if (genre) {
    //validate genre is one of our genres
    if (
      genre != "Action" &&
      genre != "Puzzle" &&
      genre != "Strategy" &&
      genre != "Casual" &&
      genre != "Arcade" &&
      genre != "Card"
    ) {
      res.status(400).send({ message: "genre not found" });
    }

    //return only the objects with that genre, so filter through our response obj and make a new array with only those objects
    let results = playstore.filter(app => {
      console.log(app.Genres, genre);
      return app.Genres.toLowerCase().includes(genre.toLowerCase());

      console.log(app.Genres.toLowerCase().includes(genre.toLowerCase()));
    });
    console.log("RESULTS:", results);
    // res.json(results);
    sort ? sortResults(results) : res.json(results);
  }
});

module.exports = app;