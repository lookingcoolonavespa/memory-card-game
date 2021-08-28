import React from 'react';
import Scoreboard from './Scoreboard.js';

import './styles/GameOverStyles.css';

const GameOver = (props) => (
  <div className="game-over">
    <Scoreboard currentScore={props.currentScore} highScore={props.highScore} />
    <button type="button" onClick={props.startNewGame}>
      Try Again?
    </button>
  </div>
);

export default GameOver;
