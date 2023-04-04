import React from "react";
import tools from "../lib/toolManager";
import DrawingStateType from "../types/DrawingStateType";
import useFileActions from "../hooks/useFileActions";
import Slider from "./utils/Slider";

interface ToolbarProps {
  drawingState: DrawingStateType;
  setDrawingState: React.Dispatch<React.SetStateAction<DrawingStateType>>;
}

const Toolbar = ({ drawingState, setDrawingState }: ToolbarProps) => {
  const { clearDrawing, saveImage, cut, copyToClipboard, pasteFromClipboard } = useFileActions();

  const changeTool = (tool: keyof typeof tools) => {
    setDrawingState({ ...drawingState, tool });
  };

  const buttonClasses = (tool?: keyof typeof tools) => {
    return `w-8 h-8 rounded-full flex justify-center items-center transition
    ${tool === drawingState.tool ? "bg-white text-violet-500" : "hover:bg-violet-800"}`;
  };

  return (
    <div className="flex min-h-[50px] w-[100vw] select-none items-center overflow-auto bg-violet-600 px-2 py-3 text-white shadow-xl">
      <div className="mx-2 flex gap-2 self-start">
        {[
          {
            onClick: clearDrawing,
            title: "Clear drawing",
            icon: <i className="fa-solid fa-multiply"></i>,
          },
          {
            onClick: saveImage,
            title: "Download as image",
            icon: <i className="fa-solid fa-download"></i>,
          },
          {
            onClick: cut,
            title: "Cut",
            icon: <i className="fa-solid fa-cut"></i>,
          },
          {
            onClick: copyToClipboard,
            title: "Copy",
            icon: <i className="fa-regular fa-copy"></i>,
          },
          {
            onClick: pasteFromClipboard,
            title: "Paste",
            icon: <i className="fa-regular fa-paste"></i>,
          },
        ].map(({ onClick, title, icon }: any, idx: number) => (
          <button key={idx} onClick={onClick} className={buttonClasses()} title={title}>
            {icon}
          </button>
        ))}
      </div>

      <div className="mx-4 w-0.5 self-stretch bg-white"></div>

      <div>
        <div className="flex gap-2 ">
          {[
            { tool: "brush", title: "Brush", icon: <i className="fa-solid fa-paintbrush"></i> },
            { tool: "line", title: "Line", icon: <i className="font-semibold">/</i> },
            { tool: "rectangle", title: "Rectangle", icon: <i className="fa-regular fa-square"></i> },
            { tool: "oval", title: "Oval", icon: <i className="fa-regular fa-circle"></i> },
            { tool: "triangle", title: "Triangle", icon: <i className="fa-solid fa-play"></i> },
            { tool: "polygon", title: "Polygon", icon: <i className="fa-solid fa-draw-polygon"></i> },
          ].map(({ tool, title, icon }: any, idx: number) => (
            <button key={idx} onClick={() => changeTool(tool)} className={buttonClasses(tool)} title={title}>
              {icon}
            </button>
          ))}
        </div>

        <div className="mt-5 ml-4 mb-2">
          <Slider
            min={1}
            max={50}
            value={drawingState.width}
            onChange={(value: number) => setDrawingState({ ...drawingState, width: Number(value) })}
          />
        </div>
      </div>

      <div className="mx-4 w-0.5 self-stretch bg-white"></div>

      <div className="ml-16">
        <label htmlFor="color" className="relative block h-8 w-8 cursor-pointer rounded-full" title="color">
          <div
            className="absolute top-0 left-0 h-full w-full rounded-full border border-white"
            style={{ backgroundColor: drawingState.color }}
          />
          <input
            type="color"
            className="cursor-pointer opacity-0"
            value={drawingState.color}
            onChange={e => setDrawingState({ ...drawingState, color: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
};

export default Toolbar;
