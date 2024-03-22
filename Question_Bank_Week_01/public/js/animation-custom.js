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


/*trCheck.forEach((tr) => {
  tr.addEventListener("click", function (event) {
    // Check if the click was directly on the button
    if (event.target.tagName === "BUTTON") {
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
    } else {

      trCheck.forEach((row) => {
        const checkbox = row.querySelector(".check-popup");
        const questionData = JSON.parse(row.getAttribute("data-question"));
        const questionId = questionData.id;
        
      
        row.addEventListener("click", function () {
      
          checkbox.checked = !checkbox.checked;
          const tagStatus = row.querySelector("td.question-status")
        const status = tagStatus.innerHTML;
          if(checkbox.checked){
            row.classList.add("active")
      
            pushIdToMap(questionId,status)
          }else{
            row.classList.remove("active")
      
            removeIdFromMap(questionId,status)
          }
          let ids = 0;
          mapAction.forEach((value)=>{
            ids+=value.length;
          })
          if(ids>0){
            let popup = document.getElementById("popup-action");
            popup.style.display = "block"
            const numOfQuestion = popup.querySelector("h1")
            numOfQuestion.innerHTML = ids;
            let actions = popup.querySelectorAll(".nav-link")
            
            actions.forEach((action)=>{
              switch(action.dataset.action){
                case "guiDuyet":
                  {
                    
      if(actions0.length>0||actions4.length>0){
      action.style.display = "block"
      }else{
        action.style.display = "none"
      }
                  }
                  break;
                  case "traVe":
                  {
                    if(actions1.length>0||actions3.length>0){
                      action.style.display = "block"
                    }else{
                      action.style.display = "none"
                    }
                  }
                  break;
                  case "duyetApDung":
                  {
                    if(actions1.length>0||actions3.length>0){
                      action.style.display = "block"
                    }else{
                      action.style.display = "none"
                    }
                  }
                  break;
                  case "ngung":
                  {
                    if(actions2.length>0){
                      action.style.display = "block"
                    }else{
                      action.style.display = "none"
                    }
                  }
                  break;
                  case "xoa":
                  {
      if(actions0.length>0){
        action.style.display = "block"
      }else{
        action.style.display = "none"
      }
                  }
                  break;
              }
            })
          }else{
            let popup = document.getElementById("popup-action");
            popup.style.display = "none"
          }
        });
        checkbox.addEventListener("click", function (event) {
          event.stopPropagation(); // Prevent the click event from bubbling up to the row
      
          checkbox.checked = !checkbox.checked;
          const tagStatus = row.querySelector("td.question-status")
        const status = tagStatus.innerHTML;
          if(checkbox.checked){
            row.classList.add("active")
            pushIdToMap(questionId,status)
          }else{
            row.classList.remove("active")
            removeIdFromMap(questionId,status)
          }
          let ids = 0;
          mapAction.forEach((value)=>{
            ids+=value.length;
          })
          if(ids>0){
            let popup = document.getElementById("popup-action");
            popup.style.display = "block"
            const numOfQuestion = popup.querySelector("h1")
            numOfQuestion.innerHTML = ids;
            let actions = popup.querySelectorAll(".nav-link")
            
            actions.forEach((action)=>{
             
              switch(action.dataset.action){
                case "guiDuyet":
                  {
                    
      if(actions0.length>0||actions4.length>0){
      action.style.display = "block"
      }else{
        action.style.display = "none"
      }
                  }
                  break;
                  case "traVe":
                  {
                    if(actions1.length>0||actions3.length>0){
                      action.style.display = "block"
                    }else{
                      action.style.display = "none"
                    }
                  }
                  break;
                  case "duyetApDung":
                  {
                    if(actions1.length>0||actions3.length>0){
                      action.style.display = "block"
                    }else{
                      action.style.display = "none"
                    }
                  }
                  break;
                  case "ngung":
                  {
                    if(actions2.length>0){
                      action.style.display = "block"
                    }else{
                      action.style.display = "none"
                    }
                  }
                  break;
                  case "xoa":
                  {
      if(actions0.length>0){
        action.style.display = "block"
      }else{
        action.style.display = "none"
      }
                  }
                  break;
              }
            })
          }else{
            let popup = document.getElementById("popup-action");
            popup.style.display = "none"
          }
        });
      });
    }
  });
});*/
const trCheck = document.querySelectorAll(".question-row")

