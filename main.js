const nav = document.querySelector("nav");
const counterOne = document.querySelector(".counterOne");
const previousPage = document.getElementById("previous");
const nextPage = document.getElementById("next");

let counterNav = 1;

function countingSides() {
  counterNav++;
}
counterOne.addEventListener("click", countingSides);
