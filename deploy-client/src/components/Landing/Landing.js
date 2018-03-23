import React from 'react';
import './Landing.css';

export default function Banner() {
  return (
    <header className="landing" role="banner">
      <div className="banner">
        <h1 className="heading-text">Futzone</h1>
      </div>
      <div className="info">
      <p>Score, highlights, and much more on the latest matches.</p>
      </div>
    </header>
  );
}
