class Polygon {
  points: { x: number; y: number }[];

  constructor() {
    this.points = [];
  }
  onPointerDown({ ctx, x, y }: { ctx?: CanvasRenderingContext2D; x: number; y: number }) {
    if (this.points.length === 0) {
      this.points.push({ x, y });
    } else {
      if (!ctx) return;
      this.onPointerMove({ ctx, x, y });
    }
  }

  onPointerMove({ ctx, x, y }: { ctx: CanvasRenderingContext2D; x: number; y: number }) {
    ctx.beginPath();
    ctx.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  onPointerUp({ ctx, x, y }: { ctx?: CanvasRenderingContext2D; x: number; y: number }) {
    this.points.push({ x, y });
  }
}

export default Polygon;
