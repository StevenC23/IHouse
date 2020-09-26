document.addEventListener("DOMContentLoaded", function () {
  console.log("inicia");
  var state = document.querySelector(".circle");
  console.log(document.querySelector(".circle"));
  state.addEventListener("click", (event) => {
    state.classList.toggle(".circle-active");
    console.log(state);
  });
});
