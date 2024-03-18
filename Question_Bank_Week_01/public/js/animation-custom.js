//dropdown sidebar
function setupModuleDropdowns(parentClass) {
  const modules = document.querySelectorAll(parentClass);

  modules.forEach((module) => {
    module.addEventListener("click", () => {
      const dropdown = module.nextElementSibling;
      modules.forEach((item) => {
        item.classList.remove("active");
        const dropdownClosed = item.nextElementSibling;
        if (dropdownClosed) {
          dropdownClosed.style.display = "none";
        }
      });

      module.classList.add("active");
      if (dropdown) {
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      }
    });
  });
}

setupModuleDropdowns(".module");
//header nav active
const navLinks = document.querySelectorAll(".header--module .nav-item");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".border-active")?.classList.remove("border-active");
    });

    link.classList.add("active");
    link.querySelector(".border-module")?.classList.add("border-active");
  });
});