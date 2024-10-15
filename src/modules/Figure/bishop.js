import bishopWhite from "../../assets/img/bishop-white.png";
import bishopBlack from "../../assets/img/bishop-black.png";

export class Bishop {
  name = "Bishop";
  img = this.color === "black" ? bishopBlack : bishopWhite;
  color;
  active;

  constructor(color, active) {
    this.color = color;
    this.img = this.color === "black" ? bishopBlack : bishopWhite;
    this.active = active;
  }
}
