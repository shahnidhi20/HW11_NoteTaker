const getStartBtn = document.getElementById("getStarted-btn");



getStartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/notes";
});
