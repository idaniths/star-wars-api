function main() {
  let ulChar = document.querySelector(".char__list");
  let ulDetails = document.querySelector(".details__char");
  const ulInfo = document.querySelector(".details__info");
  let selectedCharacter = null;

  /**
   * Setting upp Buttons
   */
  const charSpecies = document.querySelector(".species__btn");
  const charHomeworld = document.querySelector(".homeworld__btn");
  const charVehicles = document.querySelector(".vehicles__btn");
  const charStarships = document.querySelector(".starships__btn");

  /**
   * Buttons next vehicle & starship, counters and currentObjekt
   */
  const nextVehicle = document.getElementById("vehicle__info");
  const nextStarship = document.getElementById("starship__info");
  let currentVehicles = [];
  let currentStarship = [];
  let vehicleCounter = 0;
  let starshipCounter = 0;

  /**
   * Starting function fetching characters
   */
  function initState() {
    getCharacters("https://swapi.dev/api/people/?page=1");
    showOrHideCharacterActions();
    hideInfoButton();
    setUpButtonListeners();
  }

  initState();

  /**
   * Setting upp eventListeners
   * @param buttons - charSpecies, charHomeworld, charVehicles, charStarships, nextVehicles,
   */
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
      nextStarship.style.visibility = "hidden";
      vehicleCounter = 0;

      getCharacterVehicles();
    });
    charStarships.addEventListener("click", () => {
      nextVehicle.style.visibility = "hidden";

      getCharacterStarships();
    });
    nextVehicle.addEventListener("click", () => {
      document.getElementById("vehicle__btn").focus();

      /** If the length has reached the end, start from 0 */
      if (currentVehicles.length - 1 === vehicleCounter) {
        vehicleCounter = 0;
      } else {
        vehicleCounter++;
      }
      setVehicles(currentVehicles, vehicleCounter);
    });
    nextStarship.addEventListener("click", () => {
      document.getElementById("starship__btn").focus();
      /** If the length has reached the end, start from 0 */
      if (currentStarship.length - 1 === starshipCounter) {
        starshipCounter = 0;
      } else {
        starshipCounter++;
      }
      setStarships(currentStarship, starshipCounter);
    });
  }

  /**
   * Fetching Characters
   * @param selectedCharacter
   */
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

          /** Set up an click listener for all charachters in the list */
          li.addEventListener("click", () => {
            resetData(); /** Reset data before changing charachter */
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

  /**
   * Resets the data when changing characters.
   */
  function resetData() {
    starshipCounter = 0;
    vehicleCounter = 0;
  }

  /**
   * Show or hide on infoButtons
   */
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
    nextVehicle.style.visibility = "hidden";
    nextStarship.style.visibility = "hidden";
  }

  /**
   * HIDE/REMOVE DETAILS
   */
  function removeChars() {
    let charList = document.querySelectorAll(".char__list li");
    for (let i = 0; i < charList.length; i++) {
      charList[i].remove();
    }
  }

  /**
   * Removes the details of the character.
   */
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

  /**
   * @param section - the element where the loader will be placed.
   */
  function showLoader(section) {
    section.innerHTML = `<div class="loader"></div>`;
  }

  /**
   * @param section - the element where the loader will be hidden.
   */
  function hideLoader(section) {
    section.innerHTML = `<div class="loader hidden"></div>`;
  }

  /**
   * Sets the details of the charachter
   * @param selectedCharacter - the character to be selected
   */
  function setDetails(selectedCharacter) {
    let selectedCharacterWeight = selectedCharacter.mass;
    if (selectedCharacter.mass != "unknown") {
      selectedCharacterWeight = `${selectedCharacter.mass} kg`;
    }

    ulDetails.innerHTML = `
      <h2> ${selectedCharacter.name} </h2>
      <ul>
        <li>Height: ${selectedCharacter.height} cm </li>
        <li>Mass: ${selectedCharacterWeight}</li>
        <li>Hair color: ${selectedCharacter.hair_color} </li>
        <li>Skin color: ${selectedCharacter.skin_color}  </li>
        <li>Eye color: ${selectedCharacter.eye_color} </li>
        <li>Birth year: ${selectedCharacter.birth_year} </li>
        <li>Gender: ${selectedCharacter.gender} </li>
      </ul>
    `;
  }

  /**
   *
   * @param homeworlds -Prints Characters homeworld
   */
  function setHomeworlds(homeworlds) {
    ulInfo.innerHTML = `
      <h2> ${homeworlds.name} </h2>
      <ul>
        <li>Rotation period: ${homeworlds.rotation_period} </li>
        <li>Orbital period: ${homeworlds.orbital_period} </li>
        <li>Diameter: ${homeworlds.diameter} </li>
        <li>Climate: ${homeworlds.climate}  </li>
        <li>Gravity: ${homeworlds.gravity} </li>
        <li>Terrain: ${homeworlds.terrain} </li>
      </ul>
    `;
  }

  /**
   *
   * @param species -Prints Characters Specie
   */
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

  /**
   *
   * @param vehicle - Prints Characters Vehicles
   */
  function setVehicles(vehicle) {
    ulInfo.innerHTML = `
      <h2> ${vehicle[vehicleCounter].name} </h2>
      <ul>
        <li>Model: ${vehicle[vehicleCounter].model} </li>
        <li>Manufacturer: ${vehicle[vehicleCounter].manufacturer} </li>
        <li>Cost in credits: ${vehicle[vehicleCounter].cost_in_credits}  </li>
        <li>Length: ${vehicle[vehicleCounter].length} </li>
        <li>Crew: ${vehicle[vehicleCounter].crew} </li>
        <li>Passengers: ${vehicle[vehicleCounter].passengers} </li>
        <li>Cargo capacity: ${vehicle[vehicleCounter].cargo_capacity} </li>
        <li>Vehicle class: ${vehicle[vehicleCounter].vehicle_class} </li>
      </ul>
    `;
  }

  /**
   *
   * @param  starships -Prints Characters starships
   */
  function setStarships(starships) {
    ulInfo.innerHTML = `
      <h2> ${starships[starshipCounter].name} </h2>
      <ul>
        <li>Model: ${starships[starshipCounter].model} </li>
        <li>Manufacturer: ${starships[starshipCounter].manufacturer} </li>
        <li>Cost in credits: ${starships[starshipCounter].cost_in_credits}  </li>
        <li>Length: ${starships[starshipCounter].length} </li>
        <li>Crew: ${starships[starshipCounter].crew} </li>
        <li>Passengers: ${starships[starshipCounter].passengers} </li>
        <li>Cargo capacity: ${starships[starshipCounter].cargo_capacity} </li>
        <li>Starship class: ${starships[starshipCounter].starship_class} </li>
      </ul>
    `;
  }

  /**
   * @returns Fetched Characters  Homeworld
   */

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

  /**
   *
   * @returns Fetched Characters Specie
   */
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

  /**
   *
   * @returns Fetched Characters Vehicles
   */
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
            nextVehicle.style.visibility = "visible";
          }
        });
    });
  }

  /**
   *
   * @returns Fetched Characters Starships
   */
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
            nextStarship.style.visibility = "visible";
          }
        });
    });
  }

  /**
   * @param {next previous} -Counter for next page
   */
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
