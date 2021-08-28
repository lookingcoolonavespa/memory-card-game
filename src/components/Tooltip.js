import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles/TooltipStyles.css';

const Tooltip = ({ btnCenter, close }) => {
  console.log(btnCenter);
  const [btnPos, setBtnPos] = useState();

  const tooltipRef = useRef(null);

  const pxToShift = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(
    function positionTooltip() {
      console.log(btnCenter, 'hi');
      if (!tooltipRef.current) return;

      const width = tooltipRef.current.offsetWidth;
      const trianglePos = 15; // in %, the value of 'left' styling of tooltip:before aka the little triangle thing

      pxToShift.current = `${btnCenter - (width * trianglePos) / 100}px`;
      setBtnPos(btnCenter);
    },
    [pxToShift, btnCenter]
  );

  return ReactDOM.createPortal(
    <div className="background" onClick={close}>
      <div
        className="tooltip"
        ref={tooltipRef}
        style={{
          top: '73px',
          left: pxToShift.current,
        }}
      >
        How to play:
        <br />
        Don't click on the same card twice!
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Tooltip;
