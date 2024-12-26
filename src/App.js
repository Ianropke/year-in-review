import React, { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Game from "./components/Game";

function App() {
  const [level, setLevel] = useState(null);

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel); // Set the selected level (e.g., "November")
  };

  return (
    <div>
      {level === null ? (
        <IntroScreen onSelectLevel={handleLevelSelect} />
      ) : (
        <Game level={level} />
      )}
    </div>
  );
}

export default App;

