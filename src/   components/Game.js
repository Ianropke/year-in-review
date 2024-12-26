import React, { useState, useEffect, useRef } from "react";
import Note from "./Note";
import Background from "./Background";

const Game = () => {
  const [notes, setNotes] = useState([]); // Holds the notes from beatmap.json
  const [visibleNotes, setVisibleNotes] = useState([]); // Notes currently on screen
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const audioRef = useRef(null); // Reference to the audio player

  // Fetch the beatmap data when the component mounts
  useEffect(() => {
    const loadBeatmap = async () => {
      try {
        const response = await fetch("/beatmap.json"); // Correct path for public folder
        if (!response.ok) throw new Error("Failed to load beatmap.json");
        const data = await response.json();
        setNotes(data.notes); // Load the notes into state
      } catch (error) {
        console.error("Error loading beatmap:", error);
      }
    };

    loadBeatmap();
  }, []);

  // Handle spawning of notes based on the beatmap
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const upcomingNotes = notes.filter(
          (note) =>
            note.time <= currentTime + 1 && note.time > currentTime // Spawn notes just before they are due
        );
        setVisibleNotes((prev) => [...prev, ...upcomingNotes]);
      }
    }, 100); // Check every 100ms for new notes to spawn

    return () => clearInterval(interval);
  }, [notes]);

  // Handle keypresses and check for hits
  const handleKeyPress = (key) => {
    const columnMap = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3 }; // Map keys to columns
    const column = columnMap[key];

    // Find the nearest note in the corresponding column
    const hitIndex = visibleNotes.findIndex(
      (note) =>
        note.column === column &&
        Math.abs(note.time - audioRef.current.currentTime) < 0.3 // Within hit window
    );

    if (hitIndex !== -1) {
      // Calculate timing accuracy
      const timingDifference = Math.abs(
        visibleNotes[hitIndex].time - audioRef.current.currentTime
      );

      if (timingDifference <= 0.1) {
        console.log("Perfect!");
        setScore((prev) => prev + 10);
        setCombo((prev) => prev + 1);
      } else {
        console.log("Good!");
        setScore((prev) => prev + 5);
      }

      // Remove the hit note from the visible notes
      setVisibleNotes((prev) => prev.filter((_, index) => index !== hitIndex));
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
  }, [visibleNotes]);

  return (
    <div>
      {/* Correct path for the audio file */}
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
