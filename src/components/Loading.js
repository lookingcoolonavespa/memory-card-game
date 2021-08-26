import React from 'react';

import './styles/LoadingStyles.css';

const Loading = () => (
  <div className="loading">
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p>Loading...</p>
  </div>
);

export default Loading;
