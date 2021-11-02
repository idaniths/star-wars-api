const nav = document.querySelector("nav");
let counterOne = document.querySelector(".counterOne");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let ulChar = document.querySelector(".char__list");
let ulDetails = document.querySelector(".details__char");
let li = document.createElement("li");
let fetchedData;
function initState() {
  getCharacters("https://swapi.dev/api/people/?page=1");
}
initState();
let lists;
function getDetails(fetchedData) {
  for (let i = 0; i <= fetchedData.results.length - 5; i++) {
    // if (fetchedData.results[i].name == li.innerText) {
    ulDetails.innerHTML = `
  <h2> ${fetchedData.results[i].name} </h2>
  <ul>
  <li>Height: ${fetchedData.results[i].height} </li>
  <li>Mass: ${fetchedData.results[i].mass} </li>  
  <li>Hair color: ${fetchedData.results[i].hair_color} </li>
  <li>Skin color: ${fetchedData.results[i].skin_color}  </li>
  <li>Eye color: ${fetchedData.results[i].eye_color} </li>
  <li> Birth year: ${fetchedData.results[i].birth_year} </li>
  <li>Gender: ${fetchedData.results[i].gender} </li>
  </ul>
  `;
    // ulChar.appendChild(li);
    // console.log(fetchedData.results[i]);
  }
  // }
}
// for(let of ulChar)
// ulChar.addEventListener("click", () => {
//   getDetails(fetchedData);
// });
// ulChar.addEventListener("click", () => {
//   getDetails(fetchedData);
// });

///Lägg till iteration för att skapa

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
      for (let i = 0; i <= data.results.length - 5; i++) {
        let name = data.results[i].name;
        li = document.createElement("li");
        li.appendChild(document.createTextNode(name));
        ulChar.appendChild(li);
      }
      getDetails(fetchedData);
      // ulChar.addEventListener("click", testing(fetchedData));
      // printPlanets;
    });
}

// Counter functions

function removeChars() {
  let charList = document.querySelectorAll(".char__list li");
  for (let i = 0; i < charList.length; i++) {
    charList[i].remove();
  }
}
function removeDetails() {
  let charList = document.querySelectorAll(".details__char li");
  for (let i = 0; i < charList.length; i++) {
    charList[i].remove();
  }
}

function clickNext() {
  if (counterOne.innerText < 8) {
    counterOne.innerText++;
  }
  if (counterOne.innerText == 8) {
    document.getElementById("next").disabled = true;
  }
  // removeDetails();
  removeChars();
  getCharacters(fetchedData.next);
}

function clickPrevious() {
  if (counterOne.innerText > 1) {
    counterOne.innerText--;
  }
  // removeDetails();
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
