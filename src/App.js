import React, { useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Game from "./components/Game";

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  return (
    <div>
      {selectedMonth === null ? (
        <IntroScreen onSelectMonth={handleMonthSelect} />
      ) : selectedMonth === "November" ? (
        <Game />
      ) : (
        <div>
          <h1>{selectedMonth} Game Coming Soon!</h1>
          <button onClick={() => setSelectedMonth(null)}>Back to Main Menu</button>
        </div>
      )}
    </div>
  );
}

export default App;
