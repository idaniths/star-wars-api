// const nav = document.querySelector("nav");
let ulChar = document.querySelector(".char__list");
let ulDetails = document.querySelector(".details__char");
const ulPlanets = document.querySelector(".details__planets");
let li = document.createElement("li");

let fetchedData;

function initState() {
  getCharacters("https://swapi.dev/api/people/?page=1");
}
initState();

//Function Details
function getDetails(fetchedCharacter) {
  ulDetails.innerHTML = `
      <h2> ${fetchedCharacter.name} </h2>
      <ul>
        <li>Height: ${fetchedCharacter.height}cm </li>
        <li>Mass:   ${(() => {
          if (fetchedCharacter.mass != "unknown") {
            return `${fetchedCharacter.mass}kg`;
          } else {
            return `${fetchedCharacter.mass}`;
          }
        })()} </li>  
        <li>Hair color: ${fetchedCharacter.hair_color} </li>
        <li>Skin color: ${fetchedCharacter.skin_color}  </li>
        <li>Eye color: ${fetchedCharacter.eye_color} </li>
        <li> Birth year: ${fetchedCharacter.birth_year} </li>
        <li>Gender: ${fetchedCharacter.gender} </li>
      </ul>
    `;
  console.log(fetchedCharacter);
}
//Function Planets
function getPlanets(homeworlds) {
  console.log(homeworlds);
  ulPlanets.innerHTML = `
      <h2> ${homeworlds.name} </h2>
      <ul>
        <li>Rotation period: ${homeworlds.rotation_period} </li>
        <li>Orbital period: ${homeworlds.orbital_period} </li>
        <li>Diameter: ${homeworlds.diameter} </li>
        <li>Climate: ${homeworlds.climate}  </li>
        <li>Gravity: ${homeworlds.gravity} </li>
        <li> Terrain: ${homeworlds.terrain} </li>
      </ul>
    `;
  // console.log(fetchedCharacter);
}

///Lägg till iteration för att skapa

function getCharacterHomeWorld(character) {
  fetch(character.homeworld)
    .then((response) => {
      return response.json();
    })
    .then((homeworlds) => {
      getPlanets(homeworlds);
    });
}

function getCharacters(characters) {
  let li;
  const request = fetch(characters);
  request
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      for (let i = 0; i <= data.results.length - 5; i++) {
        let name = data.results[i].name;
        li = document.createElement("li");
        li.appendChild(document.createTextNode(name));

        li.addEventListener("click", () => {
          getDetails(data.results[i]);
          getCharacterHomeWorld(data.results[i]);
        });
        ulChar.appendChild(li);
      }
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
  let ulPlanets = document.querySelectorAll(
    ".details__planets li, .details__planets h2"
  );
  let ulChar = document.querySelectorAll(
    ".details__char li, .details__char h2"
  );
  for (let i = 0; i < ulPlanets.length; i++) {
    ulPlanets[i].remove();
  }
  for (let i = 0; i < ulChar.length; i++) {
    ulChar[i].remove();
  }
}

<<<<<<< HEAD
generalCounter = () => {
  let counter = 1;
  let counterOne = document.querySelector(".counterOne");
  let previous = document.getElementById("previous");
  let next = document.getElementById("next");

  previous.style.visibility = "hidden";

  next.addEventListener("click", () => {
    counter++;
    counterOne.innerText++;
    if (counter == 8) {
      next.style.visibility = "hidden";
    } else {
      previous.style.visibility = "visible";
    }
    removeDetails();
    removeChars();
    getCharacters(fetchedData.next);
  });

  previous.addEventListener("click", () => {
    counter--;
    counterOne.innerText--;
    if (counter == 1) {
      previous.style.visibility = "hidden";
    } else {
      next.style.visibility = "visible";
    }
    removeDetails();
    removeChars();
    getCharacters(fetchedData.previous);
  });
};
generalCounter();

// function clickNext() {
//   counterOne.innerText++;
//   removeChars();
//   getCharacters(fetchedData.next);
// }

// function clickPrevious() {
//   counterOne.innerText--;
//   removeChars();
//   getCharacters(fetchedData.previous);
// }

// next.addEventListener("click", () =>{
//   if(counterOne.innerText < 8){
//     clickNext()
//   }
// });

// previous.addEventListener("click", () =>{
//   if(counterOne.innerText > 1){
//     clickPrevious()
//   }
// });
=======
function clickNext() {
  counterOne.innerText++;
  removeChars();
  getCharacters(fetchedData.next);
}

function clickPrevious() {
  counterOne.innerText--;
  removeChars();
  getCharacters(fetchedData.previous);
}



next.addEventListener("click", () =>{ 
  if(counterOne.innerText < 8){
    clickNext()
  }
});

previous.addEventListener("click", () =>{ 
  if(counterOne.innerText > 1){
    clickPrevious()
  }
});
>>>>>>> ab1cbd7631e8fce7723bc03933543acdbf5090f3
