import React, { useEffect, useState } from "react";

const Note = ({ note }) => {
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setYPosition((prev) => prev + 5); // Adjust fall speed
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="note"
      style={{
        transform: `translateY(${yPosition}px)`,
      }}
    ></div>
  );
};

export default Note;
