"use client";

import * as fabric from "fabric";
import { useEditorStore } from "@/store/editorStore";
import { useEffect, useState } from "react";

export default function LayersPanel() {
  const canvas = useEditorStore((s) => s.canvas);
  const selected = useEditorStore((s) => s.selectedObject);

  const [objects, setObjects] = useState<fabric.Object[]>([]);

  useEffect(() => {
    if (!canvas) return;

    const update = () => {
      // reverse → top layer first (Figma behavior)
      setObjects([...canvas.getObjects()].reverse());
    };

    update();

    canvas.on("object:added", update);
    canvas.on("object:removed", update);
    canvas.on("object:modified", update);

    return () => {
      canvas.off("object:added", update);
      canvas.off("object:removed", update);
      canvas.off("object:modified", update);
    };
  }, [canvas]);

  const selectObject = (obj: fabric.Object) => {
    if (!canvas) return;
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
  };

  return (
    <aside className="w-60 border-r bg-white p-2 overflow-auto">
      <h3 className="font-semibold text-sm mb-2">Layers</h3>

      {objects.length === 0 && (
        <p className="text-xs text-gray-400">No layers</p>
      )}

      <ul className="space-y-1">
        {objects.map((obj, i) => {
          const isActive = obj === selected;

          return (
            <li
              key={obj._editorId}
              onClick={() => selectObject(obj)}
              className={`px-2 py-1 text-sm rounded cursor-pointer
                ${isActive ? "bg-blue-100" : "hover:bg-gray-100"}
              `}
            >
              {getLayerName(obj)}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function getLayerName(obj: fabric.Object) {
  switch (obj.type) {
    case "rect":
      return "Rectangle";
    case "circle":
      return "Circle";
    case "textbox":
      return "Text";
    default:
      return obj.type || "Object";
  }
}
