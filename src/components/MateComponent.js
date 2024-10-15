import React from "react";
import "../css/mate.css";

const Mate = (props) => {
  const restart = () => {
    props.setMate(false);
  };

  return (
    <div className="mate">
      <h1 className="mate__title">{props.colorMate}</h1>
      <button className="mate__text" onClick={restart}>
        Начать заново
      </button>
    </div>
  );
};

export default Mate;
