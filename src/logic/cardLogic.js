const Pokedex = require('pokeapi-js-wrapper');

const maxCards = 12;

const usedCards = [];

const Pdex = new Pokedex.Pokedex();

function grabRandomCards(cardCount) {
  let listOfPromises = [];

  for (let i = 0; i < cardCount; i++) {
    const id = getRandomID();
    const src = Pdex.getPokemonByName(id);
    listOfPromises.push(src);
    usedCards.push(id);
  }

  return Promise.all(listOfPromises);

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

export { grabRandomCards, maxCards, shuffle, loadImage };
