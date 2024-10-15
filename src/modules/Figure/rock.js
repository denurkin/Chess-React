import rockWhite from "../../assets/img/rook-white.png";
import rockBlack from "../../assets/img/rook-black.png";

export class Rock {
  name = "Rock";
  color;
  img = this.color === "black" ? rockBlack : rockWhite;
  active;

  constructor(color, active) {
    this.color = color;
    this.img = this.color === "black" ? rockBlack : rockWhite;
    this.active = active;
  }
}
