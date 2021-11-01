const nav = document.querySelector("nav");
let counterOne = document.querySelector(".counterOne");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let ul = document.querySelector(".char__list");
// const li = document.createElement("li");

let fetchedData;


///Lägg till iteration för att skapa


function initState() {
  getCharacters("https://swapi.dev/api/people/?page=1");
}
initState();

function getCharacters(characters) {
  let li;
  const request = fetch(characters);
  request
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    fetchedData = data;
    // li.append(data.results[0].name);
    for (let i = 0; i <= data.results.length-5; i++){
      let name = data.results[i].name;
       li = document.createElement('li');
        li.appendChild(document.createTextNode(name));
        ul.appendChild(li);
    }
    });
}

// Counter functions

function removeChars(){
  let charList = document.querySelectorAll(".char__list li")
  for (let i = 0; i < charList.length; i++) {
    charList[i].remove();
  }
}


function clickNext() {
  if (counterOne.innerText < 8) {
    counterOne.innerText++;
  }
  removeChars();
  getCharacters(fetchedData.next);
}

function clickPrevious() {
  if (counterOne.innerText > 1) {
    counterOne.innerText--;
  }
  removeChars();
  getCharacters(fetchedData.previous);
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
