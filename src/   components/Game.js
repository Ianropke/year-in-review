import React, { useState, useEffect } from "react";
import Note from "./Note";
import Background from "./Background";

const Game = () => {
  const [notes, setNotes] = useState([]); // Notes from the beatmap
  const [visibleNotes, setVisibleNotes] = useState([]); // Notes currently on the screen
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameTime, setGameTime] = useState(0); // Tracks elapsed game time

  // Load the beatmap data when the component mounts
  useEffect(() => {
    const loadBeatmap = async () => {
      try {
        const response = await fetch("/beatmap.json");
        if (!response.ok) throw new Error("Failed to load beatmap.json");
        const data = await response.json();
        setNotes(data.notes); // Store the notes from the beatmap
      } catch (error) {
        console.error("Error loading beatmap:", error);
      }
    };

    loadBeatmap();
  }, []);

  // Increment game time at a steady interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime((prev) => prev + 0.1); // Increment time in seconds
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Spawn notes based on game time
  useEffect(() => {
    const upcomingNotes = notes.filter(
      (note) =>
        note.time <= gameTime + 1 && note.time > gameTime // Spawn notes just before they should appear
    );
    setVisibleNotes((prev) => [...prev, ...upcomingNotes]);
  }, [gameTime, notes]);

  // Handle key presses and scoring
  const handleKeyPress = (key) => {
    const columnMap = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3 };
    const column = columnMap[key];

    const hitIndex = visibleNotes.findIndex(
      (note) =>
        note.column === column &&
        Math.abs(note.time - gameTime) < 0.3 // Within hit window
    );

    if (hitIndex !== -1) {
      // Determine timing accuracy
      const timingDifference = Math.abs(visibleNotes[hitIndex].time - gameTime);

      if (timingDifference <= 0.1) {
        console.log("Perfect!");
        setScore((prev) => prev + 10);
        setCombo((prev) => prev + 1);
      } else {
        console.log("Good!");
        setScore((prev) => prev + 5);
      }

      setVisibleNotes((prev) => prev.filter((_, index) => index !== hitIndex)); // Remove hit note
    } else {
      console.log("Miss!");
      setCombo(0); // Reset combo on miss
    }
  };

  // Add event listener for keypresses
  useEffect(() => {
    const listener = (e) => handleKeyPress(e.key);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [visibleNotes, gameTime]);

  return (
    <div>
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
