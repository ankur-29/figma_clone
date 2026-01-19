"use client";

import { RectTool } from "@/domain/tools/RectTool";
import { SelectTool } from "@/domain/tools/SelectTool";
import { useCanvasStore } from "@/store/canvasStore";

export default function Toolbar() {
  const setActiveTool = useCanvasStore(state => state.setActiveTool);
  const activeTool = useCanvasStore(state => state.activeTool);

  const isActive = (name: string) =>
    activeTool?.name === name;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setActiveTool(new SelectTool())}
        className={`px-3 py-2 rounded ${
          isActive("select")
            ? "bg-black text-white"
            : "bg-gray-200"
        }`}
      >
        Select
      </button>

      <button
        onClick={() => setActiveTool(new RectTool())}
        className={`px-3 py-2 rounded ${
          isActive("rectangle")
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Rectangle
      </button>
    </div>
  );
}
