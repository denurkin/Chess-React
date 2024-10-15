export class Cell {
  color;
  figure;
  x;
  y;
  id;
  active;
  constructor(color, figure, x, y, id, active) {
    this.color = color;
    this.figure = figure;
    this.x = x;
    this.y = y;
    this.id = id;
    this.active = active;
  }
}
