import React from 'react';
import ScoreField from './ScoreField.js';

const GameOverModal = (props) => (
  <div className="modal">
    <div className="popup">
      <ScoreField label="Your Score" num={props.score} />
      <button type="button" onClick={props.startNewGame}>
        New Game
      </button>
    </div>
  </div>
);

export default GameOverModal;
