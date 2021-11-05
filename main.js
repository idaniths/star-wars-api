let ulChar = document.querySelector(".char__list");
let ulDetails = document.querySelector(".details__char");
let charArt = document.querySelector(".character_article");
const ulInfo = document.querySelector(".details__info");

let selectedCharacter = null;
// Buttons
const charSpecies = document.querySelector(".species");
const charHomeworld = document.querySelector(".homeworld");
const charVehicles = document.querySelector(".vehicles");
const charStarships = document.querySelector(".starships");
const currentVehicles = [];
const currentStarship = [];

function initState() {
  getCharacters("https://swapi.dev/api/people/?page=1");
  showOrHideCharacterActions();

  // Set up button listeners
  setUpButtonListeners();
}

function setUpButtonListeners() {
  charSpecies.addEventListener("click", () => {
    getCharacterSpecies();
  });
  charHomeworld.addEventListener("click", () => {
    getCharacterHomeworld();
  });
  charVehicles.addEventListener("click", () => {
    getCharacterVehicles();
  });
  charStarships.addEventListener("click", () => {
    getCharacterStarships();
  });
}

initState();

function getCharacters(characters) {
  showLoader(ulChar);
  fetch(characters)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      hideLoader(ulChar);
      for (let i = 0; i <= data.results.length; i++) {
        let name = data.results[i].name;
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(name));
        li.addEventListener("click", () => {
          selectedCharacter = data.results[i];
          removeDetails();
          showOrHideCharacterActions();
          setDetails(data.results[i]);
          showButtons();
        });
        ulChar.appendChild(li);
      }
    });
}

// SHOW OR HIDE ACTIONS

// INFOBUTTONS ------------------------------------
function showOrHideCharacterActions() {
  showOrHideAction(
    charSpecies,
    selectedCharacter && selectedCharacter.species.length !== 0
  );
  showOrHideAction(
    charVehicles,
    selectedCharacter && selectedCharacter.vehicles.length !== 0
  );
  showOrHideAction(
    charHomeworld,
    selectedCharacter && selectedCharacter.homeworld
  );
  showOrHideAction(
    charStarships,
    selectedCharacter && selectedCharacter.starships.length !== 0
  );
}

function showOrHideAction(element, show) {
  if (show) {
    element.style.display = "inline-block";
  } else {
    element.style.display = "none";
  }
}

function hideButtons() {
  const buttons = document.querySelectorAll("button");
  for (btn of buttons) {
    btn.style.visibility = "hidden";
  }
}

function showButtons() {
  const buttons = document.querySelectorAll("button");
  for (btn of buttons) {
    btn.style.visibility = "visible";
  }
}

// HIDE/REMOVE DETAILS ------------------------------------
function removeChars() {
  let charList = document.querySelectorAll(".char__list li");
  for (let i = 0; i < charList.length; i++) {
    charList[i].remove();
  }
}
function removeDetails() {
  let ulInfo = document.querySelectorAll(
    ".details__info li, .details__info h2"
  );
  let ulChar = document.querySelectorAll(
    ".details__char li, .details__char h2"
  );
  for (let i = 0; i < ulInfo.length; i++) {
    ulInfo[i].remove();
  }
  for (let i = 0; i < ulChar.length; i++) {
    ulChar[i].remove();
  }
}
// HIDE/SHOW LOADER ------------------------------------
function showLoader(section) {
  section.innerHTML = `<div class="loader"></div>`;
}
function hideLoader(section) {
  section.innerHTML = `<div class="loader hidden"></div>`;
}

