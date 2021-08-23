import React from 'react';

const Card = (props) => {
  const { imgSrc, altText, name } = props;

  return (
    <div className="card">
      <img src={imgSrc} alt={altText}></img>
      <p>{name}</p>
    </div>
  );
};

export default Card;
