const customDropDown = (classname) => {
  const toggle = document.querySelectorAll(classname);
  toggle.forEach((element) => {
    element.addEventListener("click", () => {
      const dropdownMenu = element.nextElementSibling;
      if (dropdownMenu && dropdownMenu.classList.contains("dropdown-cs-menu")) {
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      }
    });
  });

  // Add event listener to each nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const dropdownMenus = document.querySelectorAll(".dropdown-cs-menu");
      dropdownMenus.forEach((menu) => {
        // Hide dropdown menus except the one associated with the clicked nav link
        if (!link.classList.contains("dropdown-cs-toggle")) {
          menu.style.display = "none";
        }
      });
    });
  });
};

customDropDown(".dropdown-cs-toggle");

function setActiveNavItem(classname) {
  const navItems = document.querySelectorAll(classname);

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const showActionQuestions = document.querySelectorAll(
    ".show-action-question"
  );

  showActionQuestions.forEach(function (showActionQuestion) {
    showActionQuestion.addEventListener("click", function () {
      // Remove the "active" class from other elements
      showActionQuestions.forEach(function (element) {
        if (element !== showActionQuestion) {
          element.classList.remove("active");
        }
      });

      // Toggle the "active" class for the clicked element
      showActionQuestion.classList.toggle("active");
    });
  });
});
const navLinks = document.querySelectorAll(".header-left .nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".border-active")?.classList.remove("active");
    });

    link.classList.add("active");
    link.querySelector(".border-active")?.classList.add("active");
  });
});
setActiveNavItem(".sidebar .nav-link");
setActiveNavItem(".dropdown-cs-item");

const checkboxes = document.querySelectorAll(
  '.question-filter-left .nav-item input[type="checkbox"]'
);

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const navItem = this.closest(".nav-item");
    if (this.checked) {
      navItem.classList.add("active");
    } else {
      navItem.classList.remove("active");
    }
  });
});

