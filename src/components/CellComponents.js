import React from "react";
import FigureComponent from "./FigureComponent";

import "../css/cell.css";

const CellComponent = (props) => {
  const figurePawnValid = props.figurePawnValid,
    figureBishopValid = props.figureBishopValid,
    figureRockValid = props.figureRockValid,
    figureKnightValud = props.figureKnightValud;

  const cell = props.el,
    newBoard = props.newBoard,
    setBoard = props.setBoard,
    checkFigure = cell.figure.length !== 0;

  const checkValid = () => {
    const figureColor = props.checkColor,
      cellKing = newBoard.cells.find(
        (el) =>
          el.figure[0]?.name === "King" && el.figure[0]?.color === figureColor
      );

    const resKnight = figureKnightValud(cellKing, figureColor, newBoard);
    if (resKnight?.length > 0) {
      return false;
    }
    const resRock = figureRockValid(cellKing, figureColor, cellKing, newBoard);
    if (resRock?.length > 0) {
      return false;
    }

    const resBishop = figureBishopValid(
      cellKing,
      figureColor,
      cellKing,
      newBoard
    );
    if (resBishop?.length > 0) {
      return false;
    }

    const resPawn = figurePawnValid(cellKing, figureColor, newBoard);
    if (resPawn?.length > 0) {
      return false;
    }
    return true;
  };

  const figureMove = (element, cellFigure) => {
    const figure = cellFigure[0].figure[0];

    if (
      figure.name === "Pawn" &&
      props.prevStepEatRef.current !== null &&
      props.prevStepEatRef.current !== undefined &&
      props.prevStepRef.current !== null &&
      props.prevStepRef.current !== undefined &&
      props.prevStepEatRef.current.x === element.x &&
      props.prevStepEatRef.current.y === element.y
    ) {
      newBoard.cells[props.prevStepRef.current.id].figure.splice(0, 1);
    }

    if (newBoard.cells[element.id].active) {
      newBoard.cells[cellFigure[0].id].figure.splice(0, 1);
      newBoard.cells[element.id].figure.splice(0, 1, figure);
      newBoard.cells[element.id].figure[0].active = false;
      props.prevStepEatRef.current = null;
      props.prevStepRef.current = null;

      if (
        !(
          figure.name === "Pawn" &&
          figure.color === "black" &&
          cellFigure[0]?.y === 6 &&
          element?.y === 7
        ) &&
        !(
          figure.name === "Pawn" &&
          figure.color === "white" &&
          cellFigure[0]?.y === 1 &&
          element?.y === 0
        )
      ) {
        props.setCheckColor(props.checkColor === "white" ? "black" : "white");
      }

      if (figure.name === "Rock") {
        if (cellFigure[0].x === 0 && cellFigure[0].y === 0) {
          props.rockBlackLeftRef.current = false;
        } else if (cellFigure[0].x === 7 && cellFigure[0].y === 0) {
          props.rockBlackRightRef.current = false;
        } else if (cellFigure[0].x === 0 && cellFigure[0].y === 7) {
          props.rockWhiteLeftRef.current = false;
        } else if (cellFigure[0].x === 7 && cellFigure[0].y === 7) {
          props.rockWhiteRightRef.current = false;
        }
      }

      if (figure.name === "King") {
        if (cellFigure[0].x === 3 && cellFigure[0].y === 0) {
          if (
            props.kingBlackRef.current &&
            element.x === 1 &&
            props.rockBlackLeftRef.current
          ) {
            const rockFigureCastling = newBoard.cells.find(
                (el) => el.x === 0 && el.y === 0
              ),
              figure = rockFigureCastling.figure[0],
              castlingCell = newBoard.cells.find(
                (el) => el.x === 2 && el.y === 0
              );
            newBoard.cells[rockFigureCastling.id].figure.splice(0, 1);
            newBoard.cells[castlingCell.id].figure.splice(0, 1, figure);
          } else if (
            props.kingBlackRef.current &&
            element.x === 5 &&
            props.rockBlackLeftRef.current
          ) {
            const rockFigureCastling = newBoard.cells.find(
                (el) => el.x === 7 && el.y === 0
              ),
              figure = rockFigureCastling.figure[0],
              castlingCell = newBoard.cells.find(
                (el) => el.x === 4 && el.y === 0
              );
            newBoard.cells[rockFigureCastling.id].figure.splice(0, 1);
            newBoard.cells[castlingCell.id].figure.splice(0, 1, figure);
          }
          props.kingBlackRef.current = false;
        } else if (cellFigure[0].x === 3 && cellFigure[0].y === 7) {
          if (
            props.kingWhiteRef.current &&
            element.x === 1 &&
            props.rockWhiteLeftRef.current
          ) {
            const rockFigureCastling = newBoard.cells.find(
                (el) => el.x === 0 && el.y === 7
              ),
              figure = rockFigureCastling.figure[0],
              castlingCell = newBoard.cells.find(
                (el) => el.x === 2 && el.y === 7
              );
            newBoard.cells[rockFigureCastling.id].figure.splice(0, 1);
            newBoard.cells[castlingCell.id].figure.splice(0, 1, figure);
          } else if (
            props.kingWhiteRef.current &&
            element.x === 5 &&
            props.rockWhiteLeftRef.current
          ) {
            const rockFigureCastling = newBoard.cells.find(
                (el) => el.x === 7 && el.y === 7
              ),
              figure = rockFigureCastling.figure[0],
              castlingCell = newBoard.cells.find(
                (el) => el.x === 4 && el.y === 7
              );
            newBoard.cells[rockFigureCastling.id].figure.splice(0, 1);
            newBoard.cells[castlingCell.id].figure.splice(0, 1, figure);
          }

          props.kingWhiteRef.current = false;
        }
      }
    } else {
      newBoard.cells[cellFigure[0].id].figure[0].active = false;
    }

    if (figure.name === "Pawn") {
      if (
        figure.color === "white" &&
        cellFigure[0]?.y === 6 &&
        element?.y === 4
      ) {
        props.prevStepRef.current = element;
      } else if (
        figure.color === "black" &&
        cellFigure[0]?.y === 1 &&
        element?.y === 3
      ) {
        props.prevStepRef.current = element;
      } else if (
        figure.color === "black" &&
        cellFigure[0]?.y === 6 &&
        element?.y === 7
      ) {
        props.setPawnChangeElement(element);
        props.setColorPawnChange("black");
      } else if (
        figure.color === "white" &&
        cellFigure[0]?.y === 1 &&
        element?.y === 0
      ) {
        props.setPawnChangeElement(element);
        props.setColorPawnChange("white");
      }
    }

    newBoard.cells.forEach((el) => {
      el.active = false;
    });
    setBoard(newBoard);
  };

  const figureActive = (cellX, cellY, e) => {
    let element = newBoard.cells.filter((el) => {
      return el.x === cellX && el.y === cellY;
    });
    element = element[0];
    const cellFigure = newBoard.cells.filter((elem) => {
      if (elem.figure[0] !== undefined) {
        return elem.figure[0].active;
      } else {
        return false;
      }
    });

    if (e.target.classList.contains("cell") && cellFigure.length === 0) {
      return;
    } else if (cellFigure.length !== 0) {
      figureMove(element, cellFigure);
      return;
    } else if (element.figure[0]?.color !== props.checkColor) {
      return;
    }

    const figureName = element.figure[0].name;

    if (cellFigure.length === 0) {
      newBoard.cells[element.id].figure[0].active = true;
      checkFigureFunction(element, figureName);
    }
  };

  const rockFigure = (element) => {
    const xFigure = element.x,
      yFigure = element.y,
      cellStart = element,
      figure = element.figure[0],
      yCells = newBoard.cells.filter((el) => {
        if (
          el.figure.length !== 0 &&
          element.figure[0]?.color === el.figure[0]?.color &&
          el.figure[0]
        ) {
          return false;
        }
        return el.x === xFigure && el.y !== yFigure;
      }),
      xCells = newBoard.cells.filter((el) => {
        if (
          el.figure.length !== 0 &&
          element.figure[0]?.color === el.figure[0]?.color &&
          el.figure[0]
        ) {
          return false;
        }
        return el.x !== xFigure && el.y === yFigure;
      });

    const cellActive = [];

    const cellActiveFunction = () => {
      for (let i = element.y + 1; i < 8; i++) {
        const res = yCells.find((el) => {
          return element.x === el.x && el.y === i;
        });
        if (res !== undefined && res.figure.length !== 1) {
          cellActive.push(res);
        } else if (res !== undefined && res.figure.length === 1) {
          cellActive.push(res);
          break;
        } else if (res !== undefined) {
          break;
        } else {
          break;
        }
      }

      for (let i = element.y - 1; i >= 0; i--) {
        const res = yCells.find((el) => {
          return element.x === el.x && el.y === i;
        });
        if (res !== undefined && res.figure.length !== 1) {
          cellActive.push(res);
        } else if (res !== undefined && res.figure.length === 1) {
          cellActive.push(res);
          break;
        } else if (res !== undefined) {
          break;
        } else {
          break;
        }
      }

      for (let i = element.x + 1; i < 8; i++) {
        const res = xCells.find((el) => {
          return element.y === el.y && el.x === i;
        });
        if (res !== undefined && res.figure.length !== 1) {
          cellActive.push(res);
        } else if (res !== undefined && res.figure.length === 1) {
          cellActive.push(res);
          break;
        } else if (res !== undefined) {
          break;
        } else {
          break;
        }
      }

      for (let i = element.x - 1; i >= 0; i--) {
        const res = xCells.find((el) => {
          return element.y === el.y && el.x === i;
        });
        if (res !== undefined && res.figure.length !== 1) {
          cellActive.push(res);
        } else if (res !== undefined && res.figure.length === 1) {
          cellActive.push(res);
          break;
        } else if (res !== undefined) {
          break;
        } else {
          break;
        }
      }
    };
    cellActiveFunction();

    const resFunc = cellActive.filter((el) => {
      const figureCell = newBoard.cells[el.id]?.figure[0];
      newBoard.cells[cellStart.id].figure.splice(0, 1);
      newBoard.cells[el.id].figure.splice(0, 1, figure);
      const res = checkValid();
      newBoard.cells[cellStart.id].figure.splice(0, 1, figure);
      if (figureCell !== undefined) {
        newBoard.cells[el.id].figure.splice(0, 1, figureCell);
      } else {
        newBoard.cells[el.id].figure.splice(0, 1);
      }

      return res;
    });

    resFunc.forEach((el) => {
      if (newBoard.cells[el.id].figure[0]?.name !== "King") {
        newBoard.cells[el.id].active = true;
      }
    });
  };

  const bishopFigure = (element) => {
    const xFigure = element.x,
      yFigure = element.y,
      cellActive = [],
      figure = element.figure[0],
      cellStart = element;

    for (
      let iy = yFigure + 1, ix = xFigure + 1;
      iy < 8 && ix < 8;
      iy++ && ix++
    ) {
      const res = newBoard.cells.find((el) => {
        return el.x === ix && el.y === iy;
      });

      if (res.figure.length !== 1) {
        cellActive.push(res);
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        cellActive.push(res);
        break;
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        break;
      } else {
        break;
      }
    }

    for (
      let iy = yFigure - 1, ix = xFigure - 1;
      iy >= 0 && ix >= 0;
      iy-- && ix--
    ) {
      const res = newBoard.cells.find((el) => {
        return el.x === ix && el.y === iy;
      });

      if (res.figure.length !== 1) {
        cellActive.push(res);
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        cellActive.push(res);
        break;
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        break;
      } else {
        break;
      }
    }

    for (
      let iy = yFigure + 1, ix = xFigure - 1;
      iy < 8 && ix >= 0;
      iy++ && ix--
    ) {
      const res = newBoard.cells.find((el) => {
        return el.x === ix && el.y === iy;
      });

      if (res.figure.length !== 1) {
        cellActive.push(res);
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        cellActive.push(res);
        break;
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        break;
      } else {
        break;
      }
    }

    for (
      let iy = yFigure - 1, ix = xFigure + 1;
      iy >= 0 && ix < 8;
      iy-- && ix++
    ) {
      const res = newBoard.cells.find((el) => {
        return el.x === ix && el.y === iy;
      });

      if (res.figure.length !== 1) {
        cellActive.push(res);
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        cellActive.push(res);
        break;
      } else if (
        res.figure.length === 1 &&
        res.figure[0]?.color !== element.figure[0]?.color
      ) {
        break;
      } else {
        break;
      }
    }

    const resFunc = cellActive.filter((el) => {
      const figureCell = newBoard.cells[el.id]?.figure[0];
      newBoard.cells[cellStart.id].figure.splice(0, 1);
      newBoard.cells[el.id].figure.splice(0, 1, figure);
      const res = checkValid();
      newBoard.cells[cellStart.id].figure.splice(0, 1, figure);
      if (figureCell !== undefined) {
        newBoard.cells[el.id].figure.splice(0, 1, figureCell);
      } else {
        newBoard.cells[el.id].figure.splice(0, 1);
      }

      return res;
    });

    resFunc.forEach((el) => {
      if (newBoard.cells[el.id].figure[0]?.name !== "King") {
        newBoard.cells[el.id].active = true;
      }
    });
  };

  const knightFigure = (element) => {
    const xFigure = element.x,
      yFigure = element.y,
      cellStart = element,
      figure = element.figure[0],
      cellActive = newBoard.cells.filter((el) => {
        if (el.figure[0]?.color === element.figure[0]?.color) {
          return false;
        } else if (
          (el.x === xFigure + 2 && el.y === yFigure + 1) ||
          (el.x === xFigure + 1 && el.y === yFigure + 2) ||
          (el.x === xFigure - 1 && el.y === yFigure - 2) ||
          (el.x === xFigure - 2 && el.y === yFigure - 1) ||
          (el.x === xFigure + 2 && el.y === yFigure - 1) ||
          (el.x === xFigure - 2 && el.y === yFigure + 1) ||
          (el.x === xFigure - 1 && el.y === yFigure + 2) ||
          (el.x === xFigure + 1 && el.y === yFigure - 2)
        ) {
          return true;
        }
      });

    const resFunc = cellActive.filter((el) => {
      const figureCell = newBoard.cells[el.id]?.figure[0];
      newBoard.cells[cellStart.id].figure.splice(0, 1);
      newBoard.cells[el.id].figure.splice(0, 1, figure);
      const res = checkValid();
      newBoard.cells[cellStart.id].figure.splice(0, 1, figure);
      if (figureCell !== undefined) {
        newBoard.cells[el.id].figure.splice(0, 1, figureCell);
      } else {
        newBoard.cells[el.id].figure.splice(0, 1);
      }

      return res;
    });

    resFunc.forEach((el) => {
      if (newBoard.cells[el.id].figure[0]?.name !== "King") {
        newBoard.cells[el.id].active = true;
      }
    });
  };

  const pawnFigureWhite = (element) => {
    let moveJump = false;

    const xFigure = element.x,
      yFigure = element.y,
      figure = element.figure[0],
      cellStart = element,
      cellActive = newBoard.cells.filter((el) => {
        if (el.figure[0]?.color === element.figure[0]?.color) {
          return false;
        } else if (
          el.y === yFigure - 1 &&
          el.x === xFigure &&
          el.figure.length === 0
        ) {
          moveJump = true;
          return true;
        } else if (
          el.y === yFigure - 1 &&
          (el.x === xFigure - 1 || el.x === xFigure + 1) &&
          el.figure.length === 1
        ) {
          return true;
        }
      });

    if (moveJump) {
      let res = newBoard.cells.filter((el) => {
        if (
          el.y === yFigure - 2 &&
          el.x === xFigure &&
          el.figure.length === 0 &&
          el.y === 4
        ) {
          return true;
        }
        return false;
      });
      if (res.length !== 0) {
        cellActive.push(res[0]);
      }
    }

    if (
      props.prevStepRef.current !== null &&
      props.prevStepRef.current !== undefined &&
      props.prevStepRef.current.y === yFigure &&
      (props.prevStepRef.current.x === xFigure + 1 ||
        props.prevStepRef.current.x === xFigure - 1)
    ) {
      const cellStep = newBoard.cells.find((el) => {
        return (
          el.x === props.prevStepRef.current.x &&
          el.y === props.prevStepRef.current.y - 1
        );
      });
      props.prevStepEatRef.current = cellStep;
      cellActive.push(cellStep);
    }

    const resFunc = cellActive.filter((el) => {
      const figureCell = newBoard.cells[el.id]?.figure[0];
      newBoard.cells[cellStart.id].figure.splice(0, 1);
      newBoard.cells[el.id].figure.splice(0, 1, figure);
      const res = checkValid();
      newBoard.cells[cellStart.id].figure.splice(0, 1, figure);
      if (figureCell !== undefined) {
        newBoard.cells[el.id].figure.splice(0, 1, figureCell);
      } else {
        newBoard.cells[el.id].figure.splice(0, 1);
      }

      return res;
    });

    if (resFunc.length > 0) {
      resFunc.forEach((el) => {
        if (newBoard.cells[el.id].figure[0]?.name !== "King") {
          newBoard.cells[el.id].active = true;
        }
      });
    }
  };

  const pawnFigureBlack = (element) => {
    let moveJump = false;

    const xFigure = element.x,
      yFigure = element.y,
      figure = element.figure[0],
      cellStart = element,
      cellActive = newBoard.cells.filter((el) => {
        if (el.figure[0]?.color === element.figure[0]?.color) {
          return false;
        } else if (
          el.y === yFigure + 1 &&
          el.x === xFigure &&
          el.figure.length === 0
        ) {
          moveJump = true;
          return true;
        } else if (
          el.y === yFigure + 1 &&
          (el.x === xFigure + 1 || el.x === xFigure - 1) &&
          el.figure.length === 1
        ) {
          return true;
        }
      });

    if (moveJump) {
      let res = newBoard.cells.filter((el) => {
        if (
          el.y === yFigure + 2 &&
          el.x === xFigure &&
          el.figure.length === 0 &&
          el.y === 3
        ) {
          return true;
        }
        return false;
      });
      if (res.length !== 0) {
        cellActive.push(res[0]);
      }
    }

    if (
      props.prevStepRef.current !== null &&
      props.prevStepRef.current !== undefined &&
      props.prevStepRef.current.y === yFigure &&
      (props.prevStepRef.current.x === xFigure + 1 ||
        props.prevStepRef.current.x === xFigure - 1)
    ) {
      const cellStep = newBoard.cells.find((el) => {
        return (
          el.x === props.prevStepRef.current.x &&
          el.y === props.prevStepRef.current.y + 1
        );
      });
      props.prevStepEatRef.current = cellStep;
      cellActive.push(cellStep);
    }

    const resFunc = cellActive.filter((el) => {
      const figureCell = newBoard.cells[el.id]?.figure[0];
      newBoard.cells[cellStart.id].figure.splice(0, 1);
      newBoard.cells[el.id].figure.splice(0, 1, figure);
      const res = checkValid();
      newBoard.cells[cellStart.id].figure.splice(0, 1, figure);
      if (figureCell !== undefined) {
        newBoard.cells[el.id].figure.splice(0, 1, figureCell);
      } else {
        newBoard.cells[el.id].figure.splice(0, 1);
      }

      return res;
    });

    if (resFunc.length > 0) {
      resFunc.forEach((el) => {
        if (newBoard.cells[el.id].figure[0]?.name !== "King") {
          newBoard.cells[el.id].active = true;
        }
      });
    }
  };

  const kingFigure = (element) => {
    const xFigure = element.x,
      yFigure = element.y,
      cellVariable = newBoard.cells.filter((el) => {
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

    if (
      figureColor === "white" &&
      props.kingWhiteRef.current &&
      props.rockWhiteLeftRef.current &&
      props.cellFigure === undefined
    ) {
      const leftCellsFigure = newBoard.cells.filter((el) => {
        return (
          (el.x === 1 && el.y === 7 && el.figure.length === 0) ||
          (el.x === 2 && el.y === 7 && el.figure.length === 0)
        );
      });

      if (leftCellsFigure.length === 2) {
        const res = leftCellsFigure.filter((el) => {
          const resKnight = figureKnightValud(el, figureColor, newBoard);
          if (resKnight?.length > 0) {
            return false;
          }
          const resRock = figureRockValid(el, figureColor, cellStart, newBoard);
          if (resRock?.length > 0) {
            return false;
          }

          const resBishop = figureBishopValid(
            el,
            figureColor,
            cellStart,
            newBoard
          );
          if (resBishop?.length > 0) {
            return false;
          }

          const resPawn = figurePawnValid(el, figureColor, newBoard);
          if (resPawn?.length > 0) {
            return false;
          }
          return true;
        });

        if (res.length === 2) {
          const element = res.find((el) => el.x === 1 && el.y === 7);
          cellVariable.push(element);
        }
      }
    }
    if (
      figureColor === "white" &&
      props.kingWhiteRef.current &&
      props.rockWhiteRightRef.current &&
      props.cellFigure === undefined
    ) {
      const RightCellsFigure = newBoard.cells.filter((el) => {
        return (
          (el.x === 5 && el.y === 7 && el.figure.length === 0) ||
          (el.x === 4 && el.y === 7 && el.figure.length === 0)
        );
      });
      if (RightCellsFigure.length === 2) {
        const res = RightCellsFigure.filter((el) => {
          const resKnight = figureKnightValud(el, figureColor, newBoard);
          if (resKnight?.length > 0) {
            return false;
          }
          const resRock = figureRockValid(el, figureColor, cellStart, newBoard);
          if (resRock?.length > 0) {
            return false;
          }

          const resBishop = figureBishopValid(
            el,
            figureColor,
            cellStart,
            newBoard
          );
          if (resBishop?.length > 0) {
            return false;
          }

          const resPawn = figurePawnValid(el, figureColor, newBoard);
          if (resPawn?.length > 0) {
            return false;
          }
          return true;
        });

        if (res.length === 2) {
          const element = res.find((el) => el.x === 5 && el.y === 7);
          cellVariable.push(element);
        }
      }
    }
    if (
      figureColor === "black" &&
      props.kingBlackRef.current &&
      props.rockBlackRightRef.current &&
      props.cellFigure === undefined
    ) {
      const RightCellsFigure = newBoard.cells.filter((el) => {
        return (
          (el.x === 5 && el.y === 0 && el.figure.length === 0) ||
          (el.x === 4 && el.y === 0 && el.figure.length === 0)
        );
      });
      if (RightCellsFigure.length === 2) {
        const res = RightCellsFigure.filter((el) => {
          const resKnight = figureKnightValud(el, figureColor, newBoard);
          if (resKnight?.length > 0) {
            return false;
          }
          const resRock = figureRockValid(el, figureColor, cellStart, newBoard);
          if (resRock?.length > 0) {
            return false;
          }

          const resBishop = figureBishopValid(
            el,
            figureColor,
            cellStart,
            newBoard
          );
          if (resBishop?.length > 0) {
            return false;
          }

          const resPawn = figurePawnValid(el, figureColor, newBoard);
          if (resPawn?.length > 0) {
            return false;
          }
          return true;
        });

        if (res.length === 2) {
          const element = res.find((el) => el.x === 5 && el.y === 0);
          cellVariable.push(element);
        }
      }
    }
    if (
      figureColor === "black" &&
      props.kingBlackRef.current &&
      props.rockBlackLeftRef.current &&
      props.cellFigure === undefined
    ) {
      const leftCellsFigure = newBoard.cells.filter((el) => {
        return (
          (el.x === 1 && el.y === 0 && el.figure.length === 0) ||
          (el.x === 2 && el.y === 0 && el.figure.length === 0)
        );
      });

      if (leftCellsFigure.length === 2) {
        const res = leftCellsFigure.filter((el) => {
          const resKnight = figureKnightValud(el, figureColor, newBoard);
          if (resKnight?.length > 0) {
            return false;
          }
          const resRock = figureRockValid(el, figureColor, cellStart, newBoard);
          if (resRock?.length > 0) {
            return false;
          }

          const resBishop = figureBishopValid(
            el,
            figureColor,
            cellStart,
            newBoard
          );
          if (resBishop?.length > 0) {
            return false;
          }

          const resPawn = figurePawnValid(el, figureColor, newBoard);
          if (resPawn?.length > 0) {
            return false;
          }
          return true;
        });

        if (res.length === 2) {
          const element = res.find((el) => el.x === 1 && el.y === 0);
          cellVariable.push(element);
        }
      }
    }

    const cellActive = cellVariable.filter((el) => {
      const resKnight = figureKnightValud(el, figureColor, newBoard);
      if (resKnight?.length > 0) {
        return false;
      }
      const resRock = figureRockValid(el, figureColor, cellStart, newBoard);
      if (resRock?.length > 0) {
        return false;
      }

      const resBishop = figureBishopValid(el, figureColor, cellStart, newBoard);
      if (resBishop?.length > 0) {
        return false;
      }

      const resPawn = figurePawnValid(el, figureColor, newBoard);
      if (resPawn?.length > 0) {
        return false;
      }
      return true;
    });

    cellActive.forEach((el) => {
      if (newBoard.cells[el.id].figure[0]?.name !== "King") {
        newBoard.cells[el.id].active = true;
      }
    });
  };

  const checkFigureFunction = (element, figureName) => {
    switch (figureName) {
      case "Pawn":
        if (element.figure[0].color === "white") {
          pawnFigureWhite(element);
        } else {
          pawnFigureBlack(element);
        }
        break;
      case "Knight":
        knightFigure(element);
        break;
      case "Rock":
        rockFigure(element);
        break;
      case "Bishop":
        bishopFigure(element);
        break;
      case "Queen":
        rockFigure(element);
        bishopFigure(element);
        break;

      case "King":
        kingFigure(element);
        break;
    }
    setBoard(newBoard);
  };

  return (
    <div
      className={`cell ${cell.color}`}
      onClick={(e) => {
        figureActive(cell.x, cell.y, e);
      }}
    >
      {cell.active ? <div className="avalible"></div> : ""}
      {checkFigure ? (
        <FigureComponent figure={cell.figure[0].img} cell={cell} />
      ) : (
        ""
      )}
    </div>
  );
};

export default CellComponent;
