import React from 'react';

import ScoreField from './ScoreField.js';

const Scoreboard = (props) => (
  <div className="scoreboard">
    <ScoreField label="Your Score" score={props.currentScore} />
    <ScoreField label="High Score" score={props.highScore} />
  </div>
);

export default Scoreboard;
