import { SelectTool } from "./SelectTool";
import { RectTool } from "./RectTool";
import { Tool } from "./Tool";

export const tools: Record<string, Tool> = {
  select: new SelectTool(),
  rectangle: new RectTool(),
};
