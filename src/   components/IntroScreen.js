import React from "react";

const IntroScreen = ({ onSelectMonth }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="intro-screen">
      <h1 className="game-title">The 12 Months of 2025</h1>
      <p>Select a month to play its unique game:</p>
      <div className="months-grid">
        {months.map((month) => (
          <button
            key={month}
            className={`month-button ${month === "November" ? "playable" : "placeholder"}`}
            onClick={() => {
              if (month === "November") {
                onSelectMonth(month);
              } else {
                alert(`${month}'s game is coming soon!`);
              }
            }}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntroScreen;
