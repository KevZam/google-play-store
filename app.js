const express = require("express");
const morgan = require("morgan");
const playstore = require("./play-store");
const app = express();

app.use(morgan("common"));

app.get("/app", (req, res) => {
  const { sort, genre } = req.query;
  if (!sort && !genre) {
    res.json(playstore);
  }

  function sortResults(results) {
    results = playstore;

    //capitalize first letter of each word to match object property
    sort1 = sort.charAt(0).toUpperCase() + sort.substring(1);

    //make sure sort is == rating or app
    if (sort1 != "Rating" && sort1 != "App") {
      res.status(400).send({ message: "sort option not found" });
    }
    //sort response object by value, we'll do this last
    let newresults = results.sort((a, b) => {
      return a[sort1] > b[sort1] ? 1 : a[sort1] < b[sort1] ? -1 : 0;
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

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
