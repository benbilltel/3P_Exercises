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



// ...

app.get("/", (req, res) => {
  const questionsDTO = getQuestions();

  res.render("question-bank", {
    questions: questionsDTO,
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
