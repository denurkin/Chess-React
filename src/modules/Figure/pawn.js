import pawnWhite from "../../assets/img/pawn-white.png";
import pawnBlack from "../../assets/img/pawn-black.png";

export class Pawn {
  name = "Pawn";
  img = this.color === "black" ? pawnBlack : pawnWhite;
  color;
  active;

  constructor(color, active) {
    this.color = color;
    this.img = this.color === "black" ? pawnBlack : pawnWhite;
    this.active = active;
  }
}
