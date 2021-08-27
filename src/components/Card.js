import React from 'react';

import './styles/CardStyles.css';

const Card = (props) => {
  const { imgSrc, altText, name } = props;

  return (
    <div className="card" onClick={(e) => props.onClick(e.target.src)}>
      <img src={imgSrc} alt={altText}></img>
      <p>{name}</p>
    </div>
  );
};

export default Card;