//Function Details
function setDetails(selectedCharacter) {
  ulDetails.innerHTML = `
  <h2> ${selectedCharacter.name} </h2>
  <ul>
        <li>Height: ${selectedCharacter.height}cm </li>
        <li>Mass:   ${(() => {
          if (selectedCharacter.mass != "unknown") {
            return `${selectedCharacter.mass}kg`;
          } else {
            return `${selectedCharacter.mass}`;
          }
        })()} </li>
        <li>Hair color: ${selectedCharacter.hair_color} </li>
        <li>Skin color: ${selectedCharacter.skin_color}  </li>
        <li>Eye color: ${selectedCharacter.eye_color} </li>
        <li> Birth year: ${selectedCharacter.birth_year} </li>
        <li>Gender: ${selectedCharacter.gender} </li>
      </ul>
    `;
}

//Function Info
function setInfo(homeworlds) {
  ulInfo.innerHTML = `
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
}
// Function Species
function setSpecies(species) {
  ulInfo.innerHTML = `
      <h2> ${species.name} </h2>
      <ul>
        <li>Name: ${species.name} </li>
        <li>Classification: ${species.classification} </li>
        <li>Designation: ${species.designation} </li>
        <li>Average height: ${species.average_height}  </li>
        <li>Skin Colors: ${species.skin_colors} </li>
        <li>Hair Colors: ${species.hair_colors} </li>
        <li>Eye Colors: ${species.hair_colors} </li>
        <li>Avarage lifespan: ${species.avarage_lifespan} </li>
      </ul>
    `;
}
function setVehicles(vehicles) {
  ulInfo.innerHTML = `
      <h2> ${vehicles.name} </h2>
      <ul>
        <li>Name: ${vehicles.name} </li>
        <li>Model: ${vehicles.model} </li>
        <li>Manufacturer: ${vehicles.manufacturer} </li>
        <li>Cost in credits: ${vehicles.cost_in_credits}  </li>
        <li>Length: ${vehicles.length} </li>
        <li>Crew: ${vehicles.crew} </li>
        <li>Passangers: ${vehicles.passangers} </li>
        <li>Cargo capacity: ${vehicles.cargo_capacity} </li>
      </ul>
    `;
}
function setStarships(starships) {
  ulInfo.innerHTML = `
      <h2> ${starships.name} </h2>
      <ul>
        <li>Name: ${starships.name} </li>
        <li>Model: ${starships.model} </li>
        <li>Manufacturer: ${starships.manufacturer} </li>
        <li>Cost in credits: ${starships.cost_in_credits}  </li>
        <li>Length: ${starships.length} </li>
        <li>Crew: ${starships.crew} </li>
        <li>Passangers: ${starships.passangers} </li>
        <li>Cargo capacity: ${starships.cargo_capacity} </li>
      </ul>
    `;
}

///Lägg till iteration för att skapa

function getCharacterHomeworld() {
  showLoader(ulInfo);
  fetch(selectedCharacter.homeworld)
    .then((response) => {
      return response.json();
    })
    .then((homeworlds) => {
      setInfo(homeworlds);
    });
}

function getCharacterSpecies() {
  if (selectedCharacter.species.length === 0) {
    return;
  }
  showLoader(ulInfo);
  fetch(selectedCharacter.species)
    .then((response) => {
      return response.json();
    })
    .then((species) => {
      setSpecies(species);
    });
}

function getCharacterVehicles() {
  if (!selectedCharacter.vehicles || !selectedCharacter.vehicles[0]) {
    return;
  }

  ulInfo.innerHTML = ``;
  selectedCharacter.vehicles.forEach((vehicle) => {
    showLoader(ulInfo);
    fetch(vehicle)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        currentVehicles.push(res);
        setVehicles(currentVehicles[0]);
      });
  });
}

function getCharacterStarships() {
  if (!selectedCharacter.starships || !selectedCharacter.starships[0]) {
    return;
  }
  ulInfo.innerHTML = ``;
  selectedCharacter.starships.forEach((starship) => {
    showLoader(ulInfo);
    fetch(starship)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        currentStarship.push(res);
        setStarships(currentStarship[0]);
      });
  });
}

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
    hideButtons();
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
    hideButtons();
    removeDetails();
    removeChars();
    getCharacters(fetchedData.previous);
  });
};
generalCounter();
