import React, { useRef, useEffect, useState } from 'react';

import './styles/TooltipStyles.css';

const Tooltip = ({ close }) => {
  const tooltipRef = useRef(null);

  const pxToShift = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(function positionTooltip() {
    console.log('hi');
    window.addEventListener('click', close);
    if (!tooltipRef.current) return;

    const width = tooltipRef.current.offsetWidth;
    const trianglePos = 15; // in %, the value of 'left' styling of tooltip:before aka the little triangle thing
    const btnRadius = 15; // in px,

    pxToShift.current = `-${(width * trianglePos) / 100 - btnRadius}px`;

    setLoaded(true);

    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <div
      className="tooltip"
      ref={tooltipRef}
      style={{
        top: '43px',
        left: pxToShift.current,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      How to play:
      <br />
      Don't click on the same card twice!
    </div>
  );
};

export default Tooltip;
