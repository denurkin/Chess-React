import knightWhite from "../../assets/img/knight-white.png";
import knightBlack from "../../assets/img/knight-black.png";

export class Knight {
  name = "Knight";
  img = this.color === "black" ? knightBlack : knightWhite;
  color;
  active;

  constructor(color, active) {
    this.color = color;
    this.img = this.color === "black" ? knightBlack : knightWhite;
    this.active = active;
  }
}
