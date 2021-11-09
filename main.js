function main() {
  let ulChar = document.querySelector(".char__list");
  let ulDetails = document.querySelector(".details__char");
  const ulInfo = document.querySelector(".details__info");
  let selectedCharacter = null;
  // Buttons
  const charSpecies = document.querySelector(".species__btn");
  const charHomeworld = document.querySelector(".homeworld__btn");
  const charVehicles = document.querySelector(".vehicles__btn");
  const charStarships = document.querySelector(".starships__btn");
  //Buttons next "Vehicle" & "Starship"
  const vehicleInfo = document.getElementById("vehicle__info");
  const starshipInfo = document.getElementById("starship__info");
  let currentVehicles = [];
  let currentStarship = [];
  let vehicleCounter = 0;
  let starshipCounter = 0;

  function initState() {
    getCharacters("https://swapi.dev/api/people/?page=1");
    showOrHideCharacterActions();
    hideInfoButton();

    // Set up button listeners
    setUpButtonListeners();
  }
  //Start
  initState();

  function setUpButtonListeners() {
    charSpecies.addEventListener("click", () => {
      hideInfoButton();
      getCharacterSpecies();
    });
    charHomeworld.addEventListener("click", () => {
      hideInfoButton();
      getCharacterHomeworld();
    });
    charVehicles.addEventListener("click", () => {
      starshipInfo.style.visibility = "hidden";
      vehicleCounter = 0;
      getCharacterVehicles();
    });
    charStarships.addEventListener("click", () => {
      vehicleInfo.style.visibility = "hidden";
      getCharacterStarships();
    });
    vehicleInfo.addEventListener("click", () => {
      document.getElementById("vehicle__btn").focus();
      if (currentVehicles.length - 1 == vehicleCounter) {
        vehicleCounter = 0;
      } else {
        vehicleCounter++;
      }
      setVehicles(currentVehicles, vehicleCounter);
    });
    starshipInfo.addEventListener("click", () => {
      document.getElementById("starship__btn").focus();
      if (currentStarship.length - 1 == starshipCounter) {
        starshipCounter = 0;
      } else {
        starshipCounter++;
      }
      setStarships(currentStarship, starshipCounter);
    });
  }
  //<------Fetching Characters-------->
  function getCharacters(characters) {
    showLoader(ulChar);
    fetch(characters)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetchedData = data;
        hideLoader(ulChar);
        for (let i = 0; i < data.results.length; i++) {
          let names = data.results[i].name;
          const li = document.createElement("li");
          li.appendChild(document.createTextNode(names));
          li.addEventListener("click", () => {
            selectedCharacter = data.results[i];
            hideInfoButton();
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

  function hideInfoButton() {
    vehicleInfo.style.visibility = "hidden";
    starshipInfo.style.visibility = "hidden";
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

  // Function Info
  function setHomeworlds(homeworlds) {
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
  // Function Vehicles
  function setVehicles(vehicle) {
    ulInfo.innerHTML = `
    <h2> ${vehicle[vehicleCounter].name} </h2>
    <ul>
    <li>Model: ${vehicle[vehicleCounter].model} </li>
    <li>Manufacturer: ${vehicle[vehicleCounter].manufacturer} </li>
    <li>Cost in credits: ${vehicle[vehicleCounter].cost_in_credits}  </li>
    <li>Length: ${vehicle[vehicleCounter].length} </li>
    <li>Crew: ${vehicle[vehicleCounter].crew} </li>
    <li>Passangers: ${vehicle[vehicleCounter].passangers} </li>
    <li>Cargo capacity: ${vehicle[vehicleCounter].cargo_capacity} </li>
    <li>Vehicle class: ${vehicle[vehicleCounter].vehicle_class} </li>
    </ul>
    `;
  }
  // Function Starships
  function setStarships(starships) {
    ulInfo.innerHTML = `
      <h2> ${starships[starshipCounter].name} </h2>
      <ul>
      <li>Model: ${starships[starshipCounter].model} </li>
      <li>Manufacturer: ${starships[starshipCounter].manufacturer} </li>
      <li>Cost in credits: ${starships[starshipCounter].cost_in_credits}  </li>
      <li>Length: ${starships[starshipCounter].length} </li>
      <li>Crew: ${starships[starshipCounter].crew} </li>
      <li>Passangers: ${starships[starshipCounter].passengers} </li>
      <li>Cargo capacity: ${starships[starshipCounter].cargo_capacity} </li>
      <li>Starship class: ${starships[starshipCounter].starship_class} </li>
      </ul>
    `;
  }

  //<----- FETCHING INFORMATION FOR CHARACTERS ------->

  function getCharacterHomeworld() {
    showLoader(ulInfo);
    fetch(selectedCharacter.homeworld)
      .then((response) => {
        return response.json();
      })
      .then((homeworlds) => {
        setHomeworlds(homeworlds);
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
    currentVehicles = [];
    selectedCharacter.vehicles.forEach((vehicle) => {
      showLoader(ulInfo);
      fetch(vehicle)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          currentVehicles.push(res);
          setVehicles(currentVehicles);
          if (currentVehicles.length > 1) {
            vehicleInfo.style.visibility = "visible";
          }
        });
    });
  }

  function getCharacterStarships() {
    if (!selectedCharacter.starships) {
      return;
    }
    ulInfo.innerHTML = ``;
    currentStarship = [];
    selectedCharacter.starships.forEach((starship) => {
      showLoader(ulInfo);
      fetch(starship)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          currentStarship.push(res);
          setStarships(currentStarship);
          if (currentStarship.length > 1) {
            starshipInfo.style.visibility = "visible";
          }
        });
    });
  }

  //<-------COUNTER FOR CHARACTERS-------->
  generalCounter = () => {
    let counter = 1;
    let counterOne = document.querySelector(".counterOne");
    let previous = document.querySelector(".previous");
    let next = document.querySelector(".next");

    previous.style.visibility = "hidden";

    next.addEventListener("click", () => {
      counter++;
      counterOne.innerText++;
      if (counter == 8) {
        next.style.visibility = "hidden";
      } else {
        previous.style.visibility = "visible";
      }
      hideInfoButton();
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
      hideInfoButton();
      hideButtons();
      removeDetails();
      removeChars();
      getCharacters(fetchedData.previous);
    });
  };
  generalCounter();
}
main();
