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
    option1.value = "chinhSua";
    option1.innerHTML = "&#9998; Chỉnh sửa";
    option1.classList.add = "question-action-item";
    selectElement.appendChild(option1);

    const option2 = document.createElement("li");
    option2.value = "guiDuyet";
    option2.innerHTML = "&#128233; Gửi duyệt";
    option2.classList.add = "question-action-item";
    selectElement.appendChild(option2);

    const option3 = document.createElement("li");
    option3.value = "xoa";
    option3.innerHTML = "&#128465; Xóa";
    option3.classList.add = "question-action-item";
    selectElement.appendChild(option3);
  } else if (question.status.trim() === "Gửi duyệt") {
    const option2 = document.createElement("li");
    option2.value = "xemChiTiet";
    option2.innerHTML = "&#128065; Xem chi tiết";
    option2.classList.add = "question-action-item";
    selectElement.appendChild(option2);
    const option1 = document.createElement("li");
    option1.value = "pheDuyet";
    option1.innerHTML = "&#10004; Phê duyệt";
    option1.classList.add = "question-action-item";
    selectElement.appendChild(option1);

    const option3 = document.createElement("li");
    option3.value = "traVe";
    option3.innerHTML = "&#8634; Trả về";
    option3.classList.add = "question-action-item";
    selectElement.appendChild(option3);
  } else if (question.status.trim() === "Đã duyệt") {
    const option2 = document.createElement("li");
    option2.value = "xemChiTiet";
    option2.innerHTML = "&#128065; Xem chi tiết";
    option2.classList.add = "question-action-item";
    selectElement.appendChild(option2);
    const option1 = document.createElement("li");
    option1.value = "ngung";
    option1.innerHTML = "&#9940; Ngưng";
    option1.classList.add = "question-action-item";
    selectElement.appendChild(option1);
  } else if (question.status.trim() === "Ngưng áp dụng") {
    const option3 = document.createElement("li");
    option3.value = "xemChiTiet";
    option3.innerHTML = "&#128065; Xem chi tiết";
    option3.classList.add = "question-action-item";
    selectElement.appendChild(option3);
    const option1 = document.createElement("li");
    option1.value = "traVe";
    option1.innerHTML = "&#8634; Trả về";
    option1.classList.add = "question-action-item";
    selectElement.appendChild(option1);

    const option2 = document.createElement("li");
    option2.value = "pheDuyet";
    option2.innerHTML = "&#10004; Phê duyệt";
    option2.classList.add = "question-action-item";
    selectElement.appendChild(option2);
  } else {
    const option1 = document.createElement("li");
    option1.value = "chinhSua";
    option1.innerHTML = "&#9998; Chỉnh sửa";
    option1.classList.add = "question-action-item";
    selectElement.appendChild(option1);

    const option2 = document.createElement("li");
    option2.value = "guiDuyet";
    option2.innerHTML = "&#128233; Gửi duyệt";
    option2.classList.add = "question-action-item";
    selectElement.appendChild(option2);
  }
}
