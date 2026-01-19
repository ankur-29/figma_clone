import * as fabric from "fabric";
import { Tool } from "./Tool";

export class SelectTool implements Tool {
  name = "select";

  onActivate(canvas: fabric.Canvas) {
    canvas.selection = true;
    canvas.defaultCursor = "default";

    canvas.forEachObject(obj => {
      obj.selectable = true;
      obj.evented = true;
    });
  }

  onDeactivate(canvas: fabric.Canvas) {
    // Nothing to clean for now
  }

  onMouseDown(e: fabric.TEvent, canvas: fabric.Canvas) {
    // Fabric handles selection internally
  }

  onMouseMove(e: fabric.TEvent, canvas: fabric.Canvas) {}

  onMouseUp(e: fabric.TEvent, canvas: fabric.Canvas) {}
}
