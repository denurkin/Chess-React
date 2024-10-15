import queenWhite from "../../assets/img/queen-white.png";
import queenBlack from "../../assets/img/queen-black.png";

export class Queen {
  name = "Queen";
  img = this.color === "black" ? queenBlack : queenWhite;
  color;
  active;

  constructor(color, active) {
    this.color = color;
    this.img = this.color === "black" ? queenBlack : queenWhite;
    this.active = active;
  }
}
