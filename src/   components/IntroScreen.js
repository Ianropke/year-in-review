import React from "react";

const IntroScreen = ({ onSelectLevel }) => {
  return (
    <div className="intro-screen">
      <h1 className="game-title">Funky Rhythm</h1>
      <p>Select a Level:</p>
      <div className="level-buttons">
        <button onClick={() => onSelectLevel("November")} className="level-button">
          November
        </button>
        {/* Add more levels here */}
        <button disabled className="level-button">Coming Soon...</button>
      </div>
    </div>
  );
};

export default IntroScreen;

