import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import './styles/CardStyles.css';

const Card = ({ imgSrc, name, onClick }) => {
  const [shuffle, shuffleAnimate] = useSpring(() => ({
    transform: 'rotateY(0)',
  }));

  useEffect(() =>
    shuffleAnimate.start({
      to: { transform: 'rotateY(0)' },
      from: { transform: 'rotateY(270deg)' },
    })
  );

  return (
    <animated.div
      style={shuffle}
      className="card"
      onClick={(e) => {
        const card = e.target.closest('.card');
        onClick(card.dataset.pokemon);
      }}
      data-pokemon={name}
    >
      <div className="card-front">
        <img src={imgSrc} alt={name}></img>
        <p>{name}</p>
      </div>
      <div className="card-back">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
          alt="pokemon logo"
        />
      </div>
    </animated.div>
  );
};

export default Card;
