import React, { useEffect, useRef, useState } from "react";
import { Board } from "../modules/Board";
import "../css/chessboard.css";
import CellComponent from "./CellComponents";
import SelectFigure from "./SelectFigure";

const BoardComponent = (props) => {
  const prevStepRef = useRef();
  const prevStepEatRef = useRef();

  const kingWhiteRef = useRef(true);
  const kingBlackRef = useRef(true);
  const rockWhiteLeftRef = useRef(true);
  const rockWhiteRightRef = useRef(true);
  const rockBlackLeftRef = useRef(true);
  const rockBlackRightRef = useRef(true),
    [colorPawnChange, setColorPawnChange] = useState("");

  const [board, setBoard] = useState(new Board());
  const renderOne = useRef(true),
    checkColor = props.checkColor,
    [pawnChangeElement, setPawnChangeElement] = useState(),
    setCheckColor = props.setCheckColor;

  let cellFigure;

  const checkKing = () => {
    const cellKing = board.cells.find(
        (el) =>
          el.figure[0]?.name === "King" && el.figure[0]?.color === checkColor
      ),
      checkArray = [];

    const resKnight = figureKnightValud(cellKing, checkColor, board);
    if (resKnight?.length > 0) {
      checkArray.push(resKnight);
    }
    const resRock = figureRockValid(cellKing, checkColor, cellKing, board);
    if (resRock?.length > 0) {
      checkArray.push(resRock);
    }
    const resBishop = figureBishopValid(cellKing, checkColor, cellKing, board);
    if (resBishop?.length > 0) {
      checkArray.push(resBishop);
    }
    const resPawn = figurePawnValid(cellKing, checkColor, board);
    if (resPawn?.length > 0) {
      checkArray.push(resPawn);
    }
    return checkArray;
  };

  const figureKingValid = () => {
    const element = board.cells.find(
      (el) =>
        el.figure[0]?.name === "King" && el.figure[0]?.color === checkColor
    );
    const xFigure = element.x,
      yFigure = element.y,
      cellVariable = board.cells.filter((el) => {
        if (el.figure[0]?.color === element.figure[0]?.color) {
          return false;
        } else if (
          (el.x === xFigure + 1 && el.y === yFigure + 1) ||
          (el.x === xFigure + 1 && el.y === yFigure) ||
          (el.x === xFigure && el.y === yFigure + 1) ||
          (el.x === xFigure - 1 && el.y === yFigure + 1) ||
          (el.x === xFigure - 1 && el.y === yFigure) ||
          (el.x === xFigure - 1 && el.y === yFigure - 1) ||
          (el.x === xFigure && el.y === yFigure - 1) ||
          (el.x === xFigure + 1 && el.y === yFigure - 1)
        ) {
          return true;
        }
      }),
      figureColor = element.figure[0]?.color,
      cellStart = element;

    const cellActive = cellVariable.filter((el) => {
      const resKnight = figureKnightValud(el, figureColor, board);
      if (resKnight?.length > 0) {
        return false;
      }
      const resRock = figureRockValid(el, figureColor, cellStart, board);
      if (resRock?.length > 0) {
        return false;
      }

      const resBishop = figureBishopValid(el, figureColor, cellStart, board);
      if (resBishop?.length > 0) {
        return false;
      }

      const resPawn = figurePawnValid(el, figureColor, board);
      if (resPawn?.length > 0) {
        return false;
      }
      return true;
    });

    return cellActive;
  };

  const checkMate = (name) => {
    const colorValid = checkColor === "white" ? "black" : "white";
    const cellKing = board.cells.find(
      (el) =>
        el.figure[0]?.name === "King" && el.figure[0]?.color === checkColor
    );
    let res;
    switch (name) {
      case "Pawn":
        res = figurePawnValid(cellKing, checkColor, board);
        break;
      case "Knight":
        res = figureKnightValud(cellKing, checkColor, board);
        break;
      case "Rock":
        res = figureRockValid(cellKing, checkColor, cellKing, board);
        break;
      case "Bishop":
        res = figureBishopValid(cellKing, checkColor, cellKing, board);
        break;
      case "Queen":
        const rock = figureRockValid(cellKing, checkColor, cellKing, board);
        const bishop = figureBishopValid(cellKing, checkColor, cellKing, board);
        if (rock.length > 0) {
          res = rock;
        } else {
          res = bishop;
        }
        break;
    }

    let mate = [];

    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      let arrValid = figureBishopValid(element, colorValid, cellKing, board);
      let arrValidBishop = arrValid.filter((el) => el.figure.length > 0);
      if (arrValidBishop?.length > 0) {
        mate.push(arrValidBishop);
        return false;
      }
      arrValid = figureRockValid(element, colorValid, cellKing, board);
      let arrValidRock = arrValid.filter((el) => el.figure.length > 0);
      if (arrValidRock?.length > 0) {
        mate.push(arrValidRock);
        return false;
      }
      arrValid = figureKnightValud(element, colorValid, board);
      if (arrValid.length > 0) {
        mate.push(arrValid);
        return false;
      }

      if (i === 0) {
        arrValid = figurePawnValidMatFirst(element, colorValid, board);
        if (arrValid.length > 0) {
          mate.push(arrValid);
          return false;
        }
      } else {
        arrValid = figurePawnValidMate(element, colorValid, board);
        if (arrValid.length > 0) {
          mate.push(arrValid);
          return false;
        }
      }
    }
    return true;
  };

  const figurePawnValidMate = (element, colorValid, arrayBoard) => {
    const xCell = element.x,
      yCell = element.y;
    let cellValid;
    if (colorValid === "white") {
      cellValid = arrayBoard.cells.filter((el) => {
        if (el.figure[0]?.color === colorValid) {
          return false;
        } else if (
          el.x === xCell &&
          (el.y === yCell - 1 || (el.y === 1 && el.y === yCell - 2)) &&
          el.figure[0]?.name === "Pawn"
        ) {
          return true;
        }
        return false;
      });
    } else {
      cellValid = arrayBoard.cells.filter((el) => {
        if (el.figure[0]?.color === colorValid) {
          return false;
        } else if (
          el.x === xCell &&
          (el.y === yCell + 1 || (el.y === 6 && el.y === yCell + 2)) &&
          el.figure[0]?.name === "Pawn"
        ) {
          return true;
        }
        return false;
      });
    }

    return cellValid;
  };

  const figurePawnValidMatFirst = (element, colorValid, arrayBoard) => {
    const xCell = element.x,
      yCell = element.y;
    let cellValid;
    if (colorValid === "white") {
      cellValid = arrayBoard.cells.filter((el) => {
        if (el.figure[0]?.color === colorValid) {
          return false;
        } else if (
          el.y === yCell - 1 &&
          el.figure[0]?.name === "Pawn" &&
          (el.x === xCell + 1 || el.x === xCell - 1)
        ) {
          return true;
        }
        return false;
      });
    } else {
      cellValid = arrayBoard.cells.filter((el) => {
        if (el.figure[0]?.color === colorValid) {
          return false;
        } else if (
          el.y === yCell + 1 &&
          el.figure[0]?.name === "Pawn" &&
          (el.x === xCell + 1 || el.x === xCell - 1)
        ) {
          return true;
        }
        return false;
      });
    }

    return cellValid;
  };

  const figureKnightValud = (element, figureColor, arrayBoard) => {
    const xCell = element.x,
      yCell = element.y;

    const cellValid = arrayBoard.cells.filter((el) => {
      if (el.figure[0]?.color === figureColor) {
        return false;
      } else if (
        (el.x === xCell + 2 &&
          el.y === yCell + 1 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell + 1 &&
          el.y === yCell + 2 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell - 1 &&
          el.y === yCell - 2 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell - 2 &&
          el.y === yCell - 1 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell + 2 &&
          el.y === yCell - 1 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell - 2 &&
          el.y === yCell + 1 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell - 1 &&
          el.y === yCell + 2 &&
          el.figure[0]?.name === "Knight") ||
        (el.x === xCell + 1 &&
          el.y === yCell - 2 &&
          el.figure[0]?.name === "Knight")
      ) {
        return true;
      }
    });

    return cellValid;
  };

  const figureRockValid = (element, figureColor, cellStart, arrayBoard) => {
    const xCell = element.x,
      yCell = element.y,
      yCells = arrayBoard.cells.filter((el) => {
        if (cellStart.x === el.x && cellStart.y === el.y) {
          return false;
        }
        return el.x === xCell && el.y !== yCell;
      }),
      xCells = arrayBoard.cells.filter((el) => {
        if (cellStart.x === el.x && cellStart.y === el.y) {
          return false;
        }
        return el.x !== xCell && el.y === yCell;
      });

    let cellActive = [];
    let lineActive = [];

    for (let i = yCell + 1; i < 8; i++) {
      const res = yCells.find((el) => el.y === i);
      if (cellActive.length === 0) {
        lineActive.push(res);
      }
      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Rock")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    for (let i = yCell - 1; i >= 0; i--) {
      const res = yCells.find((el) => el.y === i);
      if (cellActive.length === 0) {
        lineActive.push(res);
      }
      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Rock")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    for (let i = xCell + 1; i < 8; i++) {
      const res = xCells.find((el) => el.x === i);
      if (cellActive.length === 0) {
        lineActive.push(res);
      }

      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Rock")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    for (let i = xCell - 1; i >= 0; i--) {
      const res = xCells.find((el) => el.x === i);
      if (cellActive.length === 0) {
        lineActive.push(res);
      }

      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Rock")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    cellActive = lineActive.reverse();

    return cellActive;
  };

  const figureBishopValid = (element, figureColor, cellStart, arrayBoard) => {
    const xFigure = element.x,
      yFigure = element.y;

    let cellActive = [],
      lineActive = [];

    for (
      let iy = yFigure + 1, ix = xFigure + 1;
      iy < 8 && ix < 8;
      iy++ && ix++
    ) {
      const res = arrayBoard.cells.find((el) => {
        if (el.x === cellStart.x && el.y === cellStart.y) {
          return false;
        } else {
          return el.x === ix && el.y === iy;
        }
      });
      if (cellActive.length === 0) {
        lineActive.push(res);
      }

      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Bishop")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    for (
      let iy = yFigure - 1, ix = xFigure - 1;
      iy >= 0 && ix >= 0;
      iy-- && ix--
    ) {
      const res = arrayBoard.cells.find((el) => {
        if (el.x === cellStart.x && el.y === cellStart.y) {
          return false;
        } else {
          return el.x === ix && el.y === iy;
        }
      });
      if (cellActive.length === 0) {
        lineActive.push(res);
      }

      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Bishop")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    for (
      let iy = yFigure + 1, ix = xFigure - 1;
      iy < 8 && ix >= 0;
      iy++ && ix--
    ) {
      const res = arrayBoard.cells.find((el) => {
        if (el.x === cellStart.x && el.y === cellStart.y) {
          return false;
        } else {
          return el.x === ix && el.y === iy;
        }
      });
      if (cellActive.length === 0) {
        lineActive.push(res);
      }

      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Bishop")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    for (
      let iy = yFigure - 1, ix = xFigure + 1;
      iy >= 0 && ix < 8;
      iy-- && ix++
    ) {
      const res = arrayBoard.cells.find((el) => {
        if (el.x === cellStart.x && el.y === cellStart.y) {
          return false;
        } else {
          return el.x === ix && el.y === iy;
        }
      });
      if (cellActive.length === 0) {
        lineActive.push(res);
      }

      if (res) {
        if (res.figure[0]?.color === figureColor) {
          break;
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor &&
          (res.figure[0]?.name === "Queen" || res.figure[0]?.name === "Bishop")
        ) {
          cellActive.push(res);
        } else if (
          res.figure.length === 1 &&
          res.figure[0]?.color !== figureColor
        ) {
          break;
        }
      }
    }

    if (cellActive.length === 0) {
      lineActive = [];
    }

    cellActive = lineActive.reverse();

    return cellActive;
  };

  const figurePawnValid = (element, figureColor, arrayBoard) => {
    const xFigure = element.x,
      yFigure = element.y,
      cellActive = [];

    if (figureColor === "white") {
      const cellLeft = arrayBoard.cells.find((el) => {
        return el.x === xFigure - 1 && el.y === yFigure - 1;
      });
      if (
        cellLeft?.figure[0]?.name === "Pawn" &&
        cellLeft?.figure[0]?.color !== "white"
      ) {
        cellActive.push(cellLeft);
      }
      const cellRight = arrayBoard.cells.find((el) => {
        return el.x === xFigure + 1 && el.y === yFigure - 1;
      });
      if (
        cellRight?.figure[0]?.name === "Pawn" &&
        cellRight?.figure[0]?.color !== "white"
      ) {
        cellActive.push(cellRight);
      }
    } else {
      const cellLeft = arrayBoard.cells.find((el) => {
        return el.x === xFigure + 1 && el.y === yFigure + 1;
      });
      if (
        cellLeft?.figure[0]?.name === "Pawn" &&
        cellLeft?.figure[0]?.color !== "black"
      ) {
        cellActive.push(cellLeft);
      }
      const cellRight = arrayBoard.cells.find((el) => {
        return el.x === xFigure - 1 && el.y === yFigure + 1;
      });
      if (
        cellRight?.figure[0]?.name === "Pawn" &&
        cellRight?.figure[0]?.color !== "black"
      ) {
        cellActive.push(cellRight);
      }
    }

    return cellActive;
  };

  const mate = () => {
    props.setMate(true);
    props.setColorMate(
      `${checkColor === "white" ? "Черные" : "Белые"} выиграли`
    );
  };

  if (renderOne.current) {
    board.initCells();
    board.initFigure();
  }

  useEffect(() => {
    renderOne.current = false;
  }, []);

  if (checkKing().length > 0) {
    cellFigure = checkKing()[0];
    let figureName = cellFigure[0].figure[0].name;
    if (figureKingValid().length === 0) {
      if (checkMate(figureName)) {
        mate();
      }
    }
  }

  const newBoard = structuredClone(board);

  return (
    <div className="Chessboard">
      {board.cells.map((el) => {
        return (
          <CellComponent
            prevStepRef={prevStepRef}
            cellFigure={cellFigure}
            el={el}
            board={board}
            setBoard={setBoard}
            checkColor={checkColor}
            setCheckColor={setCheckColor}
            key={el.id}
            figurePawnValid={figurePawnValid}
            figureBishopValid={figureBishopValid}
            figureRockValid={figureRockValid}
            figureKnightValud={figureKnightValud}
            newBoard={newBoard}
            prevStepEatRef={prevStepEatRef}
            kingWhiteRef={kingWhiteRef}
            kingBlackRef={kingBlackRef}
            rockWhiteLeftRef={rockWhiteLeftRef}
            rockWhiteRightRef={rockWhiteRightRef}
            rockBlackLeftRef={rockBlackLeftRef}
            rockBlackRightRef={rockBlackRightRef}
            setColorPawnChange={setColorPawnChange}
            setPawnChangeElement={setPawnChangeElement}
          />
        );
      })}

      {colorPawnChange === "white" || colorPawnChange === "black" ? (
        <SelectFigure
          colorPawnChange={colorPawnChange}
          setColorPawnChange={setColorPawnChange}
          pawnChangeElement={pawnChangeElement}
          newBoard={newBoard}
          setBoard={setBoard}
          checkColor={checkColor}
          setCheckColor={setCheckColor}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BoardComponent;
