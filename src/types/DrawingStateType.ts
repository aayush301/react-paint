import tools from "../lib/toolManager";
interface DrawingStateType {
  tool: keyof typeof tools;
  color: string;
  width: number;
}

export default DrawingStateType;
