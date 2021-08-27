import React, { useEffect, useState } from 'react';

import Header from './components/Header.js';
import GameOverModal from './components/GameOverModal.js';
import Card from './components/Card.js';
import Loading from './components/Loading.js';

import {
  grabRandomCards,
  loadImage,
  maxCards,
  shuffle,
  capitalizeFirstLetter,
} from './logic/cardLogic.js';

import './globalStyles.css';

const App = () => {
  const [level, setLevel] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [cardCount, setCardCount] = useState(4);
  const [cards, setCards] = useState([]);
  const [cardsClicked, setCardsClicked] = useState([]);

  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(function initLevel() {
    if (isLoading)
      grabRandomCards(cardCount)
        .then(function grabInfo(pokemons) {
          let listOfCards = [];

          pokemons.forEach((pokemon) => {
            listOfCards.push({
              name: capitalizeFirstLetter(pokemon.name),
              src: pokemon.sprites.other['official-artwork'].front_default,
            });
          });

          return Promise.all(listOfCards.map(loadImage));
        })
        .then((listOfCards) => {
          setIsLoading(false);
          setCards(listOfCards);
        });
  });

  function handleCardClick(imgSrc) {
    if (cardsClicked.includes(imgSrc)) return setIsGameOver(true);

    setCardsClicked([...cardsClicked, imgSrc]);
    if (currentScore + 1 > highScore) setHighScore(currentScore + 1);
    setCurrentScore(currentScore + 1);

    if (cardsClicked.length + 1 === cardCount) {
      // check if level is finished
      setLevel(level + 1);
      setCardsClicked([]);
      const num = cardCount + 2 <= maxCards ? cardCount + 2 : maxCards;
      setCardCount(num);
      setIsLoading(true);
      return;
    }

    setCards(shuffle(cards));
  }

  return (
    <React.Fragment>
      <Header highScore={highScore} currentScore={currentScore} />
      <main>
        {isGameOver && <GameOverModal score={currentScore} />}
        {isLoading && <Loading />}
        {!isLoading && !isGameOver && (
          <div className="game-ctn">
            <div className="level-text">Level {level}</div>
            <div className="card-ctn">
              {cards.map((card) => (
                <Card
                  imgSrc={card.src}
                  name={card.alt}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default App;
