// Light theme - Dark Theme
function toggleDarkTheme() {
  document.body.classList.toggle("dark-theme");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  localStorage.setItem("dark-theme", isDarkTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  const darkTheme = localStorage.getItem("dark-theme") === "true";
  if (darkTheme) {
    document.body.classList.add("dark-theme");
  }

  // Attach event listener to the button
  document
    .getElementById("btn-dark")
    .addEventListener("click", toggleDarkTheme);
});
