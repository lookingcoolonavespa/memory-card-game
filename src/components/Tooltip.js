import React, { useRef, useEffect, useState } from 'react';

import './styles/TooltipStyles.css';

const Tooltip = ({ close }) => {
  const tooltipRef = useRef(null);

  const [pxToShift, setPxToShift] = useState('-26.7px');

  useEffect(function positionTooltip() {
    if (!tooltipRef.current) return;

    const width = tooltipRef.current.offsetWidth;
    const trianglePos = 15; // in %, the value of 'left' styling of tooltip:before aka the little triangle thing
    const btnRadius = 15; // in px,

    setPxToShift(`-${(width * trianglePos) / 100 - btnRadius}px`);
  }, []);

  useEffect(function closeTooltipEvent() {
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <div
      className="tooltip"
      ref={tooltipRef}
      style={{
        top: '43px',
        left: pxToShift,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      Don't click on the same card twice!
    </div>
  );
};

export default Tooltip;
