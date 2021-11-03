let ulChar = document.querySelector(".char__list");
let ulDetails = document.querySelector(".details__char");
const ulPlanets = document.querySelector(".details__planets");
const buttons = document.querySelectorAll("button");
let selectedCharacter = null;
// Buttons
const charSpecies = document.querySelector(".species");
const charHomeworld = document.querySelector(".homeworld");
const charVehicles = document.querySelector(".vehicles");
const charStarships = document.querySelector(".starships");
const currentVehicles = [];

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
    getCharacterSpecies();
  });
}

initState();

function getCharacters(characters) {
  fetch(characters)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      for (let i = 0; i <= data.results.length - 5; i++) {
        let name = data.results[i].name;
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(name));
        li.addEventListener("click", () => {
          selectedCharacter = data.results[i];
          removeDetails();
          showOrHideCharacterActions();
          setDetails(data.results[i]);
        });
        ulChar.appendChild(li);
      }
    });
}

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

//Function Detailjer
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

//Function Planeter
function setPlanets(homeworlds) {
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
}
// Function Species
function setSpecies(species) {
  ulPlanets.innerHTML = `
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
  ulPlanets.innerHTML = `
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

function appendVehicles(vehicles) {
  let charVehicles = document.querySelector(".vehicles");
  charVehicles.addEventListener("click", () => {
    setVehicles(vehicles);
  });
}
///Lägg till iteration för att skapa

function getCharacterHomeworld() {
  fetch(selectedCharacter.homeworld)
    .then((response) => {
      return response.json();
    })
    .then((homeworlds) => {
      setPlanets(homeworlds);
    });
}

function getCharacterSpecies() {
  console.log("CALLED HERE with char", selectedCharacter);
  if (selectedCharacter.species.length === 0) {
    return;
  }

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
  ulPlanets.innerHTML = ``;

  selectedCharacter.vehicles.forEach((vehicle) => {
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

function getCharacterStarships(character) {
  if (!selectedCharacter.starships || !selectedCharacter.sharships[0]) {
    return;
  }
  ulPlanets.innerHTML = ``;

  fetch(character.starships)
    .then((response) => {
      return response.json();
    })
    .then((starships) => {
      // Create function setStarships(starships)
      // setStarships(starships);
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
