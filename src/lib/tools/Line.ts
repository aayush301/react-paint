class Line {
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
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(x, y);
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

export default Line;