//display option
// Iterate over the question rows
const updateStatusQuestion = (questionId, action) => {
  const formData = new FormData();
  formData.append("status", action);

  fetch("/update/question/" + questionId, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Question updated successfully") {
      
        showToast('Success!', true,()=>{
          window.location.href = "/";
        });
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while updating the product");
    });
};
const questionRows = document.getElementsByClassName("question-row");
for (let i = 0; i < questionRows.length; i++) {
  const questionRow = questionRows[i];
  const question = JSON.parse(questionRow.dataset.question);

  // Get the select element within the row
  const selectElement = questionRow.querySelector("ul.action-question-menu");

  // Clear any existing options
  selectElement.innerHTML = "";

  // Create the options based on the question status
  if (question.status.trim() === "Đang soạn thảo") {
    const option1 = document.createElement("li");
    option1.dataset.questionId = question.id;
    option1.innerHTML =
      '<i class="fa-regular fa-pen-to-square me-3"></i> Chỉnh sửa';
    option1.classList.add("question-action-item", "nav-item", "text-start");
    selectElement.appendChild(option1);

    const option2 = document.createElement("li");
    option2.dataset.questionId = question.id;
    option2.innerHTML =
      '<i class="fa-regular fa-paper-plane me-3"></i> Gửi duyệt';
    option2.classList.add("question-action-item", "nav-item", "text-start");
    option2.addEventListener("click", function () {
      updateStatusQuestion(question.id, 1);
    });
    selectElement.appendChild(option2);

    const option3 = document.createElement("li");
    option3.dataset.questionId = question.id;
    option3.innerHTML = '<i class="fa-regular fa-trash-can me-3"></i> Xóa';
    option3.classList.add("question-action-item", "nav-item", "text-start");
    selectElement.appendChild(option3);
  } else if (question.status.trim() === "Gửi duyệt") {
    const option2 = document.createElement("li");
    option2.dataset.questionId = question.id;
    option2.innerHTML =
      '<i class="fa-regular fa-folder-open me-3"></i> Xem chi tiết';
    option2.classList.add("question-action-item", "nav-item", "text-start");
    selectElement.appendChild(option2);
    const option1 = document.createElement("li");
    option1.dataset.questionId = question.id;
    option1.innerHTML =
      '<i class="fa-regular fa-circle-check me-3"></i>Phê duyệt';
    option1.classList.add("question-action-item", "nav-item", "text-start");
    option1.addEventListener("click", function () {
      updateStatusQuestion(question.id, 2);
    });
    selectElement.appendChild(option1);

    const option3 = document.createElement("li");
    option3.dataset.questionId = question.id;
    option3.innerHTML = '<i class="fa-solid fa-rotate-left me-3"></i> Trả về';
    option3.classList.add("question-action-item", "nav-item", "text-start");
    option3.addEventListener("click", function () {
      updateStatusQuestion(question.id, 4);
    });
    selectElement.appendChild(option3);
  } else if (question.status.trim() === "Đã duyệt") {
    const option2 = document.createElement("li");
    option2.dataset.questionId = question.id;
    option2.innerHTML =
      '<i class="fa-regular fa-folder-open me-3"></i> Xem chi tiết';
    option2.classList.add("question-action-item", "nav-item", "text-start");
    selectElement.appendChild(option2);
    const option1 = document.createElement("li");
    option1.dataset.questionId = question.id;
    option1.innerHTML = '<i class="fa-solid fa-ban me-3"></i> Ngưng';
    option1.classList.add("question-action-item", "nav-item", "text-start");
    option1.addEventListener("click", function () {
      updateStatusQuestion(question.id, 3);
    });
    selectElement.appendChild(option1);
  } else if (question.status.trim() === "Ngưng áp dụng") {
    const option3 = document.createElement("li");
    option3.dataset.questionId = question.id;
    option3.innerHTML =
      '<i class="fa-regular fa-folder-open me-3"></i> Xem chi tiết';
    option3.classList.add("question-action-item", "nav-item", "text-start");
    selectElement.appendChild(option3);
    const option1 = document.createElement("li");
    option1.dataset.questionId = question.id;
    option1.innerHTML = '<i class="fa-solid fa-rotate-left me-3"></i> Trả về';
    option1.classList.add("question-action-item", "nav-item", "text-start");
    option1.addEventListener("click", function () {
      updateStatusQuestion(question.id, 4);
    });
    selectElement.appendChild(option1);

    const option2 = document.createElement("li");
    option2.dataset.questionId = question.id;
    option2.innerHTML =
      '<i class="fa-regular fa-circle-check me-3"></i>Phê duyệt';
    option2.classList.add("question-action-item", "nav-item", "text-start");
    option2.addEventListener("click", function () {
      updateStatusQuestion(question.id, 1);
    });
    selectElement.appendChild(option2);
  } else {
    const option1 = document.createElement("li");
    option1.dataset.questionId = question.id;
    option1.innerHTML =
      '<i class="fa-regular fa-pen-to-square me-3"></i> Chỉnh sửa';
    option1.classList.add("question-action-item", "nav-item", "text-start");
    selectElement.appendChild(option1);

    const option2 = document.createElement("li");
    option2.dataset.questionId = question.id;
    option2.innerHTML =
      '<i class="fa-regular fa-paper-plane me-3"></i> Gửi duyệt';
    option2.classList.add("question-action-item", "nav-item", "text-start");
    option2.addEventListener("click", function () {
      updateStatusQuestion(question.id, 1);
    });
    selectElement.appendChild(option2);
  }
}
/*show action question*/

const showActionButtons = document.querySelectorAll(".show-action-question");

showActionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const parentTd = this.parentNode; // Get the parent <td> element
    const actionMenu = parentTd.querySelector(".action-question-menu");
    const isHidden = getComputedStyle(actionMenu).display === "none";

    // Hide all action-question-menu elements
    const openMenus = document.querySelectorAll(".action-question-menu");
    openMenus.forEach((menu) => {
      menu.style.display = "none";
    });

    // Toggle the display of the clicked action-question-menu
    actionMenu.style.display = isHidden ? "block" : "none";
  });
});

/*toasts*/
function showToast(message, isSuccess,callback) {
  var toastClass = isSuccess ? 'toasts-success' : 'toasts-fail';
  var toastElement = document.createElement('div');
  toastElement.classList.add('toasts', toastClass);
  toastElement.innerHTML = '<i class="fa-regular fa-circle-' + (isSuccess ? 'check' : 'xmark') + ' pe-4"></i>' +
    '<p class="toasts-text">' + message + '</p>';
console.log(toastElement)
  document.body.appendChild(toastElement);

  setTimeout(function () {
    toastElement.classList.add('show');
  }, 100);

  setTimeout(function () {
    toastElement.remove();
    if (typeof callback === 'function') {
      callback(); 
    }
  }, 3000);
}
