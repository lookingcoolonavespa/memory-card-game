import React, { useRef, useState, useEffect } from 'react';

import Scoreboard from './Scoreboard.js';
import Tooltip from './Tooltip.js';

import './styles/HeaderStyles.css';

const Header = (props) => {
  const [isHelp, setIsHelp] = useState(false);

  const [loaded, setLoaded] = useState(false);
  window.onresize = () => setLoaded((prev) => !prev);

  const btnRef = useRef();

  const btnCenter = useRef();

  useEffect(function getBtnPos() {
    const btnPos = btnRef.current.getBoundingClientRect();

    btnCenter.current = findBtnCenter();

    function findBtnCenter() {
      const btnWidth = btnRef.current.offsetWidth;
      const center = btnPos.left + btnWidth / 2;
      return center;
    }
  });

  return (
    <div className="header">
      <button
        ref={btnRef}
        type="button"
        className="tooltip-btn"
        onClick={() => setIsHelp((prev) => !prev)}
      >
        ?
      </button>
      {isHelp && (
        <Tooltip btnCenter={btnCenter.current} close={() => setIsHelp(false)} />
      )}
      <Scoreboard
        currentScore={props.currentScore}
        highScore={props.highScore}
      />
    </div>
  );
};

export default Header;
