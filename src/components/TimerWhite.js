import React, { useRef, useState } from "react";

const TimerWhite = (props) => {
  const [time, setTime] = useState(props.time.current);
  const timer = `${Math.floor(time / 60)}:${
    time % 60 < 10 ? "0" + (time % 60) : time % 60
  }`;
  const timerFunc = useRef();

  if (time === 0) {
    props.setMate(true);
    props.setColorMate(`Черные выиграли`);
  }

  if (props.checkColor === "white") {
    timerFunc.current = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  } else {
    console.log();

    clearTimeout(timerFunc.current);
  }

  return <div className="timer">{timer}</div>;
};

export default TimerWhite;
