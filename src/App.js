import React from "react";
import ReactDOM from "react-dom";
import IntroScreen from "./components/IntroScreen";
import Game from "./components/Game";

const App = () => {
  const [startGame, setStartGame] = React.useState(false);

  return (
    <div>
      {startGame ? (
        <Game />
      ) : (
        <IntroScreen onStart={() => setStartGame(true)} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
