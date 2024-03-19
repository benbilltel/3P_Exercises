const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("question-bank");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
