class Triangle {
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
    const x1 = this.startX;
    const y1 = this.startY;
    const x2 = x;
    const y2 = y;
    ctx.beginPath();
    ctx.moveTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.lineTo((x1 + x2) / 2, y1);
    ctx.lineTo(x1, y2);
    ctx.stroke();
  }
}

export default Triangle;
