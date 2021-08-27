import React from 'react';

import Scoreboard from './Scoreboard.js';

import './styles/HeaderStyles.css';

const Header = (props) => {
  return (
    <div className="header">
      <Scoreboard
        currentScore={props.currentScore}
        highScore={props.highScore}
      />
    </div>
  );
};

export default Header;
