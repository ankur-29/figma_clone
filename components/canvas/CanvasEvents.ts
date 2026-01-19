import { useEffect } from "react";
import * as fabric from "fabric";
import { Tool } from "@/domain/tools/Tool";

export function CanvasEvents( canvas: fabric.Canvas | null, tool: Tool | null) {
  useEffect(() => {
    if (!canvas || !tool) return;

    const handleMouseDown = (e: fabric.TEvent) => {
      tool.onMouseDown?.(e, canvas);
    };

    const handleMouseMove = (e: fabric.TEvent) => {
      tool.onMouseMove?.(e, canvas);
    };

    const handleMouseUp = (e: fabric.TEvent) => {
      tool.onMouseUp?.(e, canvas);
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);

    tool.onActivate?.(canvas);

    return () => {
      canvas.off("mouse:down", handleMouseDown);
      canvas.off("mouse:move", handleMouseMove);
      canvas.off("mouse:up", handleMouseUp);

      tool.onDeactivate?.(canvas);
    };
  }, [canvas, tool]);
}
