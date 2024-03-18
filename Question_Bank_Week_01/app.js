const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
