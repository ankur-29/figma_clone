import { create } from "zustand";
import * as fabric from "fabric";
import { Tool } from "@/domain/tools/Tool";

interface CanvasState {
  canvas: fabric.Canvas | null;
  activeTool: Tool | null;
  selectedObject: fabric.Object | null;

  setCanvas: (canvas: fabric.Canvas) => void;
  setActiveTool: (tool: Tool | null) => void;
  setSelectedObject: (object: fabric.Object | null) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvas: null,
  activeTool: null,
  selectedObject: null,

  setCanvas: (canvas) => {
    set({ canvas });
  },

  setActiveTool: (tool) => {
    const { canvas, activeTool } = get();

    // Deactivate previous tool
    if (canvas && activeTool?.onDeactivate) {
      activeTool.onDeactivate(canvas);
    }

    // Activate new tool
    if (canvas && tool?.onActivate) {
      tool.onActivate(canvas);
    }

    set({ activeTool: tool });
  },

  setSelectedObject: (object) => {
    set({ selectedObject: object });
  },
}));
