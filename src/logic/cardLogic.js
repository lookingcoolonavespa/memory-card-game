const Pokedex = require('pokeapi-js-wrapper');

const minCards = 4;
const maxCards = 12;

let usedCards = [];

const Pdex = new Pokedex.Pokedex();

function getRdmPokemon(cardCount) {
  let listOfPromises = [];

  for (let i = 0; i < cardCount; i++) {
    const id = getRandomID();
    const pokemon = Pdex.getPokemonByName(id);
    listOfPromises.push(pokemon);
    usedCards.push(id);
  }

  return Promise.all(listOfPromises);

  // helper functions
  function getRandomID() {
    const min = 1;
    const max = 898;

    let id = Math.floor(Math.random() * (max - min)) + min;
    while (usedCards.includes(id)) {
      id = Math.floor(Math.random() * (max - min)) + min;
    }

    return id;
  }
}

function shuffle(arr) {
  let shuffled = [];
  for (let i = 0; i < arr.length; i++) {
    let rdmIndex = Math.floor(Math.random() * arr.length);
    while (shuffled.includes(arr[rdmIndex]))
      rdmIndex = Math.floor(Math.random() * arr.length);

    shuffled.push(arr[rdmIndex]);
  }
  return shuffled;
}

function loadImage(obj) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = obj.src;
    img.alt = obj.name;
  });
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function emptyUsedCards() {
  usedCards = [];

  console.log(usedCards);
}

export {
  getRdmPokemon,
  maxCards,
  minCards,
  emptyUsedCards,
  shuffle,
  loadImage,
  capitalizeFirstLetter,
};
