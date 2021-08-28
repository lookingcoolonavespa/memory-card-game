import React, { useState } from 'react';

import Scoreboard from './Scoreboard.js';
import Tooltip from './Tooltip.js';

import './styles/HeaderStyles.css';

const Header = ({ currentScore, highScore, isGameOver }) => {
  const [isHelp, setIsHelp] = useState(false);

  if (isGameOver) return <div className="header"></div>;
  return (
    <div className="header">
      <div className="tooltip-ctn">
        <button
          type="button"
          className="tooltip-btn"
          onClick={() => setIsHelp((prev) => !prev)}
        >
          ?
        </button>
        {isHelp && <Tooltip close={() => setIsHelp(false)} />}
      </div>
      <Scoreboard currentScore={currentScore} highScore={highScore} />
    </div>
  );
};

export default Header;
