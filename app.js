const express = require("express");
const morgan = require("morgan");
const playstore = require("./play-store");
const app = express();

app.get("/playstore", (req, res) => {});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
