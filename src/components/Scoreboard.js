import React from 'react';

import ScoreField from './ScoreField.js';

const Scoreboard = (props) => (
  <div className="scoreboard">
    <ScoreField label="Score" score={props.currentScore} />
    <ScoreField label="Best" score={props.highScore} />
  </div>
);

export default Scoreboard;
