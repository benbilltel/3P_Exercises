const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const {
  getQuestions,
  updateStatusQuestion,
  updateStatusQuestions,
} = require("./server/controller/questionController");
const questions = require("./server/model/question");
const multer = require("multer");
const upload = multer();
app.use(upload.none());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const ITEMS_PER_PAGE = 10; // Number of questions per page

// ...

app.get("/", (req, res) => {
  const totalQuestions = questions.length;
  const currentPage = req.query.page || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const questionsDTO = getQuestions().slice(startIndex, endIndex);

  res.render("question-bank", {
    questions: questionsDTO,
    totalQuestions,
    currentPage,
    ITEMS_PER_PAGE
  });
});

// ...
app.put("/update/question/:questionId", (req, res) => {
  const questionId = req.params.questionId;
  const updateStatus = parseInt(req.body.status);

  if (updateStatusQuestion(questionId, updateStatus)) {
    const questionDTO = getQuestions()
    res.json({ questionDTOs : questionDTO,message: "Question updated successfully" });
  } else {
    res.status(404).json({ message: "Question not found" });
  }
});
app.put("/update/questions/", (req, res) => {
  const ids = req.body.ids.split(",");
  const updateStatus = parseInt(req.body.status);
  
  if (updateStatusQuestions(ids, updateStatus)) {
    const questionDTO = getQuestions()
    res.json({ questionDTOs : questionDTO,message: "Questions updated successfully" });
  } else {
    res.status(404).json({ message: "Question not found" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
