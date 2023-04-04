class Oval {
  startX: number;
  startY: number;

  constructor() {
    this.startX = 0;
    this.startY = 0;
  }
  onPointerDown({ x, y }: { x: number; y: number }) {
    this.startX = x;
    this.startY = y;
  }

  onPointerMove({ ctx, x, y }: { ctx: CanvasRenderingContext2D; x: number; y: number }) {
    ctx.beginPath();
    ctx.ellipse(
      (this.startX + x) / 2,
      (this.startY + y) / 2,
      Math.abs((x - this.startX) / 2),
      Math.abs((y - this.startY) / 2),
      0,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
}

export default Oval;
