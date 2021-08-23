import React from 'react';

const ScoreField = (props) => (
  <div className="score-field">
    <p className="score-label">{props.label}</p>
    <p className="score-num">{props.score}</p>
  </div>
);

export default ScoreField;
