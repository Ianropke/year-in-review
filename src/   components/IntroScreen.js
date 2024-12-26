import React from "react";

const IntroScreen = ({ onStart }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "300px" }}>
      <h1>Welcome to the Jamiroquai Rhythm Game!</h1>
      <button onClick={onStart} style={{ fontSize: "20px", padding: "10px 20px" }}>
        Start Game
      </button>
    </div>
  );
};

export default IntroScreen;
