import kingWhite from "../../assets/img/king-white.png";
import kingBlack from "../../assets/img/king-black.png";

export class King {
  name = "King";
  img = this.color === "black" ? kingBlack : kingWhite;
  color;
  active;

  constructor(color, active) {
    this.color = color;
    this.img = this.color === "black" ? kingBlack : kingWhite;
    this.active = active;
  }
}
