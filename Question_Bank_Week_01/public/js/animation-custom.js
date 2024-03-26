// Function to handle checkbox change event
function handleCheckboxChange(event) {
  const checkbox = event.target;
  const checkboxName = checkbox.name;
  const isChecked = checkbox.checked;

  // Save the checked status to localStorage
  localStorage.setItem(checkboxName, isChecked);
}
function restoreCheckboxStates() {
  const filterStatus = document.querySelectorAll('.question-filter input[type="checkbox"]');

  filterStatus.forEach((checkbox) => {
    const checkboxName = checkbox.name;
    let isChecked = localStorage.getItem(checkboxName) === 'true';

    if (checkboxName === 'dangSoanThao') {
      isChecked = isChecked || localStorage.getItem(checkboxName) === null;
    }

    checkbox.checked = isChecked;

    const navItem = checkbox.closest(".nav-item");
    if (checkbox.checked) {
      navItem.classList.add("active");
    } else {
      navItem.classList.remove("active");
    }
  });
  filterQuestions();
}

// Add event listeners to checkboxes
const filterCheckBoxex = document.querySelectorAll('.question-filter input[type="checkbox"]');
filterCheckBoxex.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckboxChange);
});

// Restore checkbox states on page load
document.addEventListener('DOMContentLoaded', restoreCheckboxStates);
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

const renderMenuAction = ()=>{
  Array.from(questionRows).forEach((questionRow) => {
    const question = JSON.parse(questionRow.dataset.question);
    const selectElement = questionRow.querySelector("ul.action-question-menu");
  
    selectElement.innerHTML = ""; // Clear any existing options
  
    const createOption = (questionId, iconClass, label, statusId) => {
      const option = document.createElement("li");
      option.dataset.questionId = questionId;
      option.innerHTML = `<i class="${iconClass} me-3"></i> ${label}`;
      option.classList.add("question-action-item", "nav-item", "text-start");
      option.addEventListener("click", () => {
        updateStatusQuestion(questionId, statusId);
      });
      selectElement.appendChild(option);
    };
  
    switch (question.status.trim()) {
      case "Đang soạn thảo":
        
        if(!question.id || !question.content || !question.type || !question.group || !question.time){
          createOption(question.id, "fa-regular fa-pen-to-square", "Chỉnh sửa", 1);
          createOption(question.id, "fa-regular fa-trash-can", "Xóa", 1);
        }else{
          createOption(question.id, "fa-regular fa-pen-to-square", "Chỉnh sửa", 1);
          createOption(question.id, "fa-regular fa-trash-can", "Xóa", 1);
          createOption(question.id, "fa-regular fa-paper-plane", "Gửi duyệt", 1);
        }
        if(!question.id || !question.type){
          const questionBorders = questionRow.querySelectorAll(".question-border")
          
          questionBorders.forEach(b=>{
            b.style.display = "none"
          })
        }
      
        
        break;
      case "Gửi duyệt":
        createOption(question.id, "fa-regular fa-pen-to-square", "Chỉnh sửa", 1);
        createOption(question.id, "fa-regular fa-circle-check", "Phê duyệt", 2);
        createOption(question.id, "fa-solid fa-rotate-left", "Trả về", 4);
        break;
      case "Áp dụng":
        createOption(question.id, "fa-regular fa-folder-open", "Xem chi tiết", 3);
        createOption(question.id, "fa-solid fa-ban", "Ngưng hiển thị", 3);
        break;
      case "Ngưng áp dụng":
        createOption(question.id, "fa-regular fa-folder-open", "Xem chi tiết", 4);
        createOption(question.id, "fa-solid fa-rotate-left", "Trả về", 4);
        createOption(question.id, "fa-regular fa-circle-check", "Phê duyệt", 1);
        break;
      default:
        createOption(question.id, "fa-regular fa-pen-to-square", "Chỉnh sửa", 1);
        createOption(question.id, "fa-regular fa-paper-plane", "Gửi duyệt", 1);
        break;
    }
  });
}


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
  const checkAction = tr.querySelector(".check-popup");
  checkAction.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the tr click event from firing
    const questionData = JSON.parse(tr.getAttribute("data-question"));
    const questionId = questionData.id;
    const tagStatus = tr.querySelector("td.question-status");
    const status = tagStatus.innerHTML;


    if (checkAction.checked) {
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
      console.log(questionId,status)
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
mapAction.set("Áp dụng",actions2);
mapAction.set("Ngưng áp dụng",actions3);
mapAction.set("Trả về",actions4);

const pushIdToMap = (id,status)=>{
  mapAction.forEach((value,key)=>{
    if(key == status.replace("\n","").trim() ){
      value.push(id);
    }
  })
}
const removeIdFromMap = (id,status)=>{
  mapAction.forEach((value,key)=>{
    if(key == status.replace("\n","").trim() ){
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
mapAction.set("Áp dụng",actions2);
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


/*take all question*/
const allQuestions = document.getElementById("allQuestions")
allQuestions.addEventListener("click",()=>{
  if(allQuestions.checked){
    closePopup()
    trCheck.forEach((tr)=>{
      let subCheckBoxs = tr.querySelectorAll(".check-popup")
      subCheckBoxs.forEach((c)=>{
        const questionData = JSON.parse(tr.getAttribute("data-question"));
    const questionId = questionData.id;
    const tagStatus = tr.querySelector("td.question-status");
    const status = tagStatus.innerHTML;
c.checked = true;

    if (c.checked) {
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
      })
    })
  }else{
    trCheck.forEach((tr)=>{
      let subCheckBoxs = tr.querySelectorAll(".check-popup")
      subCheckBoxs.forEach((c)=>{

c.checked = false;

    if (c.checked) {
      tr.classList.add("active");
    } else {
      tr.classList.remove("active");
    }})
closePopup();
  })
}
})

const closePopupCustom =()=>{
  closePopup()
  allQuestions.checked = false
};

  const select = document.getElementById('numbers-select');
  let options = select.querySelectorAll("option")
    options.forEach(op=>{
      if(op.value == select.value){
        op.style.display = "none"
      }else{
        op.style.display = "block"
      }
    })
  select.addEventListener('click', function() {
    let options = select.querySelectorAll("option")
    options.forEach(op=>{
      if(op.value == select.value){
        op.style.display = "none"
        
      }else{
        op.style.display = "block"
      }
    })

  });
  select.addEventListener('change', function() {
    
    itemPerPage = Number(select.value);
    currentPage =1;
    filterQuestions()
  });

