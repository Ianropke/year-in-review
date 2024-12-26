import React, { useState, useEffect } from "react";

const Note = ({ note }) => {
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setYPosition((prevY) => prevY + 5); // Adjust speed as needed
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="note"
      style={{
        transform: `translateY(${yPosition}px)`
      }}
    />
  );
};

export default Note;

