import React from 'react';

import ScoreField from './ScoreField.js';

const Scoreboard = (props) => {
  return (
    <div className="scoreboard">
      <ScoreField label="Your Score" num={props.currentScore} />
      <ScoreField label="High Score" num={props.highScore} />
    </div>
  );
};

export default Scoreboard;
