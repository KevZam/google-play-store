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

  function sortResults(results = playstore) {
    //make sure sort is == rating or app
    if (sort != "rating" && sort != "app") {
      res.status(400).send({ message: "sort option not found" });
    }
    //sort response object by value, we'll do this last
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
    res.json(results);
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
    res.json(results);
    sort ? sortResults(results) : res.json(results);
  }
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
