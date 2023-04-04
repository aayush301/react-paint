import React, { createContext, useContext, useRef, useState } from "react";
import DrawingStateType from "../types/DrawingStateType";

const defaultVal: {
  ctx: CanvasRenderingContext2D | null;
  setCtx: React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>;
  drawingState: DrawingStateType;
  setDrawingState: React.Dispatch<React.SetStateAction<DrawingStateType>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | null;
} = {
  ctx: null,
  setCtx: () => {},
  drawingState: {
    tool: "brush",
    color: "#000000",
    width: 5,
  },
  setDrawingState: () => {},
  canvasRef: React.createRef(),
  canvas: null,
};

const GlobalContext = createContext(defaultVal);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingStateType>({
    tool: "brush",
    color: "#000000",
    width: 5,
  });

  return (
    <GlobalContext.Provider
      value={{ ctx, setCtx, drawingState, setDrawingState, canvasRef, canvas: canvasRef.current }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
