import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import Toolbar from "./Toolbar";
import tools from "../lib/toolManager";
import cursors from "../lib/cursors";

function AppContainer() {
  const { canvas, canvasRef, ctx, setCtx, drawingState, setDrawingState } = useGlobalContext();
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [snapshot, setSnapshot] = useState<ImageData>();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    setCtx(canvas.getContext("2d"));
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, [canvasRef, setCtx]);

  useEffect(() => {
    const handleWindowMouseUp = () => {
      setIsDrawingMode(false);
    };
    window.addEventListener("mouseup", handleWindowMouseUp);
    return () => window.removeEventListener("mouseUp", handleWindowMouseUp);
  }, []);

  const onPointerDown = (e: React.MouseEvent) => {
    if (!ctx || !canvas || isDrawingMode) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.fillStyle = drawingState.color;
    ctx.strokeStyle = drawingState.color;
    ctx.lineWidth = drawingState.width;
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    tools[drawingState.tool].onPointerDown({ ctx, x, y });
    setIsDrawingMode(true);
  };

  const onPointerUp = (e: React.MouseEvent) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (drawingState.tool === "polygon") {
      tools[drawingState.tool].onPointerUp?.({ x, y });
    }

    setIsDrawingMode(false);
  };

  const onPointerMove = (e: React.MouseEvent) => {
    if (!ctx || !canvas || !isDrawingMode) return;
    if (snapshot) ctx.putImageData(snapshot, 0, 0);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tools[drawingState.tool].onPointerMove({ ctx, x, y });
  };

  const cursor = cursors.find(cursor => cursor.tool === drawingState.tool)?.cursor || "pointer";

  return (
    <div className="h-screen bg-gray-200">
      <Toolbar {...{ drawingState, setDrawingState }} />
      <canvas
        ref={canvasRef}
        style={{ cursor }}
        className="mx-auto mt-8 h-[500px] max-h-[100vh] w-[1000px] max-w-[98vw] rounded-sm bg-white shadow-lg"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}

export default AppContainer;
