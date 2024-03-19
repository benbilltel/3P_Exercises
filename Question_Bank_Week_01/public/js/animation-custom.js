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
    item.addEventListener('click', (e) => {
      navItems.forEach((navItem) => {
        navItem.classList.remove('active');
      });
      e.target.classList.add('active');
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
setActiveNavItem('.sidebar .nav-link');
setActiveNavItem('.dropdown-cs-item');