trCheck.forEach((tr) => {
  const button = tr.querySelector(".show-action-question");
  const actionMenu = tr.querySelector(".action-question-menu");

  button.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the tr click event from firing
    const isHidden = getComputedStyle(actionMenu).display === "none";

    const openMenus = document.querySelectorAll(".action-question-menu");
    openMenus.forEach((menu) => {
      menu.style.display = "none";
    });

    actionMenu.style.display = isHidden ? "block" : "none";
  });

  tr.addEventListener("click", function (event) {
    const checkbox = tr.querySelector(".check-popup");
    const questionData = JSON.parse(tr.getAttribute("data-question"));
    const questionId = questionData.id;
    const tagStatus = tr.querySelector("td.question-status");
    const status = tagStatus.innerHTML;

    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
      tr.classList.add("active");
      pushIdToMap(questionId, status);
    } else {
      tr.classList.remove("active");
      removeIdFromMap(questionId, status);
    }

    let ids = 0;
    mapAction.forEach((value) => {
      ids += value.length;
    });

    const popup = document.getElementById("popup-action");
    if (ids > 0) {
      popup.style.display = "block";
      const numOfQuestion = popup.querySelector("h1");
      numOfQuestion.innerHTML = ids;
      let actions = popup.querySelectorAll(".nav-link");

      actions.forEach((action) => {
        switch (action.dataset.action) {
          case "guiDuyet": {
            if (actions0.length > 0 || actions4.length > 0) {
              action.style.display = "block";
            } else {
              action.style.display = "none";
            }
            break;
          }
          case "traVe": {
            if (actions1.length > 0 || actions3.length > 0) {
              action.style.display = "block";
            } else {
              action.style.display = "none";
            }
            break;
          }
          case "duyetApDung": {
            if (actions1.length > 0 || actions3.length > 0) {
              action.style.display = "block";
            } else {
              action.style.display = "none";
            }
            break;
          }
          case "ngung": {
            if (actions2.length > 0) {
              action.style.display = "block";
            } else {
              action.style.display = "none";
            }
            break;
          }
          case "xoa": {
            if (actions0.length > 0) {
              action.style.display = "block";
            } else {
              action.style.display = "none";
            }
            break;
          }
        }
      });
    } else {
      const popup = document.getElementById("popup-action");
      popup.style.display = "none";
    }
  });
});
/*toasts*/
function showToast(message, isSuccess,callback) {
  var toastClass = isSuccess ? 'toasts-success' : 'toasts-fail';
  var toastElement = document.createElement('div');
  toastElement.classList.add('toasts', toastClass);
  toastElement.innerHTML = '<i class="fa-regular fa-circle-' + (isSuccess ? 'check' : 'xmark') + ' pe-2"></i>' +
    '<p class="toasts-text">' + message + '</p>';
toastElement.classList.add("d-flex","justify-content-start","align-items-center")
  document.body.appendChild(toastElement);

  setTimeout(function () {
    toastElement.classList.add('show');
  }, 100);

  setTimeout(function () {
    toastElement.remove();
    if (typeof callback === 'function') {
      callback(); 
    }
  }, 1000);
}
//popup
const mapAction = new Map();
let actions0 = [],actions1 = [],actions2 = [],actions3 = [],actions4 = []
mapAction.set("Đang soạn thảo",actions0);
mapAction.set("Gửi duyệt",actions1);
mapAction.set("Đã duyệt",actions2);
mapAction.set("Ngưng áp dụng",actions3);
mapAction.set("Trả về",actions4);

const pushIdToMap = (id,status)=>{
  mapAction.forEach((value,key)=>{
    if(key == status ){
      value.push(id);
    }
  })
}
const removeIdFromMap = (id,status)=>{
  mapAction.forEach((value,key)=>{
    if(key == status ){
      const indexRemove = value.findIndex(i=>i == id);
      if(indexRemove!== -1 ){
        value.splice(indexRemove,1)
      }
    }
  })
}


const closePopup = ()=>{
  actions0 = [];actions1 = [];actions2 = [];actions3 = [];actions4 = []
  mapAction.set("Đang soạn thảo",actions0);
mapAction.set("Gửi duyệt",actions1);
mapAction.set("Đã duyệt",actions2);
mapAction.set("Ngưng áp dụng",actions3);
mapAction.set("Trả về",actions4);
  trCheck.forEach((row) => {
    const checkbox = row.querySelector(".check-popup");
    checkbox.checked = false;
    row.classList.remove("active")
    let popup = document.getElementById("popup-action");
    popup.style.display = "none"
    
  })
}


