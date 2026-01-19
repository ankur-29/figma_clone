import { create } from "zustand";
import * as fabric from "fabric";
import { Tool } from "@/domain/tools/Tool";

interface EditorState {
  canvas: fabric.Canvas | null;
  activeTool: Tool | null;
  selectedObject: fabric.Object | null;

  setCanvas: (canvas: fabric.Canvas) => void;
  setActiveTool: (tool: Tool | null) => void;
  setSelectedObject: (obj: fabric.Object | null) => void;
  updateSelectedObject: (props: Partial<fabric.Object>) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  canvas: null,
  activeTool: null,
  selectedObject: null,

  setCanvas: (canvas) => set({ canvas }),

  setActiveTool: (tool) => {
    const { canvas, activeTool } = get();

    if (canvas && activeTool?.onDeactivate) {
      activeTool.onDeactivate(canvas);
    }

    if (canvas && tool?.onActivate) {
      tool.onActivate(canvas);
    }

    set({ activeTool: tool });
  },

  setSelectedObject: (obj) => set({ selectedObject: obj }),
  
  updateSelectedObject: (props) =>
  set((state) => {
    if (!state.canvas || !state.selectedObject) return state;

    state.selectedObject.set(props);
    state.selectedObject.setCoords();
    state.canvas.requestRenderAll();

    return {};
  }),

}));
