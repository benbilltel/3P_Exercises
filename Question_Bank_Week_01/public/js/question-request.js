// Get the checkboxes
const filterQuestion1 = document.getElementById("filterQuestion1");
const filterQuestion2 = document.getElementById("filterQuestion2");
const filterQuestion3 = document.getElementById("filterQuestion3");
const filterQuestion4 = document.getElementById("filterQuestion4");

// Get the question rows

const renderFirstTime = () => {
  for (let i = 0; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    const question = JSON.parse(questionRow.dataset.question);

    // Check the status of the question and show/hide the row accordingly
    if (
      filterQuestion1.checked &&
      (question.status === "Đang soạn thảo" || question.status === "Trả về")
    ) {
      questionRow.style.display = "table-row";
    } else {
      questionRow.style.display = "none";
    }
  }
};

// Add event listeners to the checkboxes
renderFirstTime();
filterQuestion1.addEventListener("change", filterQuestions);
filterQuestion2.addEventListener("change", filterQuestions);
filterQuestion3.addEventListener("change", filterQuestions);
filterQuestion4.addEventListener("change", filterQuestions);

function filterQuestions() {
  // Check if none of the checkboxes are checked
  const noFilterChecked =
    !filterQuestion1.checked &&
    !filterQuestion2.checked &&
    !filterQuestion3.checked &&
    !filterQuestion4.checked;

  // Iterate over the question rows
  for (let i = 0; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    const question = JSON.parse(questionRow.dataset.question);

    // Check the status of the question and show/hide the row accordingly
    if (
      noFilterChecked ||
      (filterQuestion1.checked &&
        (question.status === "Đang soạn thảo" ||
          question.status === "Trả về")) ||
      (filterQuestion2.checked && question.status === "Gửi duyệt") ||
      (filterQuestion3.checked && question.status === "Đã duyệt") ||
      (filterQuestion4.checked && question.status === "Ngưng áp dụng")
    ) {
      questionRow.style.display = "table-row";
    } else {
      questionRow.style.display = "none";
    }
  }
}
