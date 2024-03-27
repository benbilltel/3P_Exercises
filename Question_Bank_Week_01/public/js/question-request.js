// Get the checkboxes
const filterQuestion1 = document.getElementById("filterQuestion1");
const filterQuestion2 = document.getElementById("filterQuestion2");
const filterQuestion3 = document.getElementById("filterQuestion3");
const filterQuestion4 = document.getElementById("filterQuestion4");

// Get the question rows
let questionsDisplayed = [];
let questionTemp = []
let questionTracked = []
let isSearch = false;
let itemPerPage = 25;
let currentPage = 1;

let startIndex = (currentPage - 1) * itemPerPage;
let endIndex = startIndex + itemPerPage;

const paginateQuestions = () => {
  let totalPages = Math.ceil(questionTracked.length / itemPerPage);
  let prevPage = Number(currentPage) > 1 ? Number(currentPage) - 1 : 1;
  let html = `<li class="page-item">
    <button class="page-link page-move" data-move="-1,0"  aria-label="Previous" onclick="movePage(-1,0)">
      <span aria-hidden="true">Đầu</span>
    </button>
  </li>
  <li class="page-item">
    <button class="page-link page-move" data-move="-1,1" onclick="movePage(-1,1)" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </button>
  </li>`;

  const MAX_VISIBLE_PAGES = 4;
  const GROUP_SIZE = 4;
  const groupIndex = Math.floor((currentPage - 1) / GROUP_SIZE);
  const startPage = groupIndex * GROUP_SIZE + 1;
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);
  const hasLeftEllipsis = startPage > GROUP_SIZE;
  const hasRightEllipsis = endPage < totalPages;

  if (hasLeftEllipsis) {
    html += `<li class="page-item">
      <button class="page-link page-move" data-move="-1,3" onclick="movePage(-1,3)">&hellip;</button>
    </li>`;
  }

  for (let page = startPage; page <= endPage; page++) {
    html += `<li class="page-item ${page === currentPage ? 'active' : ''}">
      <button class="page-link page-move" data-move="${page},2" onclick="movePage(${page},2)">${page}</button>
    </li>`;
  }

  if (hasRightEllipsis) {
    html += `<li class="page-item">
      <button class="page-link page-move" data-move="1,3" onclick="movePage(1,3)">&hellip;</button>
    </li>`;
  }

  const nextPage = currentPage < totalPages ? Number(currentPage) + 1 : totalPages;

  html += `<li class="page-item">
    <button class="page-link page-move" data-move="1,1" onclick="movePage(1,1)" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </button>
  </li>
  <li class="page-item">
              <button class="page-link page-move"  onclick="movePage(1,0)" data-move="1,0" aria-label="Previous">
                <span aria-hidden="true">Cuối</span>
              </button>
            </li>`;

  let pagination = document.querySelector(".pagination");
  pagination.innerHTML = html;
};

const movePage = (num,action)=>{
  if (Number(action) == 0) {
    if (Number(num) == -1) {
      currentPage = 1;
    } else {
      currentPage = Math.ceil(questionTracked.length / itemPerPage);
    }
  } else if (Number(action) == 1) {
    if((currentPage == 1 && Number(num)==-1)||(currentPage == Math.ceil(questionTracked.length / itemPerPage) && Number(num)==1)){
      return;
    }else{
      currentPage += Number(num);
    }
    
  } else if (Number(action) == 2) {
    currentPage = Number(num);
  } else {
    let totalPages = Math.ceil(questionTracked.length / itemPerPage);
    const MAX_VISIBLE_PAGES = 4;
    const GROUP_SIZE = 4;
    const groupIndex = Math.floor((currentPage - 1) / GROUP_SIZE);
    const startPage = groupIndex * GROUP_SIZE + 1;
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    let prevPage = Number(currentPage) > 1 ? Number(currentPage) - 1 : 1;
    if (Number(num) == 1) {
      currentPage = endPage + 1;
    } else {
      currentPage = startPage - 1;
    }
  }
  startIndex = (currentPage - 1) * itemPerPage;
  endIndex = startIndex + itemPerPage;
  filterQuestions();
}



