const toggleNavBar = () => {
  const toggleButton = document.querySelector(".fa-bars");
  const navBar = document.querySelector("nav ul");

  if (!toggleButton || !navBar) return;

  toggleButton.addEventListener("click", () => {
    navBar.classList.toggle("show");
  });
};


document.addEventListener("DOMContentLoaded", () => {
  toggleNavBar();
});