import Brush from "./tools/Brush";
import Line from "./tools/Line";
import Oval from "./tools/Oval";
import Polygon from "./tools/Polygon";
import Rectangle from "./tools/Rectangle";
import Triangle from "./tools/Triangle";

const tools = {
  rectangle: new Rectangle(),
  brush: new Brush(),
  line: new Line(),
  oval: new Oval(),
  triangle: new Triangle(),
  polygon: new Polygon(),
};

export default tools;
