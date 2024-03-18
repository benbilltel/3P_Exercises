const modules = document.querySelectorAll(".module");

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
