import React, { useState, useEffect, useRef } from "react";
import Note from "./Note";
import Background from "./Background";

const Game = () => {
  const [notes, setNotes] = useState([]);
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load the beatmap from public folder
    const loadBeatmap = async () => {
      const response = await fetch("/beatmap.json");
      const data = await response.json();
      setNotes(data.notes);
    };

    loadBeatmap();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
      const upcomingNotes = notes.filter(
        (note) => note.time <= currentTime + 1 && note.time >= currentTime
      );
      setVisibleNotes((prev) => [...prev, ...upcomingNotes]);
    }, 100);

    return () => clearInterval(interval);
  }, [notes]);

  const handleKeyPress = (key) => {
    const columnMap = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3 };
    const column = columnMap[key];
    const hitIndex = visibleNotes.findIndex(
      (note) => note.column === column && Math.abs(note.time - audioRef.current.currentTime) < 0.3
    );

    if (hitIndex !== -1) {
      const timingDifference = Math.abs(
        visibleNotes[hitIndex].time - audioRef.current.currentTime
      );

      if (timingDifference <= 0.1) {
        setScore((prev) => prev + 10);
        setCombo((prev) => prev + 1);
      } else {
        setScore((prev) => prev + 5);
      }

      setVisibleNotes((prev) => prev.filter((_, index) => index !== hitIndex));
    } else {
      setCombo(0);
    }
  };

  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [visibleNotes]);

  return (
    <div>
      <audio ref={audioRef} src="/jamiroquai.mp3" autoPlay />
      <Background />
      <div className="game-container">
        <div className="scoreboard">
          <p>Score: {score}</p>
          <p>Combo: {combo}</p>
        </div>
        <div className="note-columns">
          {[0, 1, 2, 3].map((col) => (
            <div key={col} className="note-column">
              {visibleNotes
                .filter((note) => note.column === col)
                .map((note, index) => (
                  <Note key={index} note={note} />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
