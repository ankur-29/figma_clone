import { create } from "zustand";
import * as fabric from "fabric";

export type ToolType = "select" | "rectangle" | "circle";

interface EditorState {
  canvas: fabric.Canvas | null;
  activeTool: ToolType;
  selectedObject: fabric.Object | null;

  setCanvas: (canvas: fabric.Canvas) => void;
  setActiveTool: (tool: ToolType) => void;
  setSelectedObject: (obj: fabric.Object | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  canvas: null,
  activeTool: "select",
  selectedObject: null,

  setCanvas: (canvas) => set({ canvas }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  setSelectedObject: (obj) => set({ selectedObject: obj }),
}));
