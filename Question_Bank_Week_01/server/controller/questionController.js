let questions = require("../model/question");

const getQuestions = () => {
  const questionsDTO = [];
  questions.forEach((element) => {
    switch (element.status) {
      case 0:
        element.status = "Đang soạn thảo";
        break;
      case 1:
        element.status = "Gửi duyệt";
        break;
      case 2:
        element.status = "Đã duyệt";
        break;
      case 3:
        element.status = "Ngưng áp dụng";
        break;
      case 4:
        element.status = "Trả về";
        break;
    }

    questionsDTO.push(element);
  });
  return questionsDTO;
};
const updateStatusQuestion = (id, status) => {
  const findIndex = questions.findIndex((question) => question.id === id);
  if (findIndex !== -1) {
    questions[findIndex].status = status;
    return true;
  } else {
    return false;
  }
};
const updateStatusQuestions = (ids, status) => {
  ids.forEach((id) => {
    const findIndex = questions.findIndex((question) => question.id === id);
    if (findIndex !== -1) {
      questions[findIndex].status = status;
    } else {
      return false;
    }
  });
  return true;
};
module.exports = { getQuestions, updateStatusQuestion,updateStatusQuestions };