function filterQuestions() {
  
  questionsDisplayed = [];
  if(!isSearch){
    questionTemp = []
    const noFilterChecked =
    !filterQuestion1.checked &&
    !filterQuestion2.checked &&
    !filterQuestion3.checked &&
    !filterQuestion4.checked;

  // Iterate over the question rows
  for (let i = 0; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    const question = JSON.parse(questionRow.dataset.question);
    const index = questionRow.dataset.index
    const questionStatus = questionRow.querySelector(".question-status")
    if(question.status.replace("\n","").trim() == "Đang soạn thảo"){
      questionStatus.style.color = "black"
    }else if(question.status.replace("\n","").trim() == "Gửi duyệt"){
      questionStatus.style.color = "#31ADFF"
    }else if(question.status.replace("\n","").trim() == "Áp dụng"){
      questionStatus.style.color = "#008000"
    }else if(question.status.replace("\n","").trim() == "Trả về"){
      questionStatus.style.color = "#B7B92F"
    }else{
      questionStatus.style.color = "#FB311C"
    }
    // Check the status of the question and show/hide the row accordingly
    if (
      noFilterChecked ||
      (filterQuestion1.checked &&
        (question.status === "Đang soạn thảo" ||
          question.status === "Trả về")) ||
      (filterQuestion2.checked && question.status === "Gửi duyệt") ||
      (filterQuestion3.checked && question.status === "Áp dụng") ||
      (filterQuestion4.checked && question.status === "Ngưng áp dụng")
    ) {
      questionTemp.push(index)
    }
  }
  startIndex = (currentPage - 1) * itemPerPage;
  endIndex = startIndex + itemPerPage;
  
questionTracked = questionTemp;
  paginateQuestions();
  
 questionsDisplayed = questionTracked.slice(startIndex,endIndex)

  // Iterate over the question rows again to set the display property
  for (let i = 0; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    const question = JSON.parse(questionRow.dataset.question);
    const index = questionRow.dataset.index
    if (questionsDisplayed.includes(index)) {
      questionRow.style.display = "table-row";
    } else {
      questionRow.style.display = "none";
    }
  }
  }else{
    

  // Iterate over the question rows
  for (let i = 0; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    const question = JSON.parse(questionRow.dataset.question);
    const index = questionRow.dataset.index
    const questionStatus = questionRow.querySelector(".question-status")
    if(question.status.replace("\n","").trim() == "Đang soạn thảo"){
      questionStatus.style.color = "black"
    }else if(question.status.replace("\n","").trim() == "Gửi duyệt"){
      questionStatus.style.color = "#31ADFF"
    }else if(question.status.replace("\n","").trim() == "Áp dụng"){
      questionStatus.style.color = "#008000"
    }else if(question.status.replace("\n","").trim() == "Trả về"){
      questionStatus.style.color = "#B7B92F"
    }else{
      questionStatus.style.color = "#FB311C"
    }
    // Check the status of the question and show/hide the row accordingly
    
  }
  startIndex = (currentPage - 1) * itemPerPage;
  endIndex = startIndex + itemPerPage;
  paginateQuestions();
  questionsDisplayed = questionTracked.slice(startIndex,endIndex)

  // Iterate over the question rows again to set the display property
  for (let i = 0; i < questionRows.length; i++) {
    const questionRow = questionRows[i];
    const question = JSON.parse(questionRow.dataset.question);
    const index = questionRow.dataset.index
    if (questionsDisplayed.includes(index)) {
      questionRow.style.display = "table-row";
    } else {
      questionRow.style.display = "none";
    }
  }
  }
  
  renderMenuAction()
}

