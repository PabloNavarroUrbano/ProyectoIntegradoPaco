let div = document.getElementsByClassName("grid-container")[0];
let button = document.getElementsByTagName("button")[0];
let page = 1;
let showPage = document.getElementsByTagName("span")[0];
let divButton = document.getElementById("render-more");
let h1 = document.getElementsByTagName('h1')[0];

function deleteDivButton() {
  while (divButton.firstChild) divButton.removeChild(divButton.firstChild);
}

function deleteDiv() {
  while (div.firstChild)
    div.removeChild(div.firstChild);
}

function showModal(image, character) {
  let modalContent = document.getElementsByClassName("modal-content")[0];
  modalContent.style.backgroundImage = `url(${image})`;
  modalContent.style.backgroundSize = "cover";

  let name = document.getElementsByTagName("h1")[1];
  name.innerHTML = character;

  let modal = document.querySelector(".modal");
  modal.classList.add("show-modal");

  let close = document.getElementsByClassName("close-button")[0];
  close.addEventListener("click", () =>
    modal.classList.remove("show-modal")
  );
}

function exit(){
  page = 1;
  getFirstCharacters();
}

function favorites(){
  deleteDivButton();
  deleteDiv();
  let back = document.createElement("button");
  back.innerHTML = "VOLVER";
  back.addEventListener("click", () => exit());
  divButton.appendChild(back);
  Object.keys(localStorage).forEach((id) => {
    let data = JSON.parse(localStorage.getItem(id));
    createFavorites(data.image, data.gender, data.species, data.name, data.status);
  });
  document.getElementById('number-page').innerHTML = 'Favoritos';
}

function createFavorites(image, gender, species, name, status) {

  let card = document.createElement("div");
  card.className = "card";
  div.appendChild(card);

  let thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";
  card.appendChild(thumbnail);

  let item0 = document.createElement("div");
  item0.className = "item-0";
  item0.style.background = `url(${image}`;
  item0.style.backgroundSize = "cover";
  thumbnail.appendChild(item0);

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  card.appendChild(cardFooter);

  let item1 = document.createElement("h3");
  item1.className = "item-1";
  item1.innerHTML = gender;
  cardFooter.appendChild(item1);

  let item2 = document.createElement("h3");
  item2.className = "item-2";
  item2.innerHTML = species;
  cardFooter.appendChild(item2);

  let item3 = document.createElement("h3");
  item3.className = "item-3";
  item3.innerHTML = name;
  cardFooter.appendChild(item3);

  let item4 = document.createElement("h3");
  item4.className = "item-4";
  item4.innerHTML = status;
  cardFooter.appendChild(item4);

  let buttons = document.createElement("div");
  buttons.className = "botonera";
  card.appendChild(buttons);

  let trigger = document.createElement("div");
  trigger.id = "trigger";
  trigger.innerHTML = "AMPLIAR";
  buttons.appendChild(trigger);

  buttons.addEventListener("click", () =>
    showModal(image, name)
  );
}

h1.addEventListener('click', () => favorites())

function save(image, gender, species, name, status, index){
  const storage = {
    image : image,
    gender : gender,
    species : species,
    name : name,
    status : status
  }

  window.localStorage.setItem(index, JSON.stringify(storage));
}

function create(array, index) {

  let id = array[index].id;

  let card = document.createElement("div");
  card.className = "card";
  div.appendChild(card);

  let thumbnail = document.createElement("div");
  thumbnail.className = "thumbnail";
  card.appendChild(thumbnail);

  let item0 = document.createElement("div");
  item0.className = "item-0";
  item0.style.background = `url(${array[index].image}`;
  item0.style.backgroundSize = "cover";
  thumbnail.appendChild(item0);

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  card.appendChild(cardFooter);

  let item1 = document.createElement("h3");
  item1.className = "item-1";
  item1.innerHTML = array[index].gender;
  cardFooter.appendChild(item1);

  let item2 = document.createElement("h3");
  item2.className = "item-2";
  item2.innerHTML = array[index].species;
  cardFooter.appendChild(item2);

  let item3 = document.createElement("h3");
  item3.className = "item-3";
  item3.innerHTML = array[index].name;
  cardFooter.appendChild(item3);
  item3.addEventListener('click', () => save(array[index].image, array[index].gender, array[index].species, array[index].name, array[index].status, id));

  let item4 = document.createElement("h3");
  item4.className = "item-4";
  item4.innerHTML = array[index].status;
  cardFooter.appendChild(item4);

  let buttons = document.createElement("div");
  buttons.className = "botonera";
  card.appendChild(buttons);

  let trigger = document.createElement("div");
  trigger.id = "trigger";
  trigger.innerHTML = "AMPLIAR";
  buttons.appendChild(trigger);

  buttons.addEventListener("click", () =>
    showModal(array[index].image, array[index].name)
  );
}

function before() {
  page--;
  getFirstCharacters();
}

function after() {
  page++;
  getFirstCharacters();
}

function more() {
  getCharacters();
}

const getFirstCharacters = async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  let name = data.results.slice(0, 3);
  showPage.innerHTML = page;
  deleteDiv();
  deleteDivButton();
  let moreInfo = document.createElement("button");
  moreInfo.innerHTML = "MOSTRAR MAS";
  moreInfo.addEventListener("click", () => more());
  divButton.appendChild(moreInfo);
  name.slice(0, 3);
  name.map((value, index) => {
    create(name, index);
  });
};

const getCharacters = async () => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  let name = data.results;
  deleteDiv();
  deleteDivButton();
  if (page != 1 && page != 42) {
    let bef = document.createElement("button");
    bef.innerHTML = "ANTERIOR";
    bef.addEventListener("click", () => before());
    divButton.appendChild(bef);

    let aft = document.createElement("button");
    aft.innerHTML = "SIGUIENTE";
    aft.addEventListener("click", () => after());
    divButton.appendChild(aft);
  } else if (page == 1) {
    let aft = document.createElement("button");
    aft.innerHTML = "SIGUIENTE";
    aft.addEventListener("click", () => after());
    divButton.appendChild(aft);
  } else {
    let bef = document.createElement("button");
    bef.innerHTML = "ANTERIOR";
    bef.addEventListener("click", () => before());
    divButton.appendChild(bef);
  }
  name.map((value, index) => {
    create(name, index);
  });
};

window.onload = (event) => {
  getFirstCharacters();
};
