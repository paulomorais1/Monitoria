// src/components/Main.js
import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/open-selection-process">Open Selection Process</Link>
      <Link to="/monitor-list">Monitor List</Link>
      <Link to="/class-ranking">Class Ranking</Link>
      <Link to="/restricted-area">Restricted Area</Link>
    </div>
  );
};

export default Main;