const navItems = document.querySelectorAll(".question-filter-left .nav-item");
navItems.forEach((navItem) => {
  const checkbox = navItem.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", filterQuestions());
  navItem.addEventListener("click", (event) => {
    const target = event.target;
    
    if (target === checkbox) {
      return; 
    }

    toggleActiveClass(event);
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});

function toggleActiveClass(event) {
  const clickedNavItem = event.currentTarget;
  const checkbox = clickedNavItem.querySelector("input[type='checkbox']");
  const navItem = clickedNavItem.closest(".nav-item");

  if (checkbox.checked) {
    navItem.classList.add("active");
  } else {
    navItem.classList.remove("active");
  }
}

const updateStatusQuestion = (questionId, action) => {
  if(action!==-1){
    const formData = new FormData();
    formData.append("status", action);
  
    fetch("/update/question/" + questionId, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Question updated successfully") {
          const updatedQuestions = data.questionDTOs;
            updatedQuestions.forEach((question) => {
              trCheck.forEach(e=>{
               if(e.dataset.questionId == question.id){
                const tagStatus = e.querySelector("td.question-status")
                tagStatus.innerHTML = question.status;
                e.dataset.question = JSON.stringify(question);
               }
              })
            }); filterQuestions();
            closePopup();
            showToast(data.message, true,()=>{
              
            });
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while updating the product");
      });
  }else{
  showModalDelete(questionId);
  }
 
};

//popup-action request
const updateStatusQuestions = (action)=>{
  let ids = [];
  if(action!==-1){
    if(action == 1){
    
      actions0.forEach((id)=>{
        ids.push(id);
      })
      actions4.forEach((id)=>{
        ids.push(id);
      })
    }else if (action == 2){
      actions1.forEach((id)=>{
        ids.push(id);
      })
      actions3.forEach((id)=>{
        ids.push(id);
      })
    }else if(action == 3){
      actions2.forEach((id)=>{
        ids.push(id);
      })
    }else if(action == 4){
      actions1.forEach((id)=>{
        ids.push(id);
      })
      actions3.forEach((id)=>{
        ids.push(id);
      })
    }
    if(ids.length > 0){
      const formData = new FormData();
    formData.append("status", action);
    formData.append("ids", ids);
  
    fetch("/update/questions/", {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Questions updated successfully") {
          const updatedQuestions = data.questionDTOs;
            updatedQuestions.forEach((question) => {
              
              trCheck.forEach(e=>{
               if(e.dataset.questionId == question.id){
                const tagStatus = e.querySelector("td.question-status")
                tagStatus.innerHTML = question.status;
                e.dataset.question = JSON.stringify(question);
               }
              })
            }); filterQuestions();
            closePopupCustom();
            showToast(data.message, true,()=>{
              
            });
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while updating the product");
      });
    }
  }else{
    actions0.forEach((id)=>{
      ids.push(id);
    })
    if(ids.length > 0){
      showModalDelete(ids)
    }
  }
}
//search
const searchInput = document.getElementById("search-question")
searchInput.addEventListener("input",()=>{
 
  setTimeout(()=>{
    let querryQuestion = String(searchInput.value).trim().toLowerCase();
    
    if(querryQuestion ==""){
      isSearch = false;
      filterQuestions();
      return;
    }
    isSearch = true;
    questionsDisplayed = []
    questionTracked = []
    for (let i = 0; i < questionRows.length; i++) {
      const questionRow = questionRows[i];
      const question = JSON.parse(questionRow.dataset.question);
      const index = questionRow.dataset.index
      const questionContent = String(question.content).toLowerCase().trim();
      const questionId = String(question.id).toLowerCase().trim();
      const questionStatus = questionRow.querySelector(".question-status")
      if(question.status.replace("\n","").trim() == "Đang soạn thảo"){
        questionStatus.style.color = "black"
      }else if(question.status.replace("\n","").trim() == "Gửi duyệt"){
        questionStatus.style.color = "#31ADFF"
      }else if(question.status.replace("\n","").trim() == "Áp dụng"){
        questionStatus.style.color = "#008000"
      }else if(question.status.replace("\n","").trim() == "Trả về"){
        questionStatus.style.color = "#B7B92F"
      }else{
        questionStatus.style.color = "#FB311C"
      }
      // Check the status of the question and show/hide the row accordingly
      if ((questionContent.includes(querryQuestion)||questionId.includes(querryQuestion))&&(questionTemp.findIndex(i=>i==index)!==-1)) {
        questionTracked.push(index);
      }
    }
    currentPage = 1;
    startIndex = (currentPage - 1) * itemPerPage;
    endIndex = startIndex + itemPerPage;   
    paginateQuestions();
    
   questionsDisplayed = questionTracked.slice(startIndex,endIndex)
  
    // Iterate over the question rows again to set the display property
    for (let i = 0; i < questionRows.length; i++) {
      const questionRow = questionRows[i];
      const question = JSON.parse(questionRow.dataset.question);
      const index = questionRow.dataset.index
      if (questionsDisplayed.includes(index)) {
        questionRow.style.display = "table-row";
      } else {
        questionRow.style.display = "none";
      }
    }
    renderMenuAction()
  },1250)
})
const btnSearch = document.getElementById("btn-search")
btnSearch.addEventListener("click",()=>{
  searchInput.dispatchEvent(new Event("input"));
})
const resetAll = document.getElementById("reset-all")
resetAll.addEventListener("click",()=>{
  filterQuestion1.checked = true;
  filterQuestion1.dispatchEvent(new Event("change"));
  filterQuestion2.checked = false;
  filterQuestion2.dispatchEvent(new Event("change"));
  filterQuestion3.checked = false;
  filterQuestion3.dispatchEvent(new Event("change"));
  filterQuestion4.checked = false;
  filterQuestion4.dispatchEvent(new Event("change"));
  searchInput.value == ""
  searchInput.dispatchEvent(new Event("input"));
  filterQuestions();
})

/*delete*/
const showModalDelete = (ids)=>{
  const modal = document.querySelector(".modal-delete")
  modal.style.display = "block"
  const idsTag = modal.querySelector(".ids-delete")
  const idsShow = idsTag.querySelector("span")
  idsShow.style.color = "#36C8CF"
  idsShow.title = ids
  idsShow.innerHTML = ids
  const btnConfirm = modal.querySelector(".comfirm-modal")
  btnConfirm.addEventListener("click",()=>{
    deleteQuestions(ids)
  })
}
const closeModalDelete = ()=>{
  
  const modal = document.querySelector(".modal-delete")
  modal.style.display = "none"
}
const deleteQuestions = (ids)=>{
  const formData = new FormData();
  formData.append("ids", ids);
  fetch("/delete/questions/", {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Questions deleted successfully") {
        const updatedQuestions = data.questionDTOs;
        let existedQuetion = []
          updatedQuestions.forEach((question) => {
            trCheck.forEach(e=>{
             if(e.dataset.questionId == question.id){
              existedQuetion.push(question.id)
             }
            })
          }
          )
          trCheck.forEach(e=>{
            let isExisted = false;
            existedQuetion.forEach(q=>{
              if(q == e.dataset.questionId){
                isExisted = true;
              }
            })
            if(!isExisted){
              e.remove()
            }
          })
          filterQuestions();
          closeModalDelete();
          closePopupCustom();
          showToast(data.message, true,()=>{
            
          });
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while updating the product");
    });
}
