import React, { useEffect, useState, useRef } from 'react';

import Header from './components/Header.js';
import GameOver from './components/GameOver.js';
import Card from './components/Card.js';
import Loading from './components/Loading.js';

import {
  getRdmPokemon,
  loadImage,
  maxCards,
  shuffle,
  capitalizeFirstLetter,
  emptyUsedCards,
  minCards,
} from './logic/cardLogic.js';

import './globalStyles.css';

const App = () => {
  const [level, setLevel] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [cardCount, setCardCount] = useState(minCards);
  const [cards, setCards] = useState([]);
  const [cardsClicked, setCardsClicked] = useState([]);

  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(function initLevel() {
    if (isLoading)
      getRdmPokemon(cardCount)
        .then(function pullInfo(pokemons) {
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

  const cardCtnRef = useRef();
  const gameCtnRef = useRef();
  useEffect(function sizeCtnBasedOnNumOfRows() {
    if (!cardCtnRef.current) return;
    resizeCtn();

    window.addEventListener('resize', resizeCtn);

    function resizeCtn() {
      let rows = window
        .getComputedStyle(cardCtnRef.current)
        .getPropertyValue('grid-template-rows')
        .split(' ');

      if (rows.includes('0px')) rows = rows.filter((val) => val !== '0px');

      console.log(rows);

      if (rows.length === 1)
        return (gameCtnRef.current.style.gridTemplateRows = '0.5fr 1fr');
      if (rows.length === 2)
        return (gameCtnRef.current.style.gridTemplateRows = '0.35fr 1fr');
      if (rows.length === 3)
        return (gameCtnRef.current.style.gridTemplateRows = '0.2fr 1fr');
    }
  });

  /////////////////////
  /* Event Listeners */
  /////////////////////

  function handleCardClick(name) {
    if (cardsClicked.includes(name)) return setIsGameOver(true);

    setCardsClicked([...cardsClicked, name]);
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

  function startNewGame() {
    setLevel(1);
    setCardCount(minCards);
    setCardsClicked([]);
    setCurrentScore(0);
    emptyUsedCards();

    setIsGameOver(false);
    setIsLoading(true);
  }

  return (
    <React.Fragment>
      <Header
        highScore={highScore}
        currentScore={currentScore}
        isGameOver={isGameOver}
      />
      <main>
        {isGameOver && (
          <GameOver
            highScore={highScore}
            currentScore={currentScore}
            startNewGame={startNewGame}
          />
        )}
        {isLoading && <Loading />}
        {!isLoading && !isGameOver && (
          <div ref={gameCtnRef} className="game-ctn">
            <div className="level-text">Level {level}</div>
            <div ref={cardCtnRef} className="card-ctn">
              {cards.map((card) => (
                <Card
                  key={card.alt}
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
