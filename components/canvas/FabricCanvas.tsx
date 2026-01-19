"use client";

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useEditorStore } from "@/store/editorStore";


export default function FabricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#ffffff",
      selection: true,
    });

    fabricRef.current = canvas;
    useEditorStore.getState().setCanvas(canvas);


    resizeCanvas(canvas);

    canvas.on("selection:created", (e) => {
        const selected = e.selected?.[0] ?? null;
        useEditorStore.getState().setSelectedObject(selected);
    });
    
    canvas.on("selection:updated", (e) => {
        const selected = e.selected?.[0] ?? null;
        useEditorStore.getState().setSelectedObject(selected);
    });
    
    canvas.on("selection:cleared", () => {
        useEditorStore.getState().setSelectedObject(null);
    });

    const handleResize = () => resizeCanvas(canvas);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
}

function resizeCanvas(canvas: fabric.Canvas) {
  const parent = canvas.getElement().parentElement;
  if (!parent) return;

  canvas.setDimensions({
    width: parent.clientWidth,
    height: parent.clientHeight,
  });

  canvas.renderAll();
}
