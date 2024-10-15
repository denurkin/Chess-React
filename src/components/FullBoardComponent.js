import React, { useRef, useState } from "react";
import BoardComponent from "./BoardComponent";

import "../css/chessboard.css";
import TimerWhite from "./TimerWhite";
import TimerBlack from "./TimerBlack";

const FullBoardComponent = (props) => {
  const whiteTimer = useRef(600),
    blackTimer = useRef(600),
    [checkColor, setCheckColor] = useState("white");

  return (
    <div className="full__chessboard">
      <TimerBlack
        time={blackTimer}
        checkColor={checkColor}
        setMate={props.setMate}
        setColorMate={props.setColorMate}
      />
      <BoardComponent
        setMate={props.setMate}
        setColorMate={props.setColorMate}
        checkColor={checkColor}
        setCheckColor={setCheckColor}
      />
      <TimerWhite
        time={whiteTimer}
        checkColor={checkColor}
        setMate={props.setMate}
        setColorMate={props.setColorMate}
      />
    </div>
  );
};

export default FullBoardComponent;
