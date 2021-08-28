import React, { useRef, useState, useEffect } from 'react';

import Scoreboard from './Scoreboard.js';
import Tooltip from './Tooltip.js';

import './styles/HeaderStyles.css';

const Header = (props) => {
  const [isHelp, setIsHelp] = useState(false);

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
      <Scoreboard
        currentScore={props.currentScore}
        highScore={props.highScore}
      />
    </div>
  );
};

export default Header;
