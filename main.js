const nav = document.querySelector("nav");
let counterOne = document.querySelector(".counterOne");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let charList = document.querySelector(".char__list");
const li = document.createElement("li");

let fetchedData;
///Lägg till iteration för att skapa
charList.append(li);

function initState() {
  getPlanets("https://swapi.dev/api/people/?page=1");
}
initState();

function getPlanets(planets) {
  const request = fetch(planets);
  request
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      li.append(data.results[0].name);
    });
}

function clickNext() {
  if (counterOne.innerText < 8) {
    counterOne.innerText++;
  }
  getPlanets(fetchedData.next);
}

function clickPrevious() {
  if (counterOne.innerText > 1) {
    counterOne.innerText--;
  }
  getPlanets(fetchedData.previous);
}

// function removePrevious() {
//   let li = document.querySelector("li");
//   li.clear();
// }

// "count": 82,
// "next": "https://swapi.dev/api/people/?page=2",
// "previous": null,
// "results": [
//     {
//         "name": "Luke Skywalker",
//         "height": "172",
//         "mass": "77",

next.addEventListener("click", clickNext);
previous.addEventListener("click", clickPrevious);
