import * as fabric from "fabric";
import { Tool } from "./Tool";

export class RectTool implements Tool {
  name = "rectangle";

  private rect: fabric.Rect | null = null;
  private startX = 0;
  private startY = 0;

  onActivate(canvas: fabric.Canvas) {
    canvas.selection = false;
    canvas.defaultCursor = "crosshair";

    canvas.forEachObject(obj => {
      obj.selectable = false;
    });
  }

  onDeactivate(canvas: fabric.Canvas) {
    canvas.defaultCursor = "default";

    canvas.forEachObject(obj => {
      obj.selectable = true;
    });
  }

  onMouseDown(e: fabric.TEvent, canvas: fabric.Canvas) {
    const point = canvas.getScenePoint(e.e);

    this.startX = point.x;
    this.startY = point.y;

    this.rect = new fabric.Rect({
      left: this.startX,
      top: this.startY,
      width: 0,
      height: 0,
      fill: "#3b82f6",
      selectable: true,
      evented: true,
    });

    canvas.add(this.rect);
  }

  onMouseMove(e: fabric.TEvent, canvas: fabric.Canvas) {
    if (!this.rect) return;

    const point = canvas.getScenePoint(e.e);

    this.rect.set({
      width: Math.abs(point.x - this.startX),
      height: Math.abs(point.y - this.startY),
    });

    canvas.renderAll();
  }

  onMouseUp(e: fabric.TEvent, canvas: fabric.Canvas) {
    if (!this.rect) return;

    this.rect.setCoords();
    this.rect = null;

    canvas.renderAll();
  }
}
