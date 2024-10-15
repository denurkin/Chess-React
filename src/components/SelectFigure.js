import React from "react";
import "../css/selectfigure.css";
import bishopWhite from "../assets/img/bishop-white.png";
import bishopBlack from "../assets/img/bishop-black.png";
import knightWhite from "../assets/img/knight-white.png";
import knightBlack from "../assets/img/knight-black.png";
import queenWhite from "../assets/img/queen-white.png";
import queenBlack from "../assets/img/queen-black.png";
import rockWhite from "../assets/img/rook-white.png";
import rockBlack from "../assets/img/rook-black.png";

const SelectFigure = (props) => {
  const selectFigureFunc = (nameFigure, imgFigure) => {
    props.pawnChangeElement.figure[0].name = nameFigure;
    props.pawnChangeElement.figure[0].img = imgFigure;
    const indexElementBoard = props.newBoard.cells.findIndex(
      (el) =>
        el.x === props.pawnChangeElement.x && el.y === props.pawnChangeElement.y
    );
    props.newBoard.cells[indexElementBoard] = props.pawnChangeElement;
    props.setBoard(props.newBoard);
    props.setColorPawnChange("");
    props.setCheckColor(props.checkColor === "white" ? "black" : "white");
  };

  return (
    <div className="select__wrapper">
      <div className="select">
        <img
          className="select__figure"
          src={props.colorPawnChange === "white" ? bishopWhite : bishopBlack}
          alt=""
          onClick={() => {
            selectFigureFunc(
              "Bishop",
              props.colorPawnChange === "white" ? bishopWhite : bishopBlack
            );
          }}
        />
        <img
          className="select__figure"
          src={props.colorPawnChange === "white" ? knightWhite : knightBlack}
          alt=""
          onClick={() => {
            selectFigureFunc(
              "Knight",
              props.colorPawnChange === "white" ? knightWhite : knightBlack
            );
          }}
        />
        <img
          className="select__figure"
          src={props.colorPawnChange === "white" ? queenWhite : queenBlack}
          alt=""
          onClick={() => {
            selectFigureFunc(
              "Queen",
              props.colorPawnChange === "white" ? queenWhite : queenBlack
            );
          }}
        />
        <img
          className="select__figure"
          src={props.colorPawnChange === "white" ? rockWhite : rockBlack}
          alt=""
          onClick={() => {
            selectFigureFunc(
              "Rock",
              props.colorPawnChange === "white" ? rockWhite : rockBlack
            );
          }}
        />
      </div>
    </div>
  );
};

export default SelectFigure;
