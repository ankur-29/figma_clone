import * as fabric from "fabric";
import { Tool } from "./Tool";

export class CircleTool implements Tool {
  name = "circle";

  private circle: fabric.Circle | null = null;
  private startX = 0;
  private startY = 0;

  onActivate(canvas: fabric.Canvas) {
    canvas.selection = false;
    canvas.forEachObject(o => (o.selectable = false));
    canvas.defaultCursor = "crosshair";
  }

  onMouseDown(e: fabric.TEvent, canvas: fabric.Canvas) {
    const pointer = fabric.util.getPointer(e.e as MouseEvent);

    this.startX = pointer.x;
    this.startY = pointer.y;

    this.circle = new fabric.Circle({
      left: this.startX,
      top: this.startY,
      radius: 1,
      fill: "#22c55e",
    });

    canvas.add(this.circle);
  }

  onMouseMove(e: fabric.TEvent, canvas: fabric.Canvas) {
    if (!this.circle) return;

    const pointer = fabric.util.getPointer(e.e as MouseEvent);
    const radius = Math.abs(pointer.x - this.startX);

    this.circle.set({ radius });
    canvas.renderAll();
  }

  onMouseUp() {
    this.circle = null;
  }
}
