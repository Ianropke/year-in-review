import React from "react";

const Note = ({ position }) => {
  const styles = {
    left: { left: "20%" },
    center: { left: "50%", transform: "translateX(-50%)" },
    right: { left: "80%" }
  };

  return <div className="note" style={styles[position]}></div>;
};

export default Note;
