import { Cell } from "./Cell";
import { Bishop } from "./Figure/bishop";
import { King } from "./Figure/king";
import { Knight } from "./Figure/knight";
import { Pawn } from "./Figure/pawn";
import { Queen } from "./Figure/queen";
import { Rock } from "./Figure/rock";

export class Board {
  cells = [];

  initCells() {
    let idCell = 0;
    for (let numString = 0; numString < 8; numString++) {
      for (let i = 0; i < 8; i++) {
        if (i % 2 === 0) {
          this.cells.push(
            new Cell(
              numString % 2 === 0 ? "black" : "white",
              [],
              i,
              numString,
              idCell,
              false
            )
          );
          idCell++;
        } else {
          this.cells.push(
            new Cell(
              numString % 2 === 0 ? "white" : "black",
              [],
              i,
              numString,
              idCell,
              false
            )
          );
          idCell++;
        }
      }
    }
  }

  initFigure() {
    this.cells[0].figure.push(new Rock("black", false));
    this.cells[7].figure.push(new Rock("black", false));
    this.cells[56].figure.push(new Rock("white", false));
    this.cells[63].figure.push(new Rock("white", false));
    this.cells[1].figure.push(new Knight("black", false));
    this.cells[6].figure.push(new Knight("black", false));
    this.cells[57].figure.push(new Knight("white", false));
    this.cells[62].figure.push(new Knight("white", false));
    this.cells[2].figure.push(new Bishop("black", false));
    this.cells[5].figure.push(new Bishop("black", false));
    this.cells[58].figure.push(new Bishop("white", false));
    this.cells[61].figure.push(new Bishop("white", false));
    this.cells[3].figure.push(new King("black", false));
    this.cells[59].figure.push(new King("white", false));
    this.cells[4].figure.push(new Queen("black", false));
    this.cells[60].figure.push(new Queen("white", false));

    for (let i = 8; i <= 15; i++) {
      this.cells[i].figure.push(new Pawn("black", false));
    }

    for (let i = 48; i <= 55; i++) {
      this.cells[i].figure.push(new Pawn("white", false));
    }
  }
}
