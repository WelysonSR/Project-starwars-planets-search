import React from 'react';
import StarWars from '../images/StarWars.gif';
import './Loading.css';

function Loading() {
  return (
    <div>
      <img src={ StarWars } alt="Star Wars" className="loading-img" />
      <h1 className="loading">Loading...</h1>
    </div>
  );
}

export default Loading;
