import React from "react";
import "../css/figure.css";

const FigureComponent = (props) => {
  const cell = props.cell;
  return (
    <>
      <img
        src={props.figure}
        alt=""
        className={`figure__img ${cell.figure[0]?.active ? "active" : ""}`}
      ></img>
    </>
  );
};

export default FigureComponent;
