import React, { useEffect, useState } from 'react';

import Header from './components/Header.js';
import GameOverModal from './components/GameOverModal.js';
import Card from './components/Card.js';

import './globalStyles.css';

const Pokedex = require('pokeapi-js-wrapper');

/* 
start at level 1 
card count = 4

generate random ids
push ids into used cards list
pull cards
feed as props + render
need to add events to card


player clicks card 
game checks if card has been clicked before
if true, shows game over screen + reset cards clicked
otherwise, log score and swap cards around
continue to end of level
@ end of level reset cards clicked
level + 1, card count + 2 
restart loop

react components i need

score : shows label + number

card 


when level changes how do i activate the new level sequence?
- do it in the function
- do it in the render


*/

const usedCards = [];

const App = () => {
  const [level, setLevel] = useState(1);
  const [cardCount, setCardCount] = useState(4);

  // const [usedCards, setUsedCards] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const [highScore, setHighScore] = useState(0);

  const [currentScore, setCurrentScore] = useState(0);

  const [cardsClicked, setCardsClicked] = useState([]);

  const [isGameOver, setIsGameOver] = useState(false);

  let listOfCards = [];

  const maxCards = 12;

  useEffect(() => {
    if (isLoading)
      initiateLevel(cardCount)
        .then((pokemons) => {
          pokemons.forEach((pokemon) => {
            listOfCards.push(
              pokemon.sprites.other['official-artwork'].front_default
            );
          });
        })
        .then(() => {
          setIsLoading(false);
          setCards(listOfCards);
        });

    function initiateLevel(cardCount) {
      const cardPromises = grabRandomCards();

      return cardPromises;

      function grabRandomCards() {
        const Pdex = new Pokedex.Pokedex();

        let listOfPromises = [];

        for (let i = 0; i < cardCount; i++) {
          const id = getRandomID();
          const src = Pdex.getPokemonByName(id);
          listOfPromises.push(src);
          usedCards.push(id);
          console.log(usedCards);
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
    }
  });

  function handleCardClick(imgSrc) {
    if (cardsClicked.includes(imgSrc)) return setIsGameOver(true);

    setCardsClicked([...cardsClicked, imgSrc]);
    if (currentScore + 1 > highScore) setHighScore(currentScore + 1);
    setCurrentScore(currentScore + 1);
    setCards(shuffle(cards));

    if (cardsClicked.length + 1 === cardCount) {
      setLevel(level + 1);
      setCardsClicked([]);
      const num = cardCount + 2 <= maxCards ? cardCount + 2 : maxCards;
      setCardCount(num);
      setIsLoading(true);
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

  return (
    <React.Fragment>
      <Header highScore={highScore} currentScore={currentScore} />
      <main>
        {isGameOver && <GameOverModal score={currentScore} />}
        {isLoading && <GameOverModal score={currentScore} />}
        {!isLoading && (
          <div>
            <div>Level {level}</div>
            <div className="card-ctn">
              {cards.map((card) => (
                <Card imgSrc={card} onClick={handleCardClick} />
              ))}
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default App;
