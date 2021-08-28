import React from 'react';

import './styles/CardStyles.css';

const Card = (props) => {
  const { imgSrc, name } = props;

  return (
    <div
      className="card"
      onClick={(e) => {
        const card = e.target.closest('.card');
        props.onClick(card.dataset.pokemon);
      }}
      data-pokemon={name}
    >
      <img src={imgSrc} alt={name}></img>
      <p>{name}</p>
    </div>
  );
};

export default Card;
