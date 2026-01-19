import { SelectTool } from "./SelectTool";
import { RectTool } from "./RectTool";
import { CircleTool } from "./CircleTool";

export const toolStrategy = {
  select: new SelectTool(),
  rectangle: new RectTool(),
  circle: new CircleTool(),
};
