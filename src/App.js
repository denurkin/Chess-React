import React, { useState } from "react";
import Mate from "./components/MateComponent";

import "./normalize.css";
import "./App.css";
import FullBoardComponent from "./components/FullBoardComponent";

const App = () => {
  const [mate, setMate] = useState(false);
  const [colorMate, setColorMate] = useState("");

  return (
    <div className="App">
      {mate === true ? (
        <Mate colorMate={colorMate} setMate={setMate} />
      ) : (
        <FullBoardComponent setMate={setMate} setColorMate={setColorMate} />
      )}
    </div>
  );
};

export default App;
