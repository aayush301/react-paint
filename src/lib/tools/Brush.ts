class Brush {
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
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

export default Brush;
