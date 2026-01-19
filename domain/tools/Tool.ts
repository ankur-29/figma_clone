import * as fabric from "fabric";

export interface Tool {
  name: string;

  onActivate?(canvas: fabric.Canvas): void;
  onDeactivate?(canvas: fabric.Canvas): void;

  onMouseDown?(
    e: fabric.TEvent,
    canvas: fabric.Canvas
  ): void;

  onMouseMove?(
    e: fabric.TEvent,
    canvas: fabric.Canvas
  ): void;

  onMouseUp?(
    e: fabric.TEvent,
    canvas: fabric.Canvas
  ): void;
}
