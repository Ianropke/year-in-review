import React, { useEffect, useState } from "react";
import Note from "./Note";
import beatmap from "../../public/beatmap.json";

const Game = () => {
  const [notes, setNotes] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const audio = new Audio("../public/jamiroquai.mp3");
    audio.play();

    const interval = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);

    setNotes(beatmap);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {notes.map((note, index) =>
        time >= note.time - 500 && time <= note.time + 500 ? (
          <Note key={index} position={note.position} />
        ) : null
      )}
      <div className="hit-area"></div>
    </div>
  );
};

export default Game;